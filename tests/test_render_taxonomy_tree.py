"""Regression coverage for the interactive taxonomy tree renderer."""

from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from spec.bin.render_taxonomy_tree import SOURCE, SOURCES, TARGET, parse, render


def _row(*cells: str) -> str:
    return "| " + " | ".join(cells) + " |\n"


HEADER = _row(
    "Taxonomy entry",
    "Spec object",
    "Abstraction level",
    "HTML / WAI-ARIA",
    "OpenUI5",
    "Qt",
    "Angular Material",
    "Notes",
) + _row(*["---"] * 8)
ACTION = "[Action controls](Controls/action_controls.scope.md)"
DRAG = "[Drag and drop](Behaviors/drag_and_drop.scope.md)"
FIXTURE = (
    "# Taxonomy mapping\n\nIntro.\n\n## Input elements\n\n### Command activation\n\n"
    + HEADER
    + _row(
        "Button",
        ACTION,
        "Grouped leaf",
        "`button`",
        "`sap.m.Button`",
        "`QPushButton`",
        "`button`",
        "—",
    )
    + _row("Toggle <b>", ACTION, "Alias", "—", "—", "—", "—", "—")
    + "\n## Behaviors\n\n"
    + HEADER
    + _row("Drag and drop", DRAG, "Existing object", "`draggable`", "—", "—", "`drag-drop`", "—")
    + "\n## Primary categories of the leaf scopes\n\n"
    + _row("Leaf scope", "Primary section", "Primary subcategory", "Secondary roles")
    + _row(*["---"] * 4)
    + _row(ACTION, "Input elements", "Command activation", "—")
)


class RenderTaxonomyTreeTest(unittest.TestCase):
    def test_repository_page_is_up_to_date(self) -> None:
        self.assertEqual(TARGET.read_text(encoding="utf-8"), render())

    def test_source_is_the_taxonomy_mapping(self) -> None:
        self.assertEqual(SOURCE.name, "taxonomy_mapping.md")

    def test_tree_nests_sections_subcategories_and_entries(self) -> None:
        title, sections = parse(FIXTURE)

        self.assertEqual(title, "Taxonomy mapping")
        self.assertEqual([section.title for section in sections], ["Input elements", "Behaviors"])
        self.assertEqual([child.title for child in sections[0].children], ["Command activation"])
        self.assertEqual(
            [cells[0] for cells in sections[0].children[0].entries], ["Button", "Toggle <b>"]
        )
        self.assertEqual([cells[0] for cells in sections[1].entries], ["Drag and drop"])

    def test_page_has_one_overlay_per_source_and_escapes_text(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            source = Path(temporary) / "mapping.md"
            source.write_text(FIXTURE, encoding="utf-8")
            page = render(source)

        for key, _ in SOURCES:
            with self.subTest(source=key):
                self.assertIn(f'id="overlay-{key}"', page)
                self.assertIn(f'class="alias alias-{key}"', page)
        self.assertIn("<code>QPushButton</code>", page)
        self.assertIn("→ Action controls", page)
        self.assertNotIn("action_controls.scope.md", page)
        self.assertIn("Toggle &lt;b&gt;", page)
        self.assertNotIn("Primary section", page)
        self.assertIn("3 taxonomy entries in 2 sections", page)


if __name__ == "__main__":
    unittest.main()
