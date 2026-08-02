import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
SCOPES_DIR = SPEC_DIR / "scopes"
SPEC_README = SPEC_DIR / "README.md"
OPENUI_JSON = REPO_ROOT / "openui.json"
MKDOCS_CONFIG = REPO_ROOT / "mkdocs.yml"
NAV_ENTRY_PATTERN = re.compile(r"^\s*-\s+.*?:\s+(.+\.md)$")
TOP_LEVEL_SCOPE_LINK_PATTERN = re.compile(r"^- \[([^\]]+)\]\(([^)]+/scope\.md)\):", re.MULTILINE)
EXPECTED_SPEC_MARKDOWN = [
    "README.md",
    "examples/README.md",
    "scopes/Application/favicon.scope.md",
    "scopes/Application/index_html.scope.md",
    "scopes/Application/navigation.scope.md",
    "scopes/Application/routing.scope.md",
    "scopes/Application/scope.md",
    "scopes/Application/tool_bars.scope.md",
    "scopes/Behaviors/collapsible.scope.md",
    "scopes/Behaviors/drag_and_drop.scope.md",
    "scopes/Behaviors/resizable.scope.md",
    "scopes/Behaviors/scope.md",
    "scopes/Containers/expandable_panels.scope.md",
    "scopes/Containers/grid.scope.md",
    "scopes/Containers/overlay_containers.scope.md",
    "scopes/Containers/scope.md",
    "scopes/Containers/sheet_containers.scope.md",
    "scopes/Containers/splitters.scope.md",
    "scopes/Containers/structural_containers.scope.md",
    "scopes/Containers/surface_containers.scope.md",
    "scopes/Containers/tabs.scope.md",
    "scopes/Controls/Table/scope.md",
    "scopes/Controls/Table/table.scope.md",
    "scopes/Controls/Table/td.scope.md",
    "scopes/Controls/Table/th.scope.md",
    "scopes/Controls/Table/tr.scope.md",
    "scopes/Controls/action_controls.scope.md",
    "scopes/Controls/choice_controls.scope.md",
    "scopes/Controls/display_primitives.scope.md",
    "scopes/Controls/drawing_and_capture.scope.md",
    "scopes/Controls/link_and_scroll_controls.scope.md",
    "scopes/Controls/native.scope.md",
    "scopes/Controls/picker_controls.scope.md",
    "scopes/Controls/range_controls.scope.md",
    "scopes/Controls/scope.md",
    "scopes/Controls/status_indicators.scope.md",
    "scopes/Controls/text_inputs.scope.md",
    "scopes/Interaction/scope.md",
    "scopes/Internationalization/scope.md",
    "scopes/Layout/scope.md",
    "scopes/Pages/dashboard.scope.md",
    "scopes/Pages/empty_page.scope.md",
    "scopes/Pages/scope.md",
    "scopes/Pages/shell_page.scope.md",
    "scopes/Presentation/scope.md",
    "scopes/Views/forms.scope.md",
    "scopes/Views/reports.scope.md",
    "scopes/Views/scope.md",
    "scopes/Widgets/charts.scope.md",
    "scopes/Widgets/data_grid.scope.md",
    "scopes/Widgets/date_time_pickers.scope.md",
    "scopes/Widgets/dialog.scope.md",
    "scopes/Widgets/feedback_widgets.scope.md",
    "scopes/Widgets/lists.scope.md",
    "scopes/Widgets/media_widgets.scope.md",
    "scopes/Widgets/menu_widgets.scope.md",
    "scopes/Widgets/navigation_widgets.scope.md",
    "scopes/Widgets/scope.md",
    "scopes/Widgets/stepper.scope.md",
    "scopes/Widgets/tables.scope.md",
    "scopes/evidence.md",
    "scopes/scope.md",
    "scopes/taxonomy_mapping.md",
    "scopes/template.scope.md",
    "tooling/comparison.md",
]


class SpecReadmeSpecTest(unittest.TestCase):
    def test_spec_folder_contains_expected_markdown_files(self) -> None:
        markdown_files = sorted(
            path.relative_to(SPEC_DIR).as_posix() for path in SPEC_DIR.rglob("*.md")
        )

        self.assertEqual(markdown_files, EXPECTED_SPEC_MARKDOWN)

    def test_spec_readme_documents_current_minimal_contract(self) -> None:
        content = SPEC_README.read_text(encoding="utf-8")

        self.assertIn("# OpenUI Specification", content)
        self.assertIn("## Spec folder structure", content)
        self.assertIn("## Spec format", content)
        self.assertIn("### EBNF notation", content)
        self.assertIn("### Syntax rules", content)
        self.assertIn("## How to read this spec", content)
        self.assertNotIn("section documents listed below", content)

    def test_spec_readme_scope_table_links_every_scope_document(self) -> None:
        content = SPEC_README.read_text(encoding="utf-8")

        # The "Spec folder structure" table links every top-level scope, its
        # direct leaves, and each family index — but not individual family tag
        # leaves (those are reached by drilling into the family index). It also
        # excludes the README itself, the scopes index, and the evidence register.
        for relative_path in EXPECTED_SPEC_MARKDOWN:
            segments = relative_path.split("/")
            is_family_tag_leaf = len(segments) >= 4 and segments[-1] != "scope.md"
            if relative_path in {
                "README.md",
                "scopes/scope.md",
                "scopes/evidence.md",
                "scopes/template.scope.md",
                "examples/README.md",
                "tooling/comparison.md",
            }:
                continue
            if is_family_tag_leaf:
                continue
            with self.subTest(relative_path=relative_path):
                self.assertIn(f"]({relative_path})", content)

    def test_top_level_scopes_are_listed_in_scope_index_readme_and_nav(self) -> None:
        scope_index = (SCOPES_DIR / "scope.md").read_text(encoding="utf-8")
        spec_readme = SPEC_README.read_text(encoding="utf-8")
        nav_docs = set(_mkdocs_referenced_docs())

        for scope_name in _top_level_scope_names():
            scope_document = f"scopes/{scope_name}/scope.md"
            with self.subTest(scope=scope_name):
                self.assertIn(f"]({scope_name}/scope.md):", scope_index)
                self.assertIn(f"]({scope_document})", spec_readme)
                self.assertIn(scope_document, nav_docs)

    def test_scope_index_top_level_scope_links_match_scope_folders(self) -> None:
        scope_index = (SCOPES_DIR / "scope.md").read_text(encoding="utf-8")
        linked_scope_names = {
            name
            for name, link in TOP_LEVEL_SCOPE_LINK_PATTERN.findall(scope_index)
            if link == f"{name}/scope.md"
        }

        self.assertEqual(linked_scope_names, _top_level_scope_names())

    def test_taxonomy_mapping_is_linked_from_entry_points_and_nav(self) -> None:
        self.assertIn(
            "[taxonomy mapping](taxonomy_mapping.md)",
            (SCOPES_DIR / "scope.md").read_text(encoding="utf-8"),
        )
        self.assertIn(
            "[taxonomy mapping](scopes/taxonomy_mapping.md)",
            SPEC_README.read_text(encoding="utf-8"),
        )
        self.assertIn("scopes/taxonomy_mapping.md", _mkdocs_referenced_docs())

    def test_openui_json_exists_and_is_valid_when_populated(self) -> None:
        content = OPENUI_JSON.read_text(encoding="utf-8").strip()

        if content:
            json.loads(content)

    def test_mkdocs_nav_points_to_expected_spec_markdown(self) -> None:
        referenced_docs = _mkdocs_referenced_docs()

        self.assertEqual(sorted(referenced_docs), EXPECTED_SPEC_MARKDOWN)
        for relative_path in referenced_docs:
            with self.subTest(relative_path=relative_path):
                self.assertTrue((SPEC_DIR / relative_path).is_file())


def _top_level_scope_names() -> set[str]:
    return {path.name for path in SCOPES_DIR.iterdir() if path.is_dir()}


def _mkdocs_referenced_docs() -> list[str]:
    config = MKDOCS_CONFIG.read_text(encoding="utf-8")
    return [
        match.group(1)
        for line in config.splitlines()
        for match in [NAV_ENTRY_PATTERN.match(line)]
        if match is not None
    ]


if __name__ == "__main__":
    unittest.main()
