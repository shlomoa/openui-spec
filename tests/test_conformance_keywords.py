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
    "1.1 Purpose and audience",
    "1.3 How to read this specification",
    "1.4 Packages and tooling",
    "Annex B. Survey mapping",
    "Annex C. Examples",
)
HEADING_RE = re.compile(r"^(#{1,6}) (.+)$", re.MULTILINE)


def _readme_section(text: str, title: str) -> str:
    """The body of the spec README section titled `title`, at any heading level.

    The body ends at the next heading of the same or a higher level.
    """
    for match in HEADING_RE.finditer(text):
        if match.group(2) == title:
            level = len(match.group(1))
            body = text[match.end() :]
            for following in HEADING_RE.finditer(body):
                if len(following.group(1)) <= level:
                    return body[: following.start()]
            return body
    raise AssertionError(f"spec README has no section {title!r}")


class ConformanceKeywordsTest(unittest.TestCase):
    """W4 17: requirement keywords follow BCP 14 and appear only in normative parts."""

    def setUp(self) -> None:
        self.readme = SPEC_README.read_text(encoding="utf-8")

    def test_readme_defines_the_keywords_by_bcp_14(self) -> None:
        conformance = _readme_section(self.readme, "2. Conformance")
        self.assertIn("https://www.rfc-editor.org/rfc/rfc2119", conformance)
        self.assertIn("https://www.rfc-editor.org/rfc/rfc8174", conformance)
        self.assertIn("### 2.3 Normative and informative parts", conformance)

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
