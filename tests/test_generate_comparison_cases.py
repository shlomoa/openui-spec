"""Check the comparison case generator (spec/bin/generate_comparison_cases.py)."""

from __future__ import annotations

import json
import re
import tempfile
import unittest
from pathlib import Path

from spec.bin import generate_comparison_cases as generator

REPO_ROOT = Path(__file__).resolve().parents[1]
CASE_NAME = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def _version() -> str:
    return (REPO_ROOT / "SCHEMA_VERSION").read_text(encoding="utf-8").strip()


class GenerateComparisonCasesTest(unittest.TestCase):
    def test_committed_cases_are_the_generated_cases(self) -> None:
        files = generator.render(generator.build_cases(_version()))
        self.assertEqual(generator.stale(files), [])

    def test_case_names_are_kebab_case(self) -> None:
        for name in generator.build_cases(_version()):
            with self.subTest(case=name):
                self.assertRegex(name, CASE_NAME)

    def test_documents_declare_the_given_version(self) -> None:
        cases = generator.build_cases("9.8.7")
        for name, case in cases.items():
            for member in ("reference", "new"):
                with self.subTest(case=name, document=member):
                    self.assertIn(case[member].get("version", "9.8.7"), {"9.8.7", "0.1.0"})
        self.assertEqual(cases["root-members-changed"]["new"]["version"], "9.8.7")
        self.assertEqual(cases["root-members-changed"]["reference"]["version"], "0.1.0")

    def test_check_reports_stale_missing_and_unexpected_files(self) -> None:
        files = generator.render(generator.build_cases(_version()))
        with tempfile.TemporaryDirectory() as temporary_directory:
            target = Path(temporary_directory)
            for name, text in files.items():
                # Another indentation is only formatting: it is not stale.
                target.joinpath(name).write_text(
                    json.dumps(json.loads(text), indent=4) + "\n", encoding="utf-8"
                )
            self.assertEqual(generator.stale(files, target), [])

            names = sorted(files)
            target.joinpath(names[0]).write_text("{}\n", encoding="utf-8")
            target.joinpath(names[1]).unlink()
            target.joinpath("extra.json").write_text("{}\n", encoding="utf-8")
            self.assertEqual(
                generator.stale(files, target),
                [
                    "unexpected case file extra.json",
                    f"stale case file {names[0]}",
                    f"missing case file {names[1]}",
                ],
            )

    def test_check_command_succeeds_on_the_repository(self) -> None:
        self.assertEqual(generator.main(["--check"]), 0)


if __name__ == "__main__":
    unittest.main()
