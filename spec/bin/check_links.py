"""Check internal Markdown links: relative targets must exist and ``#anchors`` must resolve.

External links (any URL scheme or ``//host``) are skipped; no network access is used.
Anchors are validated against GitHub heading slugs and explicit HTML ``id``/``name``
attributes of Markdown targets. Anchors into non-Markdown files are not checked.

Usage: ``python -m spec.bin.check_links [FILE.md ...]``. Without arguments every
tracked Markdown file (``git ls-files``) outside ``spec/survey/`` is checked.
"""

from __future__ import annotations

import re
import subprocess
import sys
from functools import cache
from pathlib import Path
from urllib.parse import unquote

REPO_ROOT = Path(__file__).resolve().parents[2]
EXCLUDED_PREFIXES = ("spec/survey/",)

FENCE_RE = re.compile(r"^\s{0,3}(```|~~~)")
CODE_SPAN_RE = re.compile(r"(`+)(?:(?!\1).)+?\1")
INLINE_LINK_RE = re.compile(
    r"\]\(\s*(?P<target><[^>\n]*>|[^()\s]*(?:\([^()\s]*\)[^()\s]*)*)"
    r"(?:\s+(?:\"[^\"]*\"|'[^']*'|\([^)]*\)))?\s*\)"
)
REFERENCE_DEF_RE = re.compile(r"^\s{0,3}\[[^\]]+\]:\s*(?P<target><[^>]*>|\S+)")
SCHEME_RE = re.compile(r"^[A-Za-z][A-Za-z0-9+.-]*:")
HEADING_RE = re.compile(r"^\s{0,3}#{1,6}\s+(?P<text>.*?)(?:\s+#+)?\s*$")
HTML_ANCHOR_RE = re.compile(r"""<[^>]+\b(?:id|name)\s*=\s*["']([^"']+)["']""")
MARKDOWN_LINK_TEXT_RE = re.compile(r"!?\[([^\]]*)\]\([^)]*\)")
HTML_TAG_RE = re.compile(r"<[^>]+>")
UNDERSCORE_EMPHASIS_RE = re.compile(r"(?<![\w])_{1,2}([^_]+?)_{1,2}(?![\w])")
SLUG_DROP_RE = re.compile(r"[^\w\- ]")


def _content_lines(text: str) -> list[tuple[int, str]]:
    """Yield ``(line_number, line)`` pairs outside fenced code blocks, code spans blanked."""
    lines: list[tuple[int, str]] = []
    fence: str | None = None
    for number, line in enumerate(text.splitlines(), start=1):
        match = FENCE_RE.match(line)
        if match:
            marker = match.group(1)
            if fence is None:
                fence = marker
            elif marker == fence:
                fence = None
            continue
        if fence is None:
            lines.append((number, CODE_SPAN_RE.sub(lambda m: " " * len(m.group(0)), line)))
    return lines


def github_slug(heading: str) -> str:
    """Return the GitHub anchor slug for a Markdown heading's source text."""
    text = MARKDOWN_LINK_TEXT_RE.sub(r"\1", heading)
    text = HTML_TAG_RE.sub("", text)
    text = UNDERSCORE_EMPHASIS_RE.sub(r"\1", text)
    return SLUG_DROP_RE.sub("", text.strip().lower()).replace(" ", "-")


@cache
def anchors(path: Path) -> frozenset[str]:
    """Return every anchor a Markdown file exposes (GitHub heading slugs and HTML ids)."""
    text = path.read_text(encoding="utf-8")
    found = {anchor.lower() for anchor in HTML_ANCHOR_RE.findall(text)}
    seen: dict[str, int] = {}
    fence: str | None = None
    for line in text.splitlines():
        match = FENCE_RE.match(line)
        if match:
            marker = match.group(1)
            fence = marker if fence is None else (None if marker == fence else fence)
            continue
        if fence is None and (heading := HEADING_RE.match(line)):
            slug = github_slug(heading.group("text"))
            count = seen.get(slug, 0)
            seen[slug] = count + 1
            found.add(slug if count == 0 else f"{slug}-{count}")
    return frozenset(found)


def link_targets(text: str) -> list[tuple[int, str]]:
    """Return ``(line_number, target)`` for inline links, images, and reference definitions."""
    targets: list[tuple[int, str]] = []
    for number, line in _content_lines(text):
        targets += [(number, m.group("target")) for m in INLINE_LINK_RE.finditer(line)]
        if match := REFERENCE_DEF_RE.match(line):
            targets.append((number, match.group("target")))
    return [(number, target.strip("<>")) for number, target in targets]


def check_link(source: Path, target: str, repo_root: Path = REPO_ROOT) -> str | None:
    """Return an error message when an internal link is broken, otherwise ``None``."""
    if not target or SCHEME_RE.match(target) or target.startswith("//"):
        return None
    path_part, _, anchor = target.partition("#")
    path_part = unquote(path_part.split("?", 1)[0])
    if not path_part:
        resolved = source
    elif path_part.startswith("/"):
        resolved = repo_root / path_part.lstrip("/")
    else:
        resolved = source.parent / path_part
    if not resolved.exists():
        return "target does not exist"
    is_markdown = resolved.is_file() and resolved.suffix.lower() == ".md"
    if anchor and is_markdown and unquote(anchor).lower() not in anchors(resolved.resolve()):
        return f"anchor #{anchor} not found in {resolved.name}"
    return None


def check_file(path: Path, repo_root: Path = REPO_ROOT) -> list[str]:
    """Return ``path:line: message`` errors for every broken internal link in ``path``."""
    text = path.read_text(encoding="utf-8")
    errors = []
    for number, target in link_targets(text):
        if error := check_link(path, target, repo_root):
            errors.append(f"{path.as_posix()}:{number}: broken link '{target}' ({error})")
    return errors


def tracked_markdown(repo_root: Path = REPO_ROOT) -> list[Path]:
    """Return tracked Markdown files outside excluded paths."""
    output = subprocess.run(
        ["git", "ls-files", "*.md"],
        cwd=repo_root,
        check=True,
        capture_output=True,
        text=True,
    ).stdout
    return [
        repo_root / name
        for name in output.splitlines()
        if name and not name.startswith(EXCLUDED_PREFIXES)
    ]


def main(argv: list[str] | None = None) -> int:
    """Check the given Markdown files, or every tracked Markdown file when none are given."""
    arguments = sys.argv[1:] if argv is None else argv
    files = [Path(name) for name in arguments] or tracked_markdown()
    errors = [error for path in files for error in check_file(path)]
    for error in errors:
        print(error, file=sys.stderr)
    if errors:
        print(f"Markdown link check failed: {len(errors)} broken link(s).", file=sys.stderr)
        return 1
    print(f"Markdown link check passed ({len(files)} file(s)).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
