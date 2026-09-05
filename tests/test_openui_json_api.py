import json
import subprocess
import sys
import tempfile
import tomllib
import unittest
from pathlib import Path

from bin.openui_json import OpenUiJson, OpenUiJsonError, OpenUiValidationError

REPO_ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = REPO_ROOT / "spec" / "openui.json"
CLI_PATH = REPO_ROOT / "bin" / "openui_json_cli.py"


def document_with(child_type: str = "Table") -> dict[str, object]:
    return {
        "version": "0.0.1",
        "id": "root",
        "type": "html",
        "children": [{"id": "target", "type": child_type}],
    }


class OpenUiJsonTest(unittest.TestCase):
    def test_load_save_and_validate(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            path = Path(temporary_directory) / "input.json"
            output = Path(temporary_directory) / "nested" / "output.json"
            path.write_text(json.dumps(document_with()), encoding="utf-8")

            document = OpenUiJson.load(path)
            document.validate()
            document.save(output)

            self.assertEqual(json.loads(output.read_text(encoding="utf-8")), document_with())

    def test_rejects_invalid_schema_and_unsupported_content(self) -> None:
        with self.assertRaisesRegex(OpenUiValidationError, "required property"):
            OpenUiJson({"id": "root", "type": "html"}).validate()
        with self.assertRaisesRegex(OpenUiValidationError, "unsupported object type"):
            OpenUiJson(document_with("Unsupported")).validate()

    def test_add_requires_existing_parent_and_valid_child(self) -> None:
        document = OpenUiJson(document_with())

        with self.assertRaisesRegex(OpenUiJsonError, "parent object not found"):
            document.add("missing", {"id": "newChild", "type": "Table"})
        with self.assertRaisesRegex(OpenUiJsonError, "unsupported object type"):
            document.add("root", {"id": "newChild", "type": "Unsupported"})

        document.add("root", {"id": "newChild", "type": "Table"})
        self.assertEqual(document.document["children"][-1]["id"], "newChild")

    def test_remove_supports_children_and_root(self) -> None:
        document = OpenUiJson(document_with())
        document.remove("target", parent_id="root")
        self.assertEqual(document.document["children"], [])

        document.remove("root")
        self.assertIsNone(document.document)
        with self.assertRaisesRegex(OpenUiJsonError, "cannot save"):
            document.save(Path("unused.json"))

    def test_modify_supports_attribute_change_and_fundamental_replacement(self) -> None:
        document = OpenUiJson(document_with())

        document.update_attributes("target", {"title": "Updated", "optional": None})
        document.replace("target", {"id": "target", "type": "Grid"}, parent_id="root")

        self.assertEqual(
            document.document["children"],
            [{"id": "target", "type": "Grid"}],
        )
        document.validate()

    def test_every_supported_type_supports_add_remove_and_replacement(self) -> None:
        catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
        types = {node["type"] for node in OpenUiJson._walk(catalog)}
        for index, object_type in enumerate(types):
            with self.subTest(object_type=object_type):
                document = OpenUiJson(document_with())
                object_id = f"object{index}"
                document.add("root", {"id": object_id, "type": object_type})
                document.update_attributes(object_id, {"title": object_type})
                document.replace(
                    object_id, {"id": object_id, "type": object_type}, parent_id="root"
                )
                document.remove(object_id, parent_id="root")
                document.validate()


class OpenUiJsonCliTest(unittest.TestCase):
    def test_validate_and_single_change_commands(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            input_path = Path(temporary_directory) / "input.json"
            input_path.write_text(json.dumps(document_with()), encoding="utf-8")

            validate = self._run("validate", "--input", str(input_path))
            self.assertEqual(validate.returncode, 0, validate.stderr)

            add = self._run(
                "add",
                "--input",
                str(input_path),
                "--parent",
                "root",
                "--object",
                '{"id":"added","type":"Grid"}',
            )
            self.assertEqual(add.returncode, 0, add.stderr)

            modify = self._run(
                "modify",
                "--input",
                str(input_path),
                "--id",
                "added",
                "--attrs",
                '{"title":"Added"}',
            )
            self.assertEqual(modify.returncode, 0, modify.stderr)

            remove = self._run("remove", "--input", str(input_path), "--id", "added")
            self.assertEqual(remove.returncode, 0, remove.stderr)
            self.assertEqual(
                json.loads(input_path.read_text(encoding="utf-8"))["children"],
                [{"id": "target", "type": "Table"}],
            )

    def test_writes_result_to_separate_output_path(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            input_path = Path(temporary_directory) / "input.json"
            output_path = Path(temporary_directory) / "output.json"
            input_path.write_text(json.dumps(document_with()), encoding="utf-8")

            add = self._run(
                "add",
                "--input",
                str(input_path),
                "--output",
                str(output_path),
                "--parent",
                "root",
                "--object",
                '{"id":"added","type":"Grid"}',
            )

            self.assertEqual(add.returncode, 0, add.stderr)
            self.assertEqual(json.loads(input_path.read_text(encoding="utf-8")), document_with())
            self.assertEqual(
                json.loads(output_path.read_text(encoding="utf-8"))["children"][-1]["id"],
                "added",
            )

    def test_reports_domain_errors_without_traceback(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            input_path = Path(temporary_directory) / "input.json"
            input_path.write_text(json.dumps(document_with()), encoding="utf-8")

            result = self._run(
                "add",
                "--input",
                str(input_path),
                "--parent",
                "missing",
                "--object",
                '{"id":"added","type":"Grid"}',
            )

            self.assertEqual(result.returncode, 1)
            self.assertIn("error:", result.stderr)
            self.assertNotIn("Traceback", result.stderr)
            self.assertEqual(json.loads(input_path.read_text(encoding="utf-8")), document_with())

    def test_rejects_malformed_json_argument(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            input_path = Path(temporary_directory) / "input.json"
            input_path.write_text(json.dumps(document_with()), encoding="utf-8")

            result = self._run(
                "add",
                "--input",
                str(input_path),
                "--parent",
                "root",
                "--object",
                "{not json}",
            )

            self.assertEqual(result.returncode, 2)
            self.assertIn("invalid JSON", result.stderr)

    def test_requires_input_argument(self) -> None:
        result = self._run("validate")
        self.assertEqual(result.returncode, 2)
        self.assertIn("--input", result.stderr)

    def test_console_entry_point_is_registered(self) -> None:
        pyproject = tomllib.loads((REPO_ROOT / "pyproject.toml").read_text(encoding="utf-8"))
        self.assertEqual(
            pyproject["project"]["scripts"]["openui-json"], "bin.openui_json_cli:main"
        )

    @staticmethod
    def _run(*arguments: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(CLI_PATH), *arguments],
            check=False,
            capture_output=True,
            text=True,
            cwd=REPO_ROOT,
        )
