"""Render the two taxonomy documents of ``spec/taxonomy/`` as self-contained HTML pages.

``generic-ui-taxonomy.md`` becomes ``generic-ui-taxonomy.html`` and
``ui-element-taxonomy.md`` becomes ``ui-element-taxonomy.html``. Each HTML page is a
convenience view of its Markdown source: the same content, with every ``images/*.svg``
illustration embedded so the page opens on its own and every fenced code block (such as
the Mermaid diagram) shown as preformatted source. The pages are published on the Read
the Docs site, so each link to another Markdown page points to that page's URL on the
site (``x.md#a`` becomes ``x/#a``), and each heading has an id for ``#anchor`` links.
Each page keeps its own ``<head>`` (title and styles); only the ``<body>`` is
regenerated.

Usage: ``python -m spec.bin.render_taxonomy_html [--check]``. With ``--check`` no page is
written; the command fails when a page is out of date with its Markdown.
"""

from __future__ import annotations

import argparse
import base64
import re
import sys
from pathlib import Path

import markdown

REPO_ROOT = Path(__file__).resolve().parents[2]
SOURCE = REPO_ROOT / "spec" / "taxonomy" / "generic-ui-taxonomy.md"
TARGET = REPO_ROOT / "spec" / "taxonomy" / "generic-ui-taxonomy.html"
ELEMENT_SOURCE = REPO_ROOT / "spec" / "taxonomy" / "ui-element-taxonomy.md"
ELEMENT_TARGET = REPO_ROOT / "spec" / "taxonomy" / "ui-element-taxonomy.html"
PAGES = ((SOURCE, TARGET), (ELEMENT_SOURCE, ELEMENT_TARGET))
IMG_RE = re.compile(r'<img alt="(?P<alt>[^"]*)" src="(?P<src>images/[^"]+\.svg)"\s*/?>')
TITLE_RE = re.compile(r"<title>.*?</title>", re.S)
MD_LINK_RE = re.compile(
    r'href="(?P<path>(?![A-Za-z][A-Za-z0-9+.-]*:)[^"#]+)\.md(?P<anchor>#[^"]*)?"'
)


def _inline_image(match: re.Match[str], base: Path) -> str:
    data = base64.b64encode((base / match.group("src")).read_bytes()).decode("ascii")
    alt = match.group("alt")
    return f'<img src="data:image/svg+xml;base64,{data}" alt="{alt}" loading="lazy">'


def render(source: Path = SOURCE, target: Path = TARGET) -> str:
    """Return the HTML page for ``source``, reusing the ``<head>`` of ``target``."""
    text = source.read_text(encoding="utf-8")
    body = markdown.markdown(
        text, extensions=["tables", "toc", "fenced_code"], output_format="html"
    )
    body = IMG_RE.sub(lambda m: _inline_image(m, source.parent), body)
    body = MD_LINK_RE.sub(lambda m: f'href="{m["path"]}/{m["anchor"] or ""}"', body)
    head = target.read_text(encoding="utf-8").split("<body>", 1)[0]
    title = re.search(r"^# (.+)$", text, re.M)
    if title:
        head = TITLE_RE.sub(f"<title>{title.group(1).strip()}</title>", head, count=1)
    return f"{head}<body>\n{body}\n</body>\n</html>\n"


def main(argv: list[str] | None = None) -> int:
    """Write the HTML pages, or with ``--check`` report whether they are up to date."""
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--check", action="store_true", help="Fail if a page is stale.")
    args = parser.parse_args(argv)

    stale = False
    for source, target in PAGES:
        page = render(source, target)
        name = target.relative_to(REPO_ROOT)
        if args.check:
            if target.read_text(encoding="utf-8") != page:
                print(
                    f"{name} is out of date; run python -m spec.bin.render_taxonomy_html",
                    file=sys.stderr,
                )
                stale = True
            continue
        target.write_text(page, encoding="utf-8")
        print(f"Wrote {name}.")
    if args.check and not stale:
        print("Taxonomy HTML is up to date.")
    return 1 if stale else 0


if __name__ == "__main__":
    sys.exit(main())
