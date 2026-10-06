"""Run the comparison cases of spec/conformance/comparison/ against `openui_spec.compare`."""

from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

import openui_spec

REPO_ROOT = Path(__file__).resolve().parents[1]
COMPARISON_DIR = REPO_ROOT / "spec" / "conformance" / "comparison"
CASE_NAME = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
CASE_MEMBERS = {"description", "reference", "new", "expected"}


def _cases() -> list[tuple[str, dict]]:
    return [
        (path.stem, json.loads(path.read_text(encoding="utf-8")))
        for path in sorted(COMPARISON_DIR.iterdir())
    ]


def _reversed(changelog: dict) -> dict:
    """The expected changelog of the opposite comparison: removals and additions swap."""
    return {
        "remove": [{"path": e["path"], "reference": e["new"]} for e in changelog["add"]],
        "add": [{"path": e["path"], "new": e["reference"]} for e in changelog["remove"]],
        "change": [
            {"path": e["path"], "reference": e["new"], "new": e["reference"]}
            for e in changelog["change"]
        ],
    }


class ComparisonConformanceLayoutTest(unittest.TestCase):
    def test_folder_holds_only_case_files(self) -> None:
        paths = sorted(COMPARISON_DIR.iterdir())
        self.assertTrue(paths, "the suite needs comparison cases")
        for path in paths:
            with self.subTest(path=path.name):
                self.assertTrue(path.is_file())
                self.assertEqual(path.suffix, ".json")
                self.assertRegex(path.stem, CASE_NAME)

    def test_cases_have_the_documented_members(self) -> None:
        for name, case in _cases():
            with self.subTest(case=name):
                self.assertEqual(set(case), CASE_MEMBERS)
                self.assertIsInstance(case["description"], str)
                self.assertEqual(set(case["expected"]), {"remove", "add", "change"})

    def test_cases_cover_the_documented_behavior(self) -> None:
        names = {name for name, _ in _cases()}
        for required in (
            "reordered-siblings",
            "moved-to-another-parent",
            "root-members-changed",
            "duplicate-ids-whole-list",
            "mixed-children-whole-list",
            "list-attribute-changed",
            "entry-order",
        ):
            self.assertIn(required, names)


class ComparisonConformanceTest(unittest.TestCase):
    def test_compare_reports_exactly_the_expected_changelog(self) -> None:
        for name, case in _cases():
            with self.subTest(case=name):
                self.assertEqual(
                    openui_spec.compare(case["reference"], case["new"]), case["expected"]
                )

    def test_comparing_the_other_way_swaps_the_entries(self) -> None:
        for name, case in _cases():
            with self.subTest(case=name):
                self.assertEqual(
                    openui_spec.compare(case["new"], case["reference"]), _reversed(case["expected"])
                )

    def test_a_document_equals_itself(self) -> None:
        for name, case in _cases():
            for member in ("reference", "new"):
                with self.subTest(case=name, document=member):
                    self.assertEqual(
                        openui_spec.compare(case[member], case[member]),
                        {"remove": [], "add": [], "change": []},
                    )


if __name__ == "__main__":
    unittest.main()
