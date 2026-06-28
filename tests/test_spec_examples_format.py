import json
import unittest
from importlib import import_module
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
EXAMPLES_DIR = SPEC_DIR / "examples"
OPENUI_SCHEMA = SPEC_DIR / "openui.schema.json"
SCHEMA_VERSION_FILE = REPO_ROOT / "SCHEMA_VERSION"
JSON_SCHEMA_MODULE = "json" + "schema"
Draft202012Validator: Any = import_module(JSON_SCHEMA_MODULE).Draft202012Validator


class SpecExamplesFormatTest(unittest.TestCase):
    def setUp(self) -> None:
        self.schema = json.loads(OPENUI_SCHEMA.read_text(encoding="utf-8"))
        self.validator = Draft202012Validator(self.schema)
        self.expected_version = SCHEMA_VERSION_FILE.read_text(encoding="utf-8").strip()

    def test_every_spec_example_is_schema_valid_openui_json(self) -> None:
        example_paths = sorted(EXAMPLES_DIR.rglob("*.example.json"))
        self.assertGreater(len(example_paths), 0)

        for path in example_paths:
            with self.subTest(path=path.relative_to(EXAMPLES_DIR).as_posix()):
                document = json.loads(path.read_text(encoding="utf-8"))
                errors = sorted(
                    self.validator.iter_errors(document),
                    key=lambda error: error.json_path,
                )

                self.assertEqual(
                    [f"{error.json_path}: {error.message}" for error in errors],
                    [],
                )
                self.assertEqual(document["id"], "root")
                self.assertEqual(document["version"], self.expected_version)
                self.assertIsInstance(document.get("children"), list)
                self.assertGreater(len(document["children"]), 0)


if __name__ == "__main__":
    unittest.main()
