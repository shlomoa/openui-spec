import pathlib
import re
import unittest


REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
READTHEDOCS_CONFIG = REPO_ROOT / ".readthedocs.yaml"
MKDOCS_CONFIG = REPO_ROOT / "mkdocs.yml"
DOCS_ROOT = REPO_ROOT / "spec"
NAV_ENTRY_PATTERN = re.compile(r"^\s*-\s+.*?:\s+(.+\.md)$")


class ReadTheDocsConfigTest(unittest.TestCase):
    def test_readthedocs_uses_mkdocs_configuration(self) -> None:
        config = READTHEDOCS_CONFIG.read_text(encoding="utf-8")

        self.assertIn("version: 2", config)
        self.assertIn("mkdocs:\n  configuration: mkdocs.yml", config)
        self.assertIn("requirements: requirements-docs.txt", config)

    def test_mkdocs_navigation_points_to_existing_spec_docs(self) -> None:
        config = MKDOCS_CONFIG.read_text(encoding="utf-8")

        self.assertIn("docs_dir: spec", config)
        referenced_docs = [
            match.group(1)
            for line in config.splitlines()
            for match in [NAV_ENTRY_PATTERN.match(line)]
            if match is not None
        ]
        expected_docs = sorted(path.name for path in DOCS_ROOT.glob("*.md"))

        self.assertCountEqual(referenced_docs, expected_docs)
        for relative_path in referenced_docs:
            with self.subTest(relative_path=relative_path):
                self.assertTrue((DOCS_ROOT / relative_path).is_file())


if __name__ == "__main__":
    unittest.main()
