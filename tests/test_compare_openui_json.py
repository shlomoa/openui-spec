import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPT = REPO_ROOT / "bin" / "compare_openui_json.py"
MODULE_SPEC = importlib.util.spec_from_file_location("compare_openui_json", SCRIPT)
assert MODULE_SPEC and MODULE_SPEC.loader
compare_openui_json = importlib.util.module_from_spec(MODULE_SPEC)
MODULE_SPEC.loader.exec_module(compare_openui_json)


class CompareOpenUiJsonTest(unittest.TestCase):
    def test_compare_reports_hierarchical_additions_removals_and_changes(self) -> None:
        reference = {
            "id": "root",
            "attrs": {"title": "Reference", "obsolete": True},
            "children": [{"id": "page", "type": "Page", "attrs": {"title": "Old"}}],
        }
        new = {
            "id": "root",
            "attrs": {"title": "New", "introduced": True},
            "children": [
                {"id": "dialog", "type": "Dialog"},
                {"id": "page", "type": "Page", "attrs": {"title": "New"}},
            ],
        }

        self.assertEqual(
            compare_openui_json.compare(reference, new),
            {
                "remove": [{"path": "/attrs/obsolete", "reference": True}],
                "add": [
                    {"path": "/attrs/introduced", "new": True},
                    {"path": "/children/dialog", "new": {"id": "dialog", "type": "Dialog"}},
                ],
                "change": [
                    {"path": "/attrs/title", "reference": "Reference", "new": "New"},
                    {
                        "path": "/children/page/attrs/title",
                        "reference": "Old",
                        "new": "New",
                    },
                ],
            },
        )

    def test_compare_ignores_order_of_object_and_scalar_lists(self) -> None:
        reference = {
            "children": [{"id": "b", "type": "B"}, {"id": "a", "type": "A"}],
            "values": [2, 1],
        }
        new = {
            "children": [{"id": "a", "type": "A"}, {"id": "b", "type": "B"}],
            "values": [1, 2],
        }

        self.assertEqual(
            compare_openui_json.compare(reference, new),
            {"remove": [], "add": [], "change": []},
        )

    def test_command_writes_json_changelog(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            directory = Path(temporary_directory)
            reference_path = directory / "reference.json"
            new_path = directory / "new.json"
            reference_path.write_text('{"id": "root"}', encoding="utf-8")
            new_path.write_text('{"id": "root", "type": "html"}', encoding="utf-8")

            result = subprocess.run(
                [sys.executable, str(SCRIPT), str(reference_path), str(new_path)],
                check=True,
                capture_output=True,
                text=True,
            )

        self.assertEqual(
            json.loads(result.stdout),
            {
                "add": [{"new": "html", "path": "/type"}],
                "change": [],
                "remove": [],
            },
        )


if __name__ == "__main__":
    unittest.main()
