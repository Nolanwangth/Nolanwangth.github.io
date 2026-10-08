"""Render the curated JSON catalog into static, search-engine-readable HTML."""
import json
import re
from html import escape
from pathlib import Path

root = Path(__file__).resolve().parent.parent
projects = json.loads((root / 'projects.json').read_text())
cards = []
for number, project in enumerate(projects, 1):
    tags = ''.join(f'<span>{escape(tag)}</span>' for tag in project['tags'])
    cards.append(
        f'<article class="project" data-category="{escape(project["category"], quote=True)}">'
        f'<div class="project-top"><span>{escape(project["kind"])}</span>'
        f'<span class="mono">{number:02}</span></div><h3>'
        f'<a href="https://github.com/Nolanwangth/{escape(project["repo"], quote=True)}" '
        f'target="_blank" rel="noopener noreferrer">{escape(project["title"])}</a></h3>'
        f'<p>{escape(project["description"])}</p><div class="tags">{tags}</div></article>'
    )
page = root / 'index.html'
html = page.read_text()
html, replacements = re.subn(
    r'(<div class="project-grid" id="project-grid">).*?(</div>\n<p class="index-footnote">)',
    lambda match: match[1] + '\n' + '\n'.join(cards) + '\n' + match[2],
    html, flags=re.S,
)
assert replacements == 1, 'Project grid marker not found'
for category in ['all', 'robotics', 'models', 'tools', 'reading']:
    count = sum(category == 'all' or item['category'] == category for item in projects)
    html = re.sub(
        rf'(data-filter="{category}"[^>]*>[^<]*<span>)\d+(</span>)',
        lambda match: match[1] + str(count) + match[2], html,
    )
html = re.sub(r'(id="result-count"[^>]*>)\d+ public repositories',
              lambda match: match[1] + f'{len(projects)} public repositories', html)
page.write_text(html)
print(f'Rendered {len(projects)} projects.')
