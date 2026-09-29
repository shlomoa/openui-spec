import pathlib
import re
import sys
import unittest
from types import SimpleNamespace

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
READTHEDOCS_CONFIG = REPO_ROOT / ".readthedocs.yaml"
MKDOCS_CONFIG = REPO_ROOT / "mkdocs.yml"
DOCS_ROOT = REPO_ROOT / "spec"
NAV_ENTRY_PATTERN = re.compile(r"^\s*-\s+.*?:\s+(.+\.(?:md|html))$")

sys.path.insert(0, str(REPO_ROOT))
import mkdocs_hooks  # noqa: E402


class ReadTheDocsConfigTest(unittest.TestCase):
    def test_readthedocs_uses_mkdocs_configuration(self) -> None:
        config = READTHEDOCS_CONFIG.read_text(encoding="utf-8")

        self.assertIn("version: 2", config)
        self.assertIn("mkdocs:\n  configuration: mkdocs.yml", config)
        self.assertIn("requirements: requirements-docs.txt", config)

    def test_mkdocs_navigation_points_to_existing_spec_docs(self) -> None:
        config = MKDOCS_CONFIG.read_text(encoding="utf-8")

        self.assertIn("site_url: https://openui-spec.readthedocs.io/en/latest/", config)
        self.assertIn("docs_dir: spec", config)
        self.assertIn("edit_uri: edit/main/spec/", config)
        referenced_docs = [
            match.group(1)
            for line in config.splitlines()
            for match in [NAV_ENTRY_PATTERN.match(line)]
            if match is not None
        ]
        expected_docs = sorted(
            path.relative_to(DOCS_ROOT).as_posix()
            for pattern in ("*.md", "*.html")
            for path in DOCS_ROOT.rglob(pattern)
            if path.relative_to(DOCS_ROOT).parts[0] != "survey"
        )

        self.assertCountEqual(referenced_docs, expected_docs)
        for relative_path in referenced_docs:
            with self.subTest(relative_path=relative_path):
                self.assertTrue((DOCS_ROOT / relative_path).is_file())

    def test_links_to_excluded_files_point_to_github(self) -> None:
        excluded = {"survey/a.md"}
        included = {"scopes/b.md"}

        def get_file_from_path(path: str):
            if path not in excluded | included:
                return None
            return SimpleNamespace(inclusion=SimpleNamespace(is_excluded=lambda: path in excluded))

        config = {
            "repo_url": "https://github.com/shlomoa/openui-spec",
            "edit_uri": "edit/main/spec/",
        }
        page = SimpleNamespace(file=SimpleNamespace(src_uri="scopes/c.md"))
        files = SimpleNamespace(get_file_from_path=get_file_from_path)
        markdown = "[a](../survey/a.md#x) [b](b.md#y) [c](https://example.com/survey/a.md)"

        self.assertEqual(
            mkdocs_hooks.on_page_markdown(markdown, page, config, files),
            "[a](https://github.com/shlomoa/openui-spec/blob/main/spec/survey/a.md#x) "
            "[b](b.md#y) [c](https://example.com/survey/a.md)",
        )


if __name__ == "__main__":
    unittest.main()
