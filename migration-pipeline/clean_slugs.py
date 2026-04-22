import json
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
PORTFOLIO_JSON = PROJECT_ROOT / "src" / "data" / "portfolioData.json"

def clean_slug(slug):
    if not slug:
        return slug
    # Remove everything that is not alphanumeric or a hyphen
    cleaned = re.sub(r'[^a-z0-9\-]', '', slug.lower())
    return cleaned

def main():
    print(f"Reading {PORTFOLIO_JSON}...")
    with open(PORTFOLIO_JSON, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    changes_made = 0
    for item in data:
        old_slug = item.get('slug', '')
        if old_slug:
            new_slug = clean_slug(old_slug)
            if new_slug != old_slug:
                print(f"Changing slug: '{old_slug}' -> '{new_slug}'")
                item['slug'] = new_slug
                changes_made += 1
                
    if changes_made > 0:
        print(f"Writing {changes_made} updated slugs to {PORTFOLIO_JSON}...")
        with open(PORTFOLIO_JSON, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("Done!")
    else:
        print("No slugs needed cleaning.")

if __name__ == '__main__':
    main()
