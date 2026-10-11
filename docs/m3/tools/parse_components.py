"""Parse the Material Web component docs into docs/m3/data/components.json.

Usage: python parse_components.py <material-web checkout> <output json>

Reads docs/components/*.md of a material-web checkout and extracts, per document,
the elements (custom element tags), their properties, methods and events from the
generated API tables, the CSS tokens of the theming tables, the slots used in the
examples, the images, the headings and the accessibility notes.
"""

import json
import re
import subprocess
import sys
from pathlib import Path

REPO = "material-components/material-web"


def strip_comments(text):
    return re.sub(r"<!--.*?-->", "", text, flags=re.S)


def table_rows(block):
    """Return the data rows of the first pipe table of `block` as lists of cells."""
    rows = []
    for line in block.splitlines():
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in re.split(r"(?<!\\)\|", line.strip().strip("|"))]
        rows.append([c.replace("\\|", "|") for c in cells])
    return rows[2:]  # header and separator


def sub_block(text, heading):
    m = re.search(rf"^#### {heading}\s*$(.*?)(?=^####? |\Z)", text, re.S | re.M)
    return m.group(1) if m else ""


def parse_api(text):
    elements = []
    api = text.split("\n## API", 1)
    if len(api) < 2:
        return elements
    parts = re.split(r"^### (\w+) <code>&lt;([\w-]+)&gt;</code>\s*$", api[1], flags=re.M)
    for i in range(1, len(parts), 3):
        cls, tag, body = parts[i], parts[i + 1], parts[i + 2]
        props = [
            {
                "name": r[0].strip("`"),
                "attribute": r[1].strip("`"),
                "type": r[2].strip("`"),
                "default": r[3].strip("`"),
                "description": re.sub(r"\s+", " ", r[4].replace("<br>", " ")).strip(),
            }
            for r in table_rows(sub_block(body, "Properties"))
            if len(r) >= 5
        ]
        methods = [
            {
                "name": r[0].strip("`"),
                "parameters": r[1].strip("_`"),
                "returns": r[2].strip("`"),
                "description": re.sub(r"\s+", " ", r[3].replace("<br>", " ")).strip(),
            }
            for r in table_rows(sub_block(body, "Methods"))
            if len(r) >= 4
        ]
        events = [
            {
                "name": r[0].strip("`"),
                "type": r[1].strip("`"),
                "description": re.sub(r"\s+", " ", r[4].replace("<br>", " ")).strip(),
            }
            for r in table_rows(sub_block(body, "Events"))
            if len(r) >= 5
        ]
        elements.append(
            {"class": cls, "tag": tag, "properties": props, "methods": methods, "events": events}
        )
    return elements


def section(text, heading_re):
    m = re.search(rf"^## {heading_re}\s*$(.*?)(?=^## |\Z)", text, re.S | re.M)
    return m.group(1).strip() if m else ""


def parse_doc(path, sha):
    stem = path.stem
    raw = path.read_text(encoding="utf-8")
    text = strip_comments(raw)
    title = re.search(r"^# (.+)$", text, re.M).group(1).strip()
    intro_m = re.search(
        r"\*\*This documentation.*?\*\*\s*(.*?)"
        r"(?=</catalog-component-header-title>|\n\s*!\[|\n\*   \[Design)",
        text,
        re.S,
    )
    # Docs without the catalog header start with the title, then the intro.
    intro = intro_m.group(1) if intro_m else text.split("\n", 1)[1].split("\n![")[0]
    intro = re.split(r"^## ", intro, flags=re.M)[0]
    intro = re.sub(r"^#+ .*$", "", intro, flags=re.M)
    intro = re.sub(r"^\*   .*$", "", intro, flags=re.M)
    intro = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", intro)
    intro = re.sub(r"<[^>]+>", "", intro)
    intro = re.sub(r"\s+", " ", intro).strip()
    design_links = re.findall(
        r"\[([^\]]+)\]\((https://m3\.material\.io/[^)]+)\)", text.replace("\n", " ")
    )
    design = [u for _, u in design_links if "#" not in u]
    guidelines = {}
    for label, u in design_links:
        if "#" in u:
            guidelines.setdefault(re.sub(r"\s+", " ", label).strip(), u)
    source = re.search(
        r"\((https://github\.com/material-components/material-web/tree/main/[\w-]+)\)", text
    )
    images = []
    for alt, src, title_attr in re.findall(r'!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)', text):
        images.append({"alt": re.sub(r"\s+", " ", alt).strip(), "title": title_attr, "path": src})
    for m in re.finditer(r'<img[^>]*?src="([^"]+)"[^>]*?>', text, re.S):
        tag = m.group(0)
        alt = re.search(r'alt="([^"]*)"', tag, re.S)
        ttl = re.search(r'title="([^"]*)"', tag, re.S)
        images.append(
            {
                "alt": re.sub(r"\s+", " ", alt.group(1)).strip() if alt else "",
                "title": ttl.group(1) if ttl else "",
                "path": m.group(1),
            }
        )
    for img in images:
        img["url"] = f"https://raw.githubusercontent.com/{REPO}/{sha}/docs/components/{img['path']}"
    headings = [(len(h), t.strip()) for h, t in re.findall(r"^(#{2,4}) (.+)$", text, re.M)]
    tokens = sorted(set(re.findall(r"^`(--md-[\w-]+)`", text, re.M)))
    slots = sorted(set(re.findall(r'slot="([\w-]+)"', text)) - {"title"})
    used_tags = sorted(set(re.findall(r"<(md-[\w-]+)", text)))
    token_defaults = {
        m.group(1): m.group(2)
        for m in re.finditer(r"^`(--md-[\w-]+)`\s*\|\s*`([^`]+)`", text, re.M)
    }
    a11y = re.sub(r"```.*?```", "", section(text, "Accessibility"), flags=re.S)
    a11y = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", a11y)
    return {
        "doc": stem,
        "title": title,
        "intro": intro,
        "docUrl": f"https://github.com/{REPO}/blob/{sha}/docs/components/{stem}.md",
        "catalogUrl": f"https://material-web.dev/components/{stem}/",
        "sourceTree": source.group(1) if source else None,
        "designArticles": sorted(set(design)),
        "guidelineLinks": guidelines,
        "usedTags": used_tags,
        "elements": parse_api(text),
        "headings": [{"level": h, "text": t} for h, t in headings],
        "tokens": tokens,
        "tokenDefaults": token_defaults,
        "slots": slots,
        "images": images,
        "accessibility": re.sub(r"\s+", " ", a11y).strip(),
    }


def main():
    checkout, out = Path(sys.argv[1]), Path(sys.argv[2])
    sha = subprocess.run(
        ["git", "-C", str(checkout), "rev-parse", "HEAD"],
        capture_output=True,
        text=True,
        check=True,
    ).stdout.strip()
    date = subprocess.run(
        ["git", "-C", str(checkout), "log", "-1", "--format=%cI"],
        capture_output=True,
        text=True,
        check=True,
    ).stdout.strip()
    version = json.loads((checkout / "package.json").read_text(encoding="utf-8"))["version"]
    docs = [parse_doc(p, sha) for p in sorted((checkout / "docs" / "components").glob("*.md"))]
    out.write_text(
        json.dumps(
            {
                "repo": REPO,
                "commit": sha,
                "commitDate": date,
                "packageVersion": version,
                "docs": docs,
            },
            indent=1,
            ensure_ascii=False,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"{len(docs)} docs, {sum(len(d['elements']) for d in docs)} elements -> {out}")


if __name__ == "__main__":
    main()
