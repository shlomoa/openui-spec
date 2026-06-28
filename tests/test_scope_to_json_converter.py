import json
import tempfile
import unittest
from pathlib import Path

from spec.to_json.converter import build_openui_document, build_scope_tree, main, parse_leaf_scope

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
SCOPES_DIR = SPEC_DIR / "scopes"
DIALOG_SCOPE = SCOPES_DIR / "Widgets" / "dialog.scope.md"


class ScopeToJsonConverterTest(unittest.TestCase):
    def test_parse_leaf_scope_emits_scope_node_and_instance_contract(self) -> None:
        node = parse_leaf_scope(DIALOG_SCOPE, scopes_dir=SCOPES_DIR)

        self.assertEqual(node["id"], "dialog")
        self.assertEqual(node["type"], "Dialog")
        self.assertEqual(
            node["attrs"],
            {
                "title": "Dialog",
                "purpose": (
                    "A modal or non-modal interaction surface that overlays the page with a "
                    "title, content, and actions."
                ),
                "scopeDocument": "Widgets/dialog.scope.md",
                "status": "draft",
            },
        )

        self.assertEqual(len(node["children"]), 1)
        instance = node["children"][0]
        self.assertEqual(instance["id"], "dialogInstance")
        self.assertEqual(instance["type"], "dialog")
        self.assertEqual(
            instance["attrs"],
            {
                "[open]": None,
                "[modal]": None,
                "(close)": None,
                "(cancel)": None,
            },
        )
        self.assertEqual(
            instance["children"],
            [
                {"id": "dialogTitle", "type": "header"},
                {"id": "dialogContent", "type": "section"},
                {"id": "dialogActions", "type": "footer"},
            ],
        )

    def test_build_scope_tree_walks_parent_scopes_and_leaf_scopes(self) -> None:
        tree = build_scope_tree(SCOPES_DIR)

        self.assertEqual(tree["id"], "scopes")
        self.assertEqual(tree["type"], "Scopes")
        self.assertEqual(tree["attrs"]["scopeDocument"], "scope.md")

        dialog = self._find_by_id(tree, "dialog")
        self.assertIsNotNone(dialog)
        self.assertEqual(dialog["attrs"]["scopeDocument"], "Widgets/dialog.scope.md")
        self.assertEqual(dialog["children"][0]["id"], "dialogInstance")

        table_scope = self._find_by_id(tree, "tableScope")
        self.assertIsNotNone(table_scope)
        self.assertEqual(table_scope["attrs"]["scopeDocument"], "Controls/Table/scope.md")

    def test_build_openui_document_uses_schema_version_and_scopes_tree(self) -> None:
        document = build_openui_document(spec_dir=SPEC_DIR)

        self.assertEqual(document["id"], "root")
        self.assertEqual(document["type"], "html")
        self.assertEqual(
            document["version"],
            (REPO_ROOT / "SCHEMA_VERSION").read_text(encoding="utf-8").strip(),
        )
        self.assertEqual(document["children"][0]["id"], "scopes")

    def test_main_writes_generated_json_to_requested_path(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            output_path = Path(temporary_directory) / "generated" / "openui.json"

            exit_code = main(
                [
                    "--spec-dir",
                    str(SPEC_DIR),
                    "--output",
                    str(output_path),
                    "--version",
                    "9.8.7",
                ]
            )

            self.assertEqual(exit_code, 0)
            document = json.loads(output_path.read_text(encoding="utf-8"))
            self.assertEqual(document["version"], "9.8.7")
            self.assertEqual(document["children"][0]["id"], "scopes")

    def test_every_leaf_scope_parses(self) -> None:
        for path in sorted(SCOPES_DIR.rglob("*.scope.md")):
            if path.name == "template.scope.md":
                continue
            with self.subTest(path=path.relative_to(SCOPES_DIR).as_posix()):
                node = parse_leaf_scope(path, scopes_dir=SCOPES_DIR)
                self.assertEqual(
                    node["attrs"]["scopeDocument"],
                    path.relative_to(SCOPES_DIR).as_posix(),
                )
                self.assertEqual(node["children"][0]["id"], f"{node['id']}Instance")

    def _find_by_id(self, node: dict[str, object], node_id: str) -> dict[str, object] | None:
        if node.get("id") == node_id:
            return node
        for child in node.get("children", []):
            found = self._find_by_id(child, node_id)
            if found is not None:
                return found
        return None


if __name__ == "__main__":
    unittest.main()
