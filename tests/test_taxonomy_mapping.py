import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
DOCS_TAXONOMY = REPO_ROOT / "spec" / "taxonomy" / "generic-ui-taxonomy.md"
SPEC_DIR = REPO_ROOT / "spec"
SCOPES_DIR = SPEC_DIR / "scopes"
TAXONOMY_MAPPING = SCOPES_DIR / "taxonomy_mapping.md"
UI_ELEMENT_TAXONOMY = SPEC_DIR / "taxonomy" / "ui-element-taxonomy.md"
SCOPES_INDEX = SCOPES_DIR / "scope.md"
SPEC_README = SPEC_DIR / "README.md"
MKDOCS_CONFIG = REPO_ROOT / "mkdocs.yml"

ALLOWED_ABSTRACTION_LEVELS = {
    "Existing object",
    "Alias",
    "Grouped leaf",
    "Folder abstraction",
}
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
LINK_TEXT_RE = re.compile(r"\[([^\]]+)\]\([^)]+\)")


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

    def test_mapping_headings_mirror_the_generic_taxonomy(self) -> None:
        self.assertEqual(
            _taxonomy_headings(TAXONOMY_MAPPING.read_text(encoding="utf-8")),
            _taxonomy_headings(DOCS_TAXONOMY.read_text(encoding="utf-8")),
        )

    def test_mapping_lists_every_taxonomy_entry_in_its_place(self) -> None:
        """Both documents list the same entries, with exact names, in the same place."""
        taxonomy = _placed_entries(DOCS_TAXONOMY.read_text(encoding="utf-8"))
        mapping = _placed_entries(self.mapping_text)

        self.assertEqual(sorted(set(taxonomy) - set(mapping)), [], "missing from the mapping")
        self.assertEqual(sorted(set(mapping) - set(taxonomy)), [], "missing from the taxonomy")
        self.assertEqual(mapping, taxonomy)

    def test_each_entry_is_listed_once(self) -> None:
        for path in (DOCS_TAXONOMY, TAXONOMY_MAPPING):
            with self.subTest(document=path.name):
                names = [name for _, _, name in _placed_entries(path.read_text(encoding="utf-8"))]
                duplicates = sorted({name for name in names if names.count(name) > 1})
                self.assertEqual(duplicates, [])

    def test_every_openui_term_of_the_ui_element_taxonomy_is_in_the_mapping(self) -> None:
        mapped = {name for _, _, name in _placed_entries(self.mapping_text)}
        mapped |= {LINK_TEXT_RE.sub(r"\1", row["spec_object"]) for row in self.mapping_rows}
        terms = _openui_terms(UI_ELEMENT_TAXONOMY.read_text(encoding="utf-8"))

        self.assertGreater(len(terms), 0)
        self.assertEqual(sorted(terms - mapped), [])


def _openui_terms(text: str) -> set[str]:
    """Return the terms of the "OpenUI term" column, without "Not added"."""
    terms: set[str] = set()
    column = None
    for line in text.splitlines():
        cells = _table_cells(line)
        if not cells:
            column = None
            continue
        if "OpenUI term" in cells:
            column = cells.index("OpenUI term")
        elif column is not None and not _is_separator_row(cells) and cells[column] != "Not added":
            terms.update(term.strip() for term in cells[column].split(";"))
    return terms


def _placed_entries(text: str) -> list[tuple[str, str, str]]:
    """Return (section, subcategory, entry) for every entry row, in document order."""
    entries: list[tuple[str, str, str]] = []
    section = subcategory = ""
    for line in text.splitlines():
        if line.startswith("## "):
            section, subcategory = line[3:].strip(), ""
        elif line.startswith("### "):
            subcategory = line[4:].strip()
        elif line.startswith("#"):
            continue
        cells = _table_cells(line)
        if len(cells) < 2 or cells[0] in {"Name", "Taxonomy entry"} or _is_separator_row(cells):
            continue
        entries.append((section, subcategory, cells[0]))
    return entries


def _taxonomy_headings(text: str) -> list[str]:
    """Return the section (##) and subcategory (###) headings that hold entry tables."""
    headings: list[str] = []
    pending: list[str] = []
    for line in text.splitlines():
        if line.startswith("## "):
            pending = [line]
        elif line.startswith("### "):
            pending = [heading for heading in pending if heading.startswith("## ")] + [line]
        elif _table_cells(line) and pending:
            headings.extend(heading for heading in pending if heading not in headings)
            pending = []
    return headings


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


if __name__ == "__main__":
    unittest.main()
