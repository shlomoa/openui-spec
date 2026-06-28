import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
SCOPES_DIR = SPEC_DIR / "scopes"
EVIDENCE_REGISTER = SCOPES_DIR / "evidence.md"

ROW_PATTERN = re.compile(r"^\|\s*`(scopes/[^`]+\.scope\.md)`\s*\|(.*)\|\s*$")


class ScopeEvidenceRegisterTest(unittest.TestCase):
    def setUp(self) -> None:
        self.rows = self._parse_rows()

    def _parse_rows(self) -> dict[str, list[str]]:
        rows: dict[str, list[str]] = {}
        for line in EVIDENCE_REGISTER.read_text(encoding="utf-8").splitlines():
            match = ROW_PATTERN.match(line)
            if match:
                rows[match.group(1)] = [cell.strip() for cell in match.group(2).split("|")]
        return rows

    def test_register_covers_every_leaf_one_to_one(self) -> None:
        actual_leaves = {
            path.relative_to(SPEC_DIR).as_posix() for path in SCOPES_DIR.rglob("*.scope.md")
        }

        self.assertEqual(set(self.rows), actual_leaves)

    def test_every_entry_cites_a_source_and_citation(self) -> None:
        for leaf, cells in self.rows.items():
            with self.subTest(leaf=leaf):
                self.assertGreaterEqual(len(cells), 3, f"{leaf}: expected Source/Citation/Authorizes")
                source, citation = cells[0], cells[1]
                self.assertTrue(source, f"{leaf}: empty Source")
                self.assertTrue(citation, f"{leaf}: empty Citation")


if __name__ == "__main__":
    unittest.main()
