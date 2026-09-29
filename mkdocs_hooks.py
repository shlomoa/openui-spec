"""MkDocs hook: point links to unpublished files at their source on GitHub.

The site leaves out some files of ``docs_dir`` (``exclude_docs``, for example the
survey archive). The spec still links to them, so each such link on a page is
rewritten to the file on the ``main`` branch on GitHub, which keeps it working.
"""

from __future__ import annotations

import posixpath
import re

LINK_RE = re.compile(r"\]\((?P<target>[^()\s#]+)(?P<anchor>#[^()\s]*)?\)")
SCHEME_RE = re.compile(r"^[A-Za-z][A-Za-z0-9+.-]*:|^/")


def source_url(config) -> str:
    """Return the GitHub URL of ``docs_dir``, derived from ``repo_url`` and ``edit_uri``."""
    return f"{config['repo_url'].rstrip('/')}/{config['edit_uri'].replace('edit/', 'blob/', 1)}"


def on_page_markdown(markdown, page, config, files):
    """Rewrite each relative link to an excluded file into its GitHub source URL."""
    base = source_url(config)
    page_dir = posixpath.dirname(page.file.src_uri)

    def rewrite(match: re.Match) -> str:
        target = match.group("target")
        if SCHEME_RE.match(target):
            return match.group(0)
        path = posixpath.normpath(posixpath.join(page_dir, target))
        file = files.get_file_from_path(path)
        if file is None or not file.inclusion.is_excluded():
            return match.group(0)
        return f"]({base}{path}{match.group('anchor') or ''})"

    return LINK_RE.sub(rewrite, markdown)
