import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
SPEC_README = SPEC_DIR / "README.md"
OPENUI_JSON = REPO_ROOT / "openui.json"
MKDOCS_CONFIG = REPO_ROOT / "mkdocs.yml"
NAV_ENTRY_PATTERN = re.compile(r"^\s*-\s+.*?:\s+(.+\.md)$")


class SpecReadmeSpecTest(unittest.TestCase):
    def test_spec_folder_currently_has_single_markdown_entrypoint(self) -> None:
        markdown_files = sorted(path.relative_to(SPEC_DIR).as_posix() for path in SPEC_DIR.rglob("*.md"))

        self.assertEqual(markdown_files, ["README.md"])

    def test_spec_readme_documents_current_minimal_contract(self) -> None:
        content = SPEC_README.read_text(encoding="utf-8")

        self.assertIn("# OpenUI Specification", content)
        self.assertIn("## Spec folder structure", content)
        self.assertIn("## Spec format", content)
        self.assertIn("### EBNF notation", content)
        self.assertIn("### Syntax rules", content)
        self.assertIn("## How to read this spec", content)
        self.assertIn(
            "[Dashboard Schematic](https://material.angular.dev/guide/schematics#dashboard-schematic)",
            content,
        )
        self.assertNotIn("section documents listed below", content)

    def test_openui_json_exists_and_is_valid_when_populated(self) -> None:
        content = OPENUI_JSON.read_text(encoding="utf-8").strip()

        if content:
            json.loads(content)

    def test_mkdocs_nav_points_only_to_existing_spec_markdown(self) -> None:
        config = MKDOCS_CONFIG.read_text(encoding="utf-8")
        referenced_docs = [
            match.group(1)
            for line in config.splitlines()
            for match in [NAV_ENTRY_PATTERN.match(line)]
            if match is not None
        ]

        self.assertEqual(referenced_docs, ["README.md"])
        for relative_path in referenced_docs:
            with self.subTest(relative_path=relative_path):
                self.assertTrue((SPEC_DIR / relative_path).is_file())


if __name__ == "__main__":
    unittest.main()