import json
import tempfile
import unittest
from pathlib import Path

from spec.bin.to_json.converter import (
    build_openui_document,
    build_scope_tree,
    main,
    parse_leaf_scope,
    reference_types,
)

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
SCOPES_DIR = SPEC_DIR / "scopes"
DIALOG_SCOPE = SCOPES_DIR / "Widgets" / "dialog.scope.md"


class ScopeToJsonConverterTest(unittest.TestCase):
    def test_reference_types_name_the_elements_a_value_type_references(self) -> None:
        self.assertEqual(reference_types("reference"), [])
        self.assertEqual(reference_types("reference(A|B)"), ["A", "B"])
        self.assertEqual(reference_types("list(reference(Route))"), ["Route"])
        self.assertEqual(reference_types("list(string)"), [])

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
                    "title, content and actions. Message, prompt, picker and progress dialogs "
                    "are compositions of these regions. Modal focus and dismissal follow the "
                    "Modal overlay behavior."
                ),
                "scopeDocument": "scopes/Widgets/dialog.scope.md",
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
                "uses.open": "boolean",
                "uses.modal": "boolean",
                "produces.close": None,
                "produces.cancel": None,
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
        self.assertEqual(tree["attrs"]["scopeDocument"], "scopes/scope.md")

        dialog = self._find_by_id(tree, "dialog")
        self.assertIsNotNone(dialog)
        self.assertEqual(dialog["attrs"]["scopeDocument"], "scopes/Widgets/dialog.scope.md")
        self.assertEqual(dialog["children"][0]["id"], "dialogInstance")

        table = self._find_by_id(tree, "table")
        self.assertIsNotNone(table)
        self.assertEqual(table["attrs"]["scopeDocument"], "scopes/Widgets/table.scope.md")
        self.assertEqual(table["children"][0]["id"], "tableInstance")

    def test_child_model_ids_are_scoped_when_needed(self) -> None:
        node = parse_leaf_scope(
            SCOPES_DIR / "Pages" / "shell_page.scope.md",
            scopes_dir=SCOPES_DIR,
        )

        instance = node["children"][0]
        self.assertEqual(
            [child["id"] for child in instance["children"]],
            ["shellPageRouting", "shellPageNavigation"],
        )

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

    def test_missing_object_link_raises_value_error(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            scopes_dir = Path(temporary_directory)
            (scopes_dir / "scope.md").write_text(
                "# Temporary scopes\n"
                "\n"
                "Temporary scopes.\n"
                "\n"
                "## Objects\n"
                "\n"
                "- [Missing](missing.scope.md): missing child.\n",
                encoding="utf-8",
            )

            with self.assertRaisesRegex(ValueError, "missing linked scope object"):
                build_scope_tree(scopes_dir)

    def test_malformed_object_link_raises_value_error(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            scopes_dir = Path(temporary_directory)
            (scopes_dir / "scope.md").write_text(
                "# Temporary scopes\n"
                "\n"
                "Temporary scopes.\n"
                "\n"
                "## Objects\n"
                "\n"
                "- [Missing](missing.scope.md) missing colon.\n",
                encoding="utf-8",
            )

            with self.assertRaisesRegex(ValueError, "malformed Objects line"):
                build_scope_tree(scopes_dir)

    def test_every_leaf_scope_parses(self) -> None:
        for path in sorted(SCOPES_DIR.rglob("*.scope.md")):
            if path.name == "template.scope.md":
                continue
            with self.subTest(path=path.relative_to(SCOPES_DIR).as_posix()):
                node = parse_leaf_scope(path, scopes_dir=SCOPES_DIR)
                self.assertEqual(
                    node["attrs"]["scopeDocument"],
                    f"scopes/{path.relative_to(SCOPES_DIR).as_posix()}",
                )
                self.assertEqual(node["children"][0]["id"], f"{node['id']}Instance")

    def test_legacy_leaf_without_identity_derives_identity_and_purpose(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            scopes_dir = Path(temporary_directory)
            legacy_scope = scopes_dir / "legacy_widget.scope.md"
            legacy_scope.write_text(
                "# Legacy widget\n"
                "\n"
                "Legacy prose purpose that predates the formal template.\n"
                "\n"
                "## Scope\n"
                "\n"
                "Additional non-machine prose.\n",
                encoding="utf-8",
            )

            node = parse_leaf_scope(legacy_scope, scopes_dir=scopes_dir)

            self.assertEqual(node["id"], "legacyWidget")
            self.assertEqual(node["type"], "LegacyWidget")
            self.assertEqual(
                node["attrs"]["purpose"],
                "Legacy prose purpose that predates the formal template.",
            )
            self.assertEqual(node["attrs"]["scopeDocument"], "scopes/legacy_widget.scope.md")
            self.assertEqual(node["children"][0]["id"], "legacyWidgetInstance")
            self.assertEqual(node["children"][0]["type"], "LegacyWidget")

    def test_invalid_attribute_category_raises_value_error(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            scopes_dir = Path(temporary_directory)
            invalid_scope = scopes_dir / "invalid.scope.md"
            invalid_scope.write_text(
                "# Invalid\n"
                "\n"
                "## Identity\n"
                "\n"
                "- id: invalid · type: Invalid · status: draft\n"
                "\n"
                "## Purpose\n"
                "\n"
                "Invalid test scope.\n"
                "\n"
                "## Attributes\n"
                "\n"
                "- `produces.close` — Uses — string — output attributes cannot use Uses.\n",
                encoding="utf-8",
            )

            with self.assertRaisesRegex(ValueError, "must use Produces"):
                parse_leaf_scope(invalid_scope, scopes_dir=scopes_dir)

    def test_attribute_value_types_are_checked(self) -> None:
        cases = {
            "- `uses.open` — Uses — whether the dialog is shown.\n": "needs a valid value type",
            "- `uses.open` — Uses — bool — whether the dialog is shown.\n": (
                "needs a valid value type"
            ),
            "- `produces.close` — Produces — string — emitted on close.\n": (
                "declares no value type"
            ),
            "- `uses.x` — Uses — string — one.\n- `uses.x` — Uses — string — two.\n": (
                "duplicate attribute"
            ),
        }
        for attributes, message in cases.items():
            with self.subTest(attributes=attributes), tempfile.TemporaryDirectory() as directory:
                scope = Path(directory) / "typed.scope.md"
                scope.write_text(
                    "# Typed\n\n## Identity\n\n- id: typed · type: Typed · status: draft\n\n"
                    f"## Attributes\n\n{attributes}",
                    encoding="utf-8",
                )
                with self.assertRaisesRegex(ValueError, message):
                    parse_leaf_scope(scope, scopes_dir=Path(directory))

    def test_accepted_value_types_reach_the_instance(self) -> None:
        value_types = [
            "string",
            "boolean",
            "integer",
            "number",
            "url",
            "enum(ltr|rtl|auto)",
            "reference",
            "reference(Route|Page)",
            "list(integer)",
        ]
        lines = "".join(
            f"- `uses.value{index}` — Uses — {value_type} — a value.\n"
            for index, value_type in enumerate(value_types)
        )
        with tempfile.TemporaryDirectory() as directory:
            scope = Path(directory) / "typed.scope.md"
            scope.write_text(
                "# Typed\n\n## Identity\n\n- id: typed · type: Typed · status: draft\n\n"
                f"## Attributes\n\n{lines}- `behaves.sort` — Behaves — sorts.\n",
                encoding="utf-8",
            )
            instance = parse_leaf_scope(scope, scopes_dir=Path(directory))["children"][0]

        expected = {f"uses.value{index}": value for index, value in enumerate(value_types)}
        expected["behaves.sort"] = None
        self.assertEqual(instance["attrs"], expected)

    def test_reference_to_unknown_type_fails_the_build(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            spec_dir = Path(directory)
            scopes_dir = spec_dir / "scopes"
            scopes_dir.mkdir()
            (scopes_dir / "scope.md").write_text("# Scopes\n\nRoot.\n", encoding="utf-8")
            (scopes_dir / "link.scope.md").write_text(
                "# Link\n\n## Identity\n\n- id: link · type: Link · status: draft\n\n"
                "## Attributes\n\n- `uses.to` — Uses — reference(NoSuchType) — target.\n",
                encoding="utf-8",
            )
            with self.assertRaisesRegex(ValueError, "unknown types"):
                build_openui_document(spec_dir=spec_dir, version="0.0.0")

    def test_malformed_identity_section_raises_value_error(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            scopes_dir = Path(temporary_directory)
            invalid_scope = scopes_dir / "invalid.scope.md"
            invalid_scope.write_text(
                "# Invalid\n"
                "\n"
                "## Identity\n"
                "\n"
                "- id: invalid · status: draft\n"
                "\n"
                "## Purpose\n"
                "\n"
                "Invalid test scope.\n",
                encoding="utf-8",
            )

            with self.assertRaisesRegex(ValueError, "malformed Identity line"):
                parse_leaf_scope(invalid_scope, scopes_dir=scopes_dir)

    def test_malformed_attribute_line_raises_value_error(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            scopes_dir = Path(temporary_directory)
            invalid_scope = scopes_dir / "invalid.scope.md"
            invalid_scope.write_text(
                "# Invalid\n"
                "\n"
                "## Identity\n"
                "\n"
                "- id: invalid · type: Invalid · status: draft\n"
                "\n"
                "## Purpose\n"
                "\n"
                "Invalid test scope.\n"
                "\n"
                "## Attributes\n"
                "\n"
                "- [open] — Uses — missing backticks must not be ignored.\n",
                encoding="utf-8",
            )

            with self.assertRaisesRegex(ValueError, "malformed Attributes line"):
                parse_leaf_scope(invalid_scope, scopes_dir=scopes_dir)

    def test_malformed_child_model_line_raises_value_error(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            scopes_dir = Path(temporary_directory)
            invalid_scope = scopes_dir / "invalid.scope.md"
            invalid_scope.write_text(
                "# Invalid\n"
                "\n"
                "## Identity\n"
                "\n"
                "- id: invalid · type: Invalid · status: draft\n"
                "\n"
                "## Purpose\n"
                "\n"
                "Invalid test scope.\n"
                "\n"
                "## Child model\n"
                "\n"
                "- child — section — many — invalid multiplicity must not be ignored.\n",
                encoding="utf-8",
            )

            with self.assertRaisesRegex(ValueError, "malformed Child model line"):
                parse_leaf_scope(invalid_scope, scopes_dir=scopes_dir)

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
