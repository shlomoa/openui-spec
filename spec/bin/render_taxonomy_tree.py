"""Render ``spec/scopes/taxonomy_mapping.md`` as an interactive taxonomy tree page.

The page shows the sections, subcategories and entries of the taxonomy mapping as a
collapsible tree. Each entry shows its spec object and abstraction level; a switch at
the top overlays the names one surveyed source uses for each entry (the four alias
columns: HTML / WAI-ARIA, OpenUI5, Qt, Angular Material). The page is generated in
full from the Markdown and needs no script.

Usage: ``python -m spec.bin.render_taxonomy_tree [--check]``. With ``--check`` the
page is not written; the command fails when it is out of date with the Markdown.
"""

from __future__ import annotations

import argparse
import html
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

import markdown

REPO_ROOT = Path(__file__).resolve().parents[2]
SOURCE = REPO_ROOT / "spec" / "scopes" / "taxonomy_mapping.md"
TARGET = REPO_ROOT / "spec" / "taxonomy" / "taxonomy-tree.html"
END_HEADING = "## Primary categories of the leaf scopes"
HEADER = (
    "Taxonomy entry",
    "Spec object",
    "Abstraction level",
    "HTML / WAI-ARIA",
    "OpenUI5",
    "Qt",
    "Angular Material",
    "Notes",
)
SOURCES = (
    ("html", "HTML / WAI-ARIA"),
    ("openui5", "OpenUI5"),
    ("qt", "Qt"),
    ("material", "Angular Material"),
)
LINK_RE = re.compile(r"\[([^\]]+)\]\([^)]*\)")

STYLE = """
:root {
  color-scheme: light;
  --ink: #182230;
  --muted: #526071;
  --line: #cbd5e1;
  --header: #eaf1f8;
  --surface: #ffffff;
  --background: #f4f7fb;
  --accent: #2563eb;
}

* { box-sizing: border-box; }

body {
  max-width: 1500px;
  margin: 0 auto;
  padding: 28px;
  background: var(--background);
  color: var(--ink);
  font: 14px/1.45 system-ui, -apple-system, "Segoe UI", sans-serif;
}

h1 { margin: 0 0 8px; font-size: 28px; }

p { color: var(--muted); }

.overlay {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 24px;
}

.overlay label {
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  cursor: pointer;
}

input[name="overlay"] { position: absolute; opacity: 0; }

details {
  margin: 8px 0;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  box-shadow: 0 8px 24px #0f172a12;
}

details details {
  margin: 8px 12px;
  box-shadow: none;
}

summary {
  padding: 10px 14px;
  font-size: 16px;
  font-weight: 650;
  cursor: pointer;
}

details details summary { font-size: 14px; }

.count { color: var(--muted); font-weight: 400; }

ul { margin: 0; padding: 0 14px 12px 34px; }

li { padding: 4px 0; border-bottom: 1px solid #dde4ec; }

li:last-child { border-bottom: 0; }

.entry { font-weight: 650; }

.object, .level { color: var(--muted); }

.alias { display: none; margin-left: 8px; }

.alias::before { content: "— "; color: var(--muted); }

.alias code { font-size: 12px; }

.none { color: var(--muted); font-style: italic; }

@media print {
  body { max-width: none; padding: 8mm; background: #fff; }
  details { box-shadow: none; }
}
"""


@dataclass
class Group:
    """A section or a subcategory, with its entries and its subcategories."""

    title: str
    entries: list[list[str]] = field(default_factory=list)
    children: list[Group] = field(default_factory=list)

    def count(self) -> int:
        return len(self.entries) + sum(child.count() for child in self.children)


def _cells(line: str) -> list[str]:
    stripped = line.strip()
    if not stripped.startswith("|") or not stripped.endswith("|"):
        return []
    return [cell.strip() for cell in stripped.strip("|").split("|")]


def parse(text: str) -> tuple[str, list[Group]]:
    """Return the page title and the section tree of the mapping's entry tables."""
    text = text.split("\n" + END_HEADING, 1)[0]
    title_match = re.search(r"^# (.+)$", text, re.M)
    title = title_match.group(1).strip() if title_match else "Taxonomy"
    sections: list[Group] = []
    current: Group | None = None
    for line in text.splitlines():
        if line.startswith("## "):
            sections.append(Group(line[3:].strip()))
            current = sections[-1]
        elif line.startswith("### ") and sections:
            sections[-1].children.append(Group(line[4:].strip()))
            current = sections[-1].children[-1]
        cells = _cells(line)
        if current is None or not cells or tuple(cells) == HEADER:
            continue
        if all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells):
            continue
        if len(cells) != len(HEADER):
            raise ValueError(f"expected {len(HEADER)} columns: {line}")
        current.entries.append(cells)
    return title, [section for section in sections if section.count()]


def _inline(cell: str) -> str:
    """Render one Markdown cell as inline HTML, with links reduced to their text."""
    rendered = markdown.markdown(LINK_RE.sub(r"\1", cell), output_format="html")
    return re.sub(r"^<p>|</p>$", "", rendered)


def _alias(cell: str) -> str:
    """The names one source uses for an entry, or a muted "no name"."""
    return '<span class="none">no name</span>' if cell == "—" else _inline(cell)


def _overlay_style() -> str:
    """CSS that highlights the chosen switch and shows the chosen source's names."""
    rules = []
    for key in ("none", *(key for key, _ in SOURCES)):
        rules.append(
            f'#overlay-{key}:checked ~ .overlay label[for="overlay-{key}"] '
            "{ border-color: var(--accent); background: var(--header); font-weight: 650; }"
        )
        rules.append(
            f'#overlay-{key}:focus-visible ~ .overlay label[for="overlay-{key}"] '
            "{ outline: 2px solid var(--accent); }"
        )
        if key != "none":
            rules.append(f"#overlay-{key}:checked ~ details .alias-{key} {{ display: inline; }}")
    return "\n".join(rules) + "\n"


def _entry(cells: list[str]) -> str:
    name, level = html.escape(cells[0]), html.escape(cells[2])
    spec_object = _inline(cells[1])
    aliases = "".join(
        f'<span class="alias alias-{key}">{_alias(cells[3 + index])}</span>'
        for index, (key, _) in enumerate(SOURCES)
    )
    return (
        f'<li><span class="entry">{name}</span> '
        f'<span class="object">→ {spec_object}</span> '
        f'<span class="level">({level})</span>{aliases}</li>'
    )


def _group(group: Group, open_: bool) -> str:
    attribute = " open" if open_ else ""
    parts = [
        f"<details{attribute}><summary>{html.escape(group.title)} "
        f'<span class="count">({group.count()})</span></summary>'
    ]
    if group.entries:
        parts.append("<ul>" + "".join(_entry(cells) for cells in group.entries) + "</ul>")
    parts.extend(_group(child, False) for child in group.children)
    parts.append("</details>")
    return "\n".join(parts)


def render(source: Path = SOURCE) -> str:
    """Return the full HTML page for ``source``."""
    title, sections = parse(source.read_text(encoding="utf-8"))
    keys = [("none", "OpenUI only"), *SOURCES]
    inputs = "".join(
        f'<input type="radio" name="overlay" id="overlay-{key}"'
        f"{' checked' if key == 'none' else ''}>"
        for key, _ in keys
    )
    labels = "".join(
        f'<label for="overlay-{key}">{html.escape(label)}</label>' for key, label in keys
    )
    total = sum(section.count() for section in sections)
    body = "\n".join(_group(section, True) for section in sections)
    return (
        "<!doctype html>\n"
        '<html lang="en">\n<head>\n'
        '  <meta charset="utf-8">\n'
        '  <meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f"  <title>{html.escape(title)}: tree</title>\n"
        f"  <style>{STYLE}{_overlay_style()}</style>\n</head>\n<body>\n"
        f"<h1>{html.escape(title)}: tree</h1>\n"
        f"<p>{total} taxonomy entries in {len(sections)} sections. Open a section or a "
        "subcategory to see its entries, each with its spec object and abstraction level. "
        "Choose a source to overlay the names it uses for each entry. Generated from "
        "<code>spec/scopes/taxonomy_mapping.md</code> by "
        "<code>python -m spec.bin.render_taxonomy_tree</code>.</p>\n"
        f"{inputs}\n"
        f'<div class="overlay" role="group" aria-label="Name overlay">{labels}</div>\n'
        f"{body}\n</body>\n</html>\n"
    )


def main(argv: list[str] | None = None) -> int:
    """Write the page, or with ``--check`` report whether it is up to date."""
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--check", action="store_true", help="Fail if the page is stale.")
    args = parser.parse_args(argv)

    page = render()
    if args.check:
        if not TARGET.is_file() or TARGET.read_text(encoding="utf-8") != page:
            print(
                f"{TARGET.relative_to(REPO_ROOT)} is out of date; run "
                "python -m spec.bin.render_taxonomy_tree",
                file=sys.stderr,
            )
            return 1
        print("Taxonomy tree HTML is up to date.")
        return 0
    TARGET.write_text(page, encoding="utf-8")
    print(f"Wrote {TARGET.relative_to(REPO_ROOT)}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
