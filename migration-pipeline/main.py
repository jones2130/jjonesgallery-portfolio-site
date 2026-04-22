import os
import json
import uuid
import shutil
import base64
import datetime
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
from langchain_core.messages import HumanMessage
from langchain_community.chat_models import ChatOllama

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In development, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROJECT_ROOT = Path(__file__).parent.parent
PENDING_DIR = PROJECT_ROOT / "src" / "public" / "images" / "pending"
PENDING_JSON = PROJECT_ROOT / "migration-pipeline" / "pending_migrations.json"
PORTFOLIO_JSON = PROJECT_ROOT / "src" / "data" / "portfolioData.json"
ART_DIR = PROJECT_ROOT / "src" / "public" / "images" / "art"

# Ensure directories exist
PENDING_DIR.mkdir(parents=True, exist_ok=True)

class ScanRequest(BaseModel):
    path: str

class ApproveRequest(BaseModel):
    id: str
    title: str
    medium: str
    tags: str
    description: str
    date: str
    width: str
    height: str

def load_pending():
    if PENDING_JSON.exists():
        with open(PENDING_JSON, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_pending(data):
    with open(PENDING_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def image_to_base64(image_path: Path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode("utf-8")

def process_file(file_path: Path):
    # Compress to webp
    file_id = str(uuid.uuid4())[:8]
    webp_filename = f"{file_path.stem}_{file_id}.webp"
    webp_path = PENDING_DIR / webp_filename
    llm_temp_path = PENDING_DIR / f"llm_{webp_filename}"
    
    try:
        with Image.open(file_path) as img:
            # Save high-res for gallery
            img.thumbnail((1920, 1920)) 
            img.save(webp_path, format="webp", quality=85)
            
            # Save low-res for Ollama to prevent memory crashes
            img.thumbnail((512, 512))
            img.save(llm_temp_path, format="jpeg", quality=70)
    except Exception as e:
        print(f"Skipping {file_path}: {e}")
        return None

    # Call Ollama
    llm = ChatOllama(base_url="http://172.29.80.1:11434", model="gemma4:e4b", temperature=0.6)
    b64_image = image_to_base64(llm_temp_path)
    
    # Clean up the low-res image now that we have the base64
    if llm_temp_path.exists():
        os.remove(llm_temp_path)
    
    prompt = """
    Analyze this artwork. Provide a short poetic title, and a 1-2 sentence detailed description suitable for an art gallery portfolio. 
    
    Also create 4 to 5 comma-separated keywords that describe the artwork. 
    
    Format your response exactly like this: 
    TITLE: [Your Title] 
    DESCRIPTION: [Your Description] 
    KEYWORDS: [Your Keywords]
    """
    
    msg = llm.invoke([
        HumanMessage(
            content=[
                {"type": "text", "text": prompt},
                {
                    "type": "image_url",
                    "image_url": f"data:image/webp;base64,{b64_image}",
                },
            ]
        )
    ])
    
    response_text = msg.content
    
    # Parse TITLE, DESCRIPTION, and KEYWORDS
    title = "Generated Title"
    description = "Generated Description"
    keywords = ""
    if "TITLE:" in response_text and "DESCRIPTION:" in response_text and "KEYWORDS:" in response_text:
        parts = response_text.split("DESCRIPTION:")
        title_part = parts[0].replace("TITLE:", "").strip()
        
        desc_and_keys = parts[1].split("KEYWORDS:")
        desc_part = desc_and_keys[0].strip()
        keys_part = desc_and_keys[1].strip()
        
        title = title_part
        description = desc_part
        keywords = keys_part
        
    return {
        "id": file_id,
        "originalPath": str(file_path),
        "imageUrl": f"/images/pending/{webp_filename}",
        "title": title,
        "description": description,
        "medium": "Oil", # Default, can be edited in UI
        "date": datetime.date.today().isoformat(),
        "width": "",
        "height": "",
        "tags": keywords,
        "fileName": webp_filename
    }

@app.post("/api/scan")
def scan_path(req: ScanRequest):
    target = Path(req.path)
    if not target.exists():
        raise HTTPException(status_code=400, detail="Path does not exist")
        
    pending = load_pending()
    
    if target.is_file():
        files_to_process = [target]
    else:
        files_to_process = [p for p in target.iterdir() if p.is_file() and p.suffix.lower() in [".jpg", ".jpeg", ".png", ".bmp"]]
        
    for f in files_to_process:
        print(f"Processing {f}...")
        result = process_file(f)
        if result:
            pending.append(result)
            save_pending(pending)
            
    return {"status": "success", "processed": len(files_to_process)}

@app.get("/api/pending")
def get_pending():
    return load_pending()

@app.post("/api/approve")
def approve_image(req: ApproveRequest):
    pending = load_pending()
    item = next((i for i in pending if i["id"] == req.id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
        
    medium_slug = req.medium.lower().replace(" ", "_") + "_paintings"
    if "mixed" in medium_slug:
        medium_slug = "mixed_media_drawings"
        
    dest_dir = ART_DIR / medium_slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    src_webp = PENDING_DIR / item["fileName"]
    dest_webp = dest_dir / item["fileName"]
    if src_webp.exists():
        shutil.move(str(src_webp), str(dest_webp))
        
    portfolio = []
    if PORTFOLIO_JSON.exists():
        with open(PORTFOLIO_JSON, "r", encoding="utf-8") as f:
            portfolio = json.load(f)
            
    prefix = req.medium.lower().split(" ")[0]
    count = sum(1 for p in portfolio if p["id"].startswith(prefix)) + 1
    new_id = f"{prefix}-{str(count).zfill(3)}"
    
    new_entry = {
        "id": new_id,
        "slug": req.title.lower().replace(" ", "-"),
        "title": req.title,
        "medium": req.medium,
        "date": req.date,
        "width": req.width,
        "height": req.height,
        "tags": [t.strip() for t in req.tags.split(",") if t.strip()],
        "description": req.description,
        "imageUrl": f"/images/art/{medium_slug}/{item['fileName']}",
        "purchaseLinks": {}
    }
    
    portfolio.append(new_entry)
    with open(PORTFOLIO_JSON, "w", encoding="utf-8") as f:
        json.dump(portfolio, f, indent=2)
        
    pending = [i for i in pending if i["id"] != req.id]
    save_pending(pending)
    
    return {"status": "success", "entry": new_entry}

@app.delete("/api/reject/{item_id}")
def reject_image(item_id: str):
    pending = load_pending()
    item = next((i for i in pending if i["id"] == item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
        
    src_webp = PENDING_DIR / item["fileName"]
    if src_webp.exists():
        os.remove(src_webp)
        
    pending = [i for i in pending if i["id"] != item_id]
    save_pending(pending)
    
    return {"status": "success"}
