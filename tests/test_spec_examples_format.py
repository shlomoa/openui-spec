import json
import subprocess
import sys
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
EXAMPLES_DIR = SPEC_DIR / "examples"
EBNF_VALIDATOR = SPEC_DIR / "tests" / "test_example_json_ebnf.py"
SCHEMA_VERSION_FILE = REPO_ROOT / "SCHEMA_VERSION"


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


if __name__ == "__main__":
    unittest.main()
