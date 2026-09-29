import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
SPEC_README = SPEC_DIR / "README.md"

KEYWORD_RE = re.compile(
    r"\b(MUST NOT|MUST|REQUIRED|SHALL NOT|SHALL|SHOULD NOT|SHOULD|NOT RECOMMENDED|"
    r"RECOMMENDED|MAY|OPTIONAL)\b"
)
INFORMATIVE_DOCUMENTS = (
    SPEC_DIR / "scopes" / "evidence.md",
    SPEC_DIR / "scopes" / "terminology.md",
    SPEC_DIR / "examples" / "README.md",
    SPEC_DIR / "tooling" / "editing.md",
    SPEC_DIR / "tooling" / "comparison.md",
)
INFORMATIVE_README_SECTIONS = (
    "Outline",
    "Packages and Tooling",
    "app.json examples",
    "How to read this spec",
)


def _readme_section(text: str, title: str) -> str:
    """The body of a `## title` section of the spec README."""
    body = text.split(f"\n## {title}\n", 1)[1]
    return body.split("\n## ", 1)[0]


class ConformanceKeywordsTest(unittest.TestCase):
    """W4 17: requirement keywords follow BCP 14 and appear only in normative parts."""

    def setUp(self) -> None:
        self.readme = SPEC_README.read_text(encoding="utf-8")

    def test_readme_defines_the_keywords_by_bcp_14(self) -> None:
        conformance = _readme_section(self.readme, "Conformance")
        self.assertIn("https://www.rfc-editor.org/rfc/rfc2119", conformance)
        self.assertIn("https://www.rfc-editor.org/rfc/rfc8174", conformance)
        self.assertIn("### Normative and informative parts", conformance)

    def test_informative_documents_use_no_keyword(self) -> None:
        for path in INFORMATIVE_DOCUMENTS:
            with self.subTest(document=path.relative_to(SPEC_DIR).as_posix()):
                self.assertEqual(KEYWORD_RE.findall(path.read_text(encoding="utf-8")), [])

    def test_informative_readme_sections_use_no_keyword(self) -> None:
        for title in INFORMATIVE_README_SECTIONS:
            with self.subTest(section=title):
                self.assertEqual(KEYWORD_RE.findall(_readme_section(self.readme, title)), [])


if __name__ == "__main__":
    unittest.main()
