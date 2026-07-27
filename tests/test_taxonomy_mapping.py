import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
DOCS_TAXONOMY = REPO_ROOT / "docs" / "generic-ui-taxonomy.md"
SPEC_DIR = REPO_ROOT / "spec"
SCOPES_DIR = SPEC_DIR / "scopes"
TAXONOMY_MAPPING = SCOPES_DIR / "taxonomy_mapping.md"
SCOPES_INDEX = SCOPES_DIR / "scope.md"
SPEC_README = SPEC_DIR / "README.md"
MKDOCS_CONFIG = REPO_ROOT / "mkdocs.yml"

ALLOWED_ABSTRACTION_LEVELS = {
    "Existing object",
    "Alias",
    "Grouped leaf",
    "Folder abstraction",
}
INTENTIONAL_COMBINED_MAPPINGS = {"table/data grid"}
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")


class TaxonomyMappingTest(unittest.TestCase):
    """The generic UI taxonomy must map to canonical spec scope objects."""

    def setUp(self) -> None:
        self.mapping_text = TAXONOMY_MAPPING.read_text(encoding="utf-8")
        self.mapping_rows = _taxonomy_mapping_rows(self.mapping_text)

    def test_mapping_document_is_linked_from_spec_entry_points(self) -> None:
        self.assertIn(
            "[taxonomy mapping](taxonomy_mapping.md)",
            SCOPES_INDEX.read_text(encoding="utf-8"),
        )
        self.assertIn("](scopes/taxonomy_mapping.md)", SPEC_README.read_text(encoding="utf-8"))
        self.assertIn("scopes/taxonomy_mapping.md", MKDOCS_CONFIG.read_text(encoding="utf-8"))

    def test_mapping_document_does_not_disable_markdownlint(self) -> None:
        self.assertNotIn("markdownlint-disable", self.mapping_text)

    def test_mapping_uses_only_declared_abstraction_levels(self) -> None:
        levels = {row["level"] for row in self.mapping_rows}
        self.assertLessEqual(levels, ALLOWED_ABSTRACTION_LEVELS)

    def test_mapping_links_only_to_existing_scope_documents(self) -> None:
        for row in self.mapping_rows:
            with self.subTest(entry=row["entry"]):
                links = LINK_RE.findall(row["spec_object"])
                self.assertGreater(len(links), 0, row)
                for link in links:
                    self.assertFalse(link.startswith("../"), link)
                    self.assertTrue((SCOPES_DIR / link).is_file(), link)

    def test_every_taxonomy_entry_is_mapped(self) -> None:
        taxonomy_entries = {_normalize_taxonomy_entry(entry) for entry in _taxonomy_entries()}
        mapping_entries = {_normalize_taxonomy_entry(row["entry"]) for row in self.mapping_rows}

        self.assertEqual(taxonomy_entries - mapping_entries, set())

    def test_mapping_does_not_duplicate_taxonomy_entries(self) -> None:
        seen: set[str] = set()
        duplicates: set[str] = set()
        for row in self.mapping_rows:
            normalized = _normalize_taxonomy_entry(row["entry"])
            if normalized in seen:
                duplicates.add(normalized)
            seen.add(normalized)

        self.assertLessEqual(duplicates, INTENTIONAL_COMBINED_MAPPINGS)


def _taxonomy_entries() -> list[str]:
    entries: list[str] = []
    for line in DOCS_TAXONOMY.read_text(encoding="utf-8").splitlines():
        cells = _table_cells(line)
        if len(cells) < 2 or cells[0] in {"Name", "---"}:
            continue
        if _is_separator_row(cells):
            continue
        entries.append(cells[0])
    return entries


def _taxonomy_mapping_rows(text: str) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for line in text.splitlines():
        cells = _table_cells(line)
        if len(cells) != 4 or cells[0] == "Taxonomy entry" or _is_separator_row(cells):
            continue
        rows.append(
            {
                "entry": cells[0],
                "spec_object": cells[1],
                "level": cells[2],
                "notes": cells[3],
            }
        )
    return rows


def _table_cells(line: str) -> list[str]:
    stripped = line.strip()
    if not stripped.startswith("|") or not stripped.endswith("|"):
        return []
    return [cell.strip() for cell in stripped.strip("|").split("|")]


def _is_separator_row(cells: list[str]) -> bool:
    return all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells)


def _normalize_taxonomy_entry(value: str) -> str:
    normalized = value.lower().strip()
    normalized = re.sub(r"\s*/\s*", "/", normalized)
    normalized = re.sub(r",\s+and\s+", "/", normalized)
    normalized = re.sub(r",\s*", "/", normalized)
    normalized = re.sub(r"\s+and\s+", "/", normalized)
    normalized = re.sub(r"\s+", " ", normalized)
    return normalized


if __name__ == "__main__":
    unittest.main()
