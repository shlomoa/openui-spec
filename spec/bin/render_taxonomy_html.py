"""Render ``spec/taxonomy/generic-ui-taxonomy.md`` as a self-contained HTML page.

The HTML page is a convenience view of the Markdown source: the same content, with
every ``images/*.svg`` illustration embedded so the page opens on its own. The page
keeps its own ``<head>`` (title and styles); only the ``<body>`` is regenerated.

Usage: ``python -m spec.bin.render_taxonomy_html [--check]``. With ``--check`` the
page is not written; the command fails when it is out of date with the Markdown.
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
IMG_RE = re.compile(r'<img alt="(?P<alt>[^"]*)" src="(?P<src>images/[^"]+\.svg)"\s*/?>')
TITLE_RE = re.compile(r"<title>.*?</title>", re.S)


def _inline_image(match: re.Match[str], base: Path) -> str:
    data = base64.b64encode((base / match.group("src")).read_bytes()).decode("ascii")
    alt = match.group("alt")
    return f'<img src="data:image/svg+xml;base64,{data}" alt="{alt}" loading="lazy">'


def render(source: Path = SOURCE, target: Path = TARGET) -> str:
    """Return the HTML page for ``source``, reusing the ``<head>`` of ``target``."""
    text = source.read_text(encoding="utf-8")
    body = markdown.markdown(text, extensions=["tables"], output_format="html")
    body = IMG_RE.sub(lambda m: _inline_image(m, source.parent), body)
    head = target.read_text(encoding="utf-8").split("<body>", 1)[0]
    title = re.search(r"^# (.+)$", text, re.M)
    if title:
        head = TITLE_RE.sub(f"<title>{title.group(1).strip()}</title>", head, count=1)
    return f"{head}<body>\n{body}\n</body>\n</html>\n"


def main(argv: list[str] | None = None) -> int:
    """Write the HTML page, or with ``--check`` report whether it is up to date."""
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--check", action="store_true", help="Fail if the page is stale.")
    args = parser.parse_args(argv)

    page = render()
    if args.check:
        if TARGET.read_text(encoding="utf-8") != page:
            print(
                f"{TARGET.relative_to(REPO_ROOT)} is out of date; run "
                "python -m spec.bin.render_taxonomy_html",
                file=sys.stderr,
            )
            return 1
        print("Taxonomy HTML is up to date.")
        return 0
    TARGET.write_text(page, encoding="utf-8")
    print(f"Wrote {TARGET.relative_to(REPO_ROOT)}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
