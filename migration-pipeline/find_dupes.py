import json
from collections import defaultdict
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
PORTFOLIO_JSON = PROJECT_ROOT / "src" / "data" / "portfolioData.json"

with open(PORTFOLIO_JSON, 'r', encoding='utf-8') as f:
    data = json.load(f)

slugs = defaultdict(list)
titles = defaultdict(list)

for item in data:
    slugs[item.get('slug')].append(item.get('id'))
    titles[item.get('title')].append(item.get('id'))

dup_slugs = {k: v for k, v in slugs.items() if len(v) > 1}
dup_titles = {k: v for k, v in titles.items() if len(v) > 1}

print("Duplicate Slugs:")
if not dup_slugs:
    print("  None found.")
for k, v in dup_slugs.items():
    print(f"  '{k}' found in IDs: {v}")

print("\nDuplicate Titles:")
if not dup_titles:
    print("  None found.")
for k, v in dup_titles.items():
    print(f"  '{k}' found in IDs: {v}")
