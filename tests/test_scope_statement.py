import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
SCOPES_DIR = SPEC_DIR / "scopes"
SCOPE_STATEMENT = SPEC_DIR / "survey" / "scope_statement.md"

CATALOG_ROW = re.compile(r"^\|\s*\[[^\]]+\]\(\.\./scopes/([^)#]+)(?:#[^)]*)?\)\s*\|(.*)\|\s*$")


def catalog_rows() -> dict[str, list[str]]:
    """Rows of the catalog-objects table: scope path -> remaining cells."""
    text = SCOPE_STATEMENT.read_text(encoding="utf-8")
    section = text.split("### Catalog objects", 1)[1].split("\n### ", 1)[0]
    rows: dict[str, list[str]] = {}
    for line in section.splitlines():
        match = CATALOG_ROW.match(line)
        if match:
            path = match.group(1)
            if path in rows:
                raise AssertionError(f"{path}: listed twice")
            rows[path] = [cell.strip() for cell in match.group(2).split("|")]
    return rows


def scope_documents() -> set[str]:
    top_level = {p.relative_to(SCOPES_DIR).as_posix() for p in SCOPES_DIR.glob("*/scope.md")}
    leaves = {p.relative_to(SCOPES_DIR).as_posix() for p in SCOPES_DIR.glob("*/*.scope.md")}
    return top_level | leaves


class ScopeStatementTest(unittest.TestCase):
    """W2 task 11: every catalog object is classified, and none is out of scope."""

    def test_catalog_table_lists_every_scope_document_once(self) -> None:
        self.assertEqual(set(catalog_rows()), scope_documents())

    def test_every_catalog_object_is_in_scope(self) -> None:
        for path, cells in catalog_rows().items():
            with self.subTest(scope=path):
                self.assertEqual(cells[-1], "In")


if __name__ == "__main__":
    unittest.main()
