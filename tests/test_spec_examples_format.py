import json
import subprocess
import sys
import unittest
from pathlib import Path
from typing import cast

from spec.to_json.converter import parse_leaf_scope

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
SCOPES_DIR = SPEC_DIR / "scopes"
EXAMPLES_DIR = SPEC_DIR / "examples"
EBNF_VALIDATOR = SPEC_DIR / "tests" / "test_example_json_ebnf.py"
SCHEMA_VERSION_FILE = REPO_ROOT / "SCHEMA_VERSION"

TYPE_COMPATIBILITY_ALIASES = {
    "Behaviors/drag_and_drop.scope.md": {"Draggable", "DropContainer", "DropTarget"},
    "Containers/expandable_panels.scope.md": {"ExpandablePanel", "PanelGroup"},
    "Containers/tabs.scope.md": {"TabGroup"},
    "Controls/native.scope.md": {"NativeControls"},
    "Views/forms.scope.md": {"FormView"},
    "Views/reports.scope.md": {"ReportView"},
    "Widgets/date_time_pickers.scope.md": {"mat-datetime-picker"},
    "Widgets/lists.scope.md": {"List"},
}


class SpecExamplesFormatTest(unittest.TestCase):
    def setUp(self) -> None:
        self.expected_version = SCHEMA_VERSION_FILE.read_text(encoding="utf-8").strip()

    def test_every_spec_example_is_ebnf_valid_openui_json(self) -> None:
        example_paths = sorted(EXAMPLES_DIR.rglob("*.example.json"))
        self.assertGreater(len(example_paths), 0)

        for path in example_paths:
            with self.subTest(path=path.relative_to(EXAMPLES_DIR).as_posix()):
                result = subprocess.run(
                    [sys.executable, str(EBNF_VALIDATOR), str(path)],
                    capture_output=True,
                    text=True,
                    check=False,
                    cwd=REPO_ROOT,
                )
                self.assertEqual(
                    result.returncode,
                    0,
                    f"stdout:\n{result.stdout}\nstderr:\n{result.stderr}",
                )

                document = json.loads(path.read_text(encoding="utf-8"))
                self.assertEqual(document["id"], "root")
                self.assertEqual(document["version"], self.expected_version)
                self.assertIsInstance(document.get("children"), list)
                self.assertGreater(len(document["children"]), 0)

    def test_every_leaf_scope_has_matching_example(self) -> None:
        self.assertEqual(_leaf_scope_paths(), _leaf_example_paths_as_scope_paths())

    def test_every_scope_folder_has_matching_composite_example(self) -> None:
        scope_folders = {
            path.parent.relative_to(SCOPES_DIR).as_posix() for path in SCOPES_DIR.rglob("scope.md")
        }
        example_folders = {
            path.parent.relative_to(EXAMPLES_DIR).as_posix()
            for path in EXAMPLES_DIR.rglob("scope.example.json")
        }

        self.assertEqual(scope_folders, example_folders)

    def test_leaf_examples_use_compatible_scope_type(self) -> None:
        for relative_scope_path in sorted(_leaf_scope_paths()):
            scope_path = SCOPES_DIR / relative_scope_path
            example_path = EXAMPLES_DIR / relative_scope_path.replace(".scope.md", ".example.json")

            with self.subTest(example=example_path.relative_to(EXAMPLES_DIR).as_posix()):
                scope_node = parse_leaf_scope(scope_path, scopes_dir=SCOPES_DIR)
                instance = cast(dict[str, object], scope_node["children"][0])
                compatible_types = {cast(str, scope_node["type"]), cast(str, instance["type"])}
                compatible_types.update(TYPE_COMPATIBILITY_ALIASES.get(relative_scope_path, set()))
                example_types = _document_types(
                    json.loads(example_path.read_text(encoding="utf-8"))
                )

                self.assertTrue(
                    compatible_types & example_types,
                    f"expected one of {sorted(compatible_types)} in {sorted(example_types)}",
                )


def _leaf_scope_paths() -> set[str]:
    return {
        path.relative_to(SCOPES_DIR).as_posix()
        for path in SCOPES_DIR.rglob("*.scope.md")
        if path.name != "template.scope.md"
    }


def _leaf_example_paths_as_scope_paths() -> set[str]:
    return {
        path.relative_to(EXAMPLES_DIR).as_posix().replace(".example.json", ".scope.md")
        for path in EXAMPLES_DIR.rglob("*.example.json")
        if path.name != "scope.example.json"
    }


def _document_types(node: object) -> set[str]:
    if not isinstance(node, dict):
        return set()

    document = cast(dict[str, object], node)
    node_type = document.get("type")
    types: set[str] = {node_type} if isinstance(node_type, str) else set()
    children = document.get("children", [])
    if isinstance(children, list):
        for child in cast(list[object], children):
            types.update(_document_types(child))
    return types


if __name__ == "__main__":
    unittest.main()
