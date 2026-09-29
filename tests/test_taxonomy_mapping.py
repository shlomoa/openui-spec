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
MAPPING_COLUMNS = (
    "entry",
    "spec_object",
    "level",
    "html_aria",
    "openui5",
    "qt",
    "angular_material",
    "notes",
)
ALIAS_HEADER = (
    "Taxonomy entry",
    "Spec object",
    "Abstraction level",
    "HTML / WAI-ARIA",
    "OpenUI5",
    "Qt",
    "Angular Material",
    "Notes",
)
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
LINK_TEXT_RE = re.compile(r"\[([^\]]+)\]\([^)]+\)")
PRIMARY_HEADING = "## Primary categories of the leaf scopes"
LEAF_LINK_RE = re.compile(r"\]\(([A-Za-z]+/[a-z_]+\.scope\.md)\)")
NOT_PLACED = {
    "Application/favicon.scope.md",
    "Application/index_html.scope.md",
    "Controls/native.scope.md",
}


class TaxonomyMappingTest(unittest.TestCase):
    """The generic UI taxonomy must map to canonical spec scope objects."""

    def setUp(self) -> None:
        self.mapping_text = _entry_part(TAXONOMY_MAPPING.read_text(encoding="utf-8"))
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

    def test_every_mapping_row_has_the_four_alias_columns(self) -> None:
        """Every table has the HTML / WAI-ARIA, OpenUI5, Qt and Angular Material columns."""
        headers = [
            tuple(_table_cells(line))
            for line in self.mapping_text.splitlines()
            if line.startswith("| Taxonomy entry")
        ]
        self.assertGreater(len(headers), 0)
        for header in headers:
            self.assertEqual(header, ALIAS_HEADER)
        self.assertGreater(len(self.mapping_rows), 0)
        for row in self.mapping_rows:
            with self.subTest(entry=row["entry"]):
                for column in ("html_aria", "openui5", "qt", "angular_material"):
                    self.assertRegex(row[column], r"^(—|`[^`]+`(, `[^`]+`)*)$")

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
            _taxonomy_headings(_entry_part(TAXONOMY_MAPPING.read_text(encoding="utf-8"))),
            _taxonomy_headings(DOCS_TAXONOMY.read_text(encoding="utf-8")),
        )

    def test_mapping_lists_every_taxonomy_entry_in_its_place(self) -> None:
        """Both documents list the same entries, with exact names, in the same place."""
        taxonomy = _placed_entries(DOCS_TAXONOMY.read_text(encoding="utf-8"))
        mapping = _placed_entries(self.mapping_text)

        self.assertEqual(sorted(set(taxonomy) - set(mapping)), [], "missing from the mapping")
        self.assertEqual(sorted(set(mapping) - set(taxonomy)), [], "missing from the taxonomy")
        self.assertEqual(mapping, taxonomy)

    def test_every_taxonomy_entry_has_an_image_or_needs_none(self) -> None:
        image_re = re.compile(r"!\[[^\]]+\]\((images/[^)]+\.svg)\)")
        for line in DOCS_TAXONOMY.read_text(encoding="utf-8").splitlines():
            cells = _table_cells(line)
            if len(cells) < 2 or cells[0] == "Name" or _is_separator_row(cells):
                continue
            with self.subTest(entry=cells[0]):
                match = image_re.fullmatch(cells[-1])
                if cells[-1] != "Not applicable":
                    self.assertIsNotNone(match, cells[-1])
                    self.assertTrue(
                        (DOCS_TAXONOMY.parent / match.group(1)).is_file(), match.group(1)
                    )

    def test_each_entry_has_one_section_and_at_most_one_subcategory(self) -> None:
        """Each entry is listed once, under a section and at most one subcategory of it."""
        for path in (DOCS_TAXONOMY, TAXONOMY_MAPPING):
            text = _entry_part(path.read_text(encoding="utf-8"))
            entries = _placed_entries(text)
            names = [name for _, _, name in entries]
            subcategories = [
                line[4:].strip() for line in text.splitlines() if line.startswith("### ")
            ]
            with self.subTest(document=path.name):
                self.assertGreater(len(entries), 0)
                duplicates = sorted({name for name in names if names.count(name) > 1})
                self.assertEqual(duplicates, [], "entries listed more than once")
                repeated = sorted({name for name in subcategories if subcategories.count(name) > 1})
                self.assertEqual(repeated, [], "subcategories in more than one section")
            for section, _, name in entries:
                with self.subTest(document=path.name, entry=name):
                    self.assertNotEqual(section, "", "entry outside every section")

    def test_every_openui_term_of_the_ui_element_taxonomy_is_in_the_mapping(self) -> None:
        mapped = {name for _, _, name in _placed_entries(self.mapping_text)}
        mapped |= {LINK_TEXT_RE.sub(r"\1", row["spec_object"]) for row in self.mapping_rows}
        terms = _openui_terms(UI_ELEMENT_TAXONOMY.read_text(encoding="utf-8"))

        self.assertGreater(len(terms), 0)
        self.assertEqual(sorted(terms - mapped), [])


class LeafPrimaryCategoryTest(unittest.TestCase):
    """W3 14.12: each leaf scope has one primary section and subcategory."""

    def setUp(self) -> None:
        text = TAXONOMY_MAPPING.read_text(encoding="utf-8")
        self.entry_text = _entry_part(text)
        self.table = _primary_table(text)

    def test_every_leaf_scope_is_listed_once(self) -> None:
        leaves = sorted(
            p.relative_to(SCOPES_DIR).as_posix() for p in SCOPES_DIR.glob("*/*.scope.md")
        )
        self.assertEqual(sorted(self.table), leaves)

    def test_only_leaves_without_entries_are_not_placed(self) -> None:
        linked = {leaf for leaf, _, _, _ in _linked_entries(self.entry_text)}
        not_placed = {leaf for leaf, row in self.table.items() if row[0] == "Not placed"}
        self.assertEqual(not_placed, NOT_PLACED)
        self.assertEqual(not_placed & linked, set())

    def test_primary_and_secondary_places_follow_the_rules(self) -> None:
        by_leaf: dict[str, list[tuple[str, str, str]]] = {}
        for leaf, section, subcategory, level in _linked_entries(self.entry_text):
            by_leaf.setdefault(leaf, []).append((section, subcategory, level))
        placed = {leaf for leaf, row in self.table.items() if row[0] != "Not placed"}
        self.assertEqual(set(by_leaf), placed)
        for leaf, rows in by_leaf.items():
            with self.subTest(leaf=leaf):
                primary = _derived_primary(leaf, rows)
                places = list(dict.fromkeys((s, b) for s, b, _ in rows))
                secondary = [_place(*p) for p in places if p != primary]
                self.assertEqual(
                    self.table[leaf],
                    [primary[0], primary[1] or "—", "; ".join(secondary) or "—"],
                )


def _entry_part(text: str) -> str:
    """The mapping without its leaf primary-category section."""
    return text.split("\n" + PRIMARY_HEADING, 1)[0]


def _primary_table(text: str) -> dict[str, list[str]]:
    table: dict[str, list[str]] = {}
    part = text.split(PRIMARY_HEADING, 1)[1]
    for line in part.splitlines():
        cells = _table_cells(line)
        if len(cells) != 4 or cells[0] == "Leaf scope" or _is_separator_row(cells):
            continue
        match = LEAF_LINK_RE.search(cells[0])
        leaf = match.group(1) if match else cells[0]
        if leaf in table:
            raise AssertionError(f"{leaf}: listed twice")
        table[leaf] = cells[1:]
    return table


def _linked_entries(text: str) -> list[tuple[str, str, str, str]]:
    """(leaf, section, subcategory, level) for every entry that links to a leaf scope."""
    rows: list[tuple[str, str, str, str]] = []
    section = subcategory = ""
    for line in text.splitlines():
        if line.startswith("## "):
            section, subcategory = line[3:].strip(), ""
        elif line.startswith("### "):
            subcategory = line[4:].strip()
        cells = _table_cells(line)
        if len(cells) != len(MAPPING_COLUMNS) or cells[0] == "Taxonomy entry":
            continue
        if _is_separator_row(cells):
            continue
        match = LEAF_LINK_RE.search(cells[1])
        if match:
            rows.append((match.group(1), section, subcategory, cells[2]))
    return rows


def _derived_primary(leaf: str, rows: list[tuple[str, str, str]]) -> tuple[str, str]:
    own = [(s, b) for s, b, level in rows if level == "Existing object"]
    if own:
        return own[0]
    if leaf.startswith("Behaviors/"):
        return ("Behaviors", "")
    counts: dict[tuple[str, str], int] = {}
    for s, b, _ in rows:
        counts[(s, b)] = counts.get((s, b), 0) + 1
    top = max(counts.values())
    best = [place for place, count in counts.items() if count == top]
    if len(best) > 1:
        best = [(s, b) for s, b, level in rows if level == "Grouped leaf" and (s, b) in best]
    return best[0]


def _place(section: str, subcategory: str) -> str:
    return f"{section}: {subcategory}" if subcategory else section


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
        if not cells or cells[0] == "Taxonomy entry" or _is_separator_row(cells):
            continue
        rows.append(dict(zip(MAPPING_COLUMNS, cells, strict=True)))
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
