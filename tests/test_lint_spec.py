"""Regression coverage for the spec-content linter (spec/bin/lint_spec.py)."""

from __future__ import annotations

import contextlib
import io
import tempfile
import unittest
from pathlib import Path

from spec.bin.lint_spec import RULES, Finding, check_evidence_rows, lint, main, render_html

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"

REGISTER_HEADER = "| Leaf scope | Source | Citation | Authorizes |\n| --- | --- | --- | --- |\n"


def _row(leaf: str) -> str:
    return f"| `{leaf}` | explicit decision | citation | Purpose. |\n"


def _quiet(argv: list[str]) -> int:
    """Run ``main`` without printing its console output."""
    with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
        return main(argv)


class LintSpecTest(unittest.TestCase):
    def setUp(self) -> None:
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.spec_dir = Path(temporary.name)
        scopes = self.spec_dir / "scopes"
        (scopes / "Widgets").mkdir(parents=True)
        for name in (
            "template.scope.md",
            "Widgets/scope.md",
            "Widgets/a.scope.md",
            "Widgets/b.scope.md",
        ):
            (scopes / name).write_text("# Fixture\n", encoding="utf-8")

    def _write_register(self, *leaves: str) -> None:
        rows = "".join(_row(leaf) for leaf in leaves)
        (self.spec_dir / "scopes" / "evidence.md").write_text(
            REGISTER_HEADER + rows, encoding="utf-8"
        )

    def test_repository_spec_passes_all_enabled_rules(self) -> None:
        self.assertEqual(lint(SPEC_DIR), [])

    def test_passing_fixture_has_one_row_per_leaf(self) -> None:
        self._write_register("scopes/Widgets/a.scope.md", "scopes/Widgets/b.scope.md")

        self.assertEqual(check_evidence_rows(self.spec_dir), [])

    def test_missing_duplicate_and_orphan_rows_are_reported(self) -> None:
        self._write_register(
            "scopes/Widgets/a.scope.md",
            "scopes/Widgets/a.scope.md",
            "scopes/Widgets/gone.scope.md",
        )

        messages = [str(finding) for finding in check_evidence_rows(self.spec_dir)]

        self.assertEqual(
            messages,
            [
                "scopes/Widgets/a.scope.md: [evidence-row] expected exactly one row in "
                "scopes/evidence.md, found 2",
                "scopes/Widgets/b.scope.md: [evidence-row] expected exactly one row in "
                "scopes/evidence.md, found 0",
                "scopes/evidence.md: [evidence-row] row for non-existent leaf scope "
                "scopes/Widgets/gone.scope.md",
            ],
        )

    def test_missing_register_is_reported(self) -> None:
        findings = check_evidence_rows(self.spec_dir)

        self.assertEqual([finding.path for finding in findings], ["scopes/evidence.md"])

    def test_terminology_dependent_rules_are_registered_but_disabled(self) -> None:
        states = {rule.id: rule.enabled for rule in RULES}

        self.assertEqual(
            states,
            {
                "template-sections": False,
                "evidence-row": True,
                "glossary-single-definition": False,
            },
        )

    def test_main_exit_code_and_html_report(self) -> None:
        self._write_register("scopes/Widgets/a.scope.md")
        report = self.spec_dir / "report" / "lint.html"

        self.assertEqual(_quiet(["--spec-dir", str(self.spec_dir), "--html", str(report)]), 1)
        content = report.read_text(encoding="utf-8")
        self.assertIn("1 finding(s)", content)
        self.assertIn("scopes/Widgets/b.scope.md", content)
        self.assertIn("disabled: Disabled until W1 task 7", content)

        self._write_register("scopes/Widgets/a.scope.md", "scopes/Widgets/b.scope.md")
        self.assertEqual(_quiet(["--spec-dir", str(self.spec_dir)]), 0)

    def test_html_report_escapes_content(self) -> None:
        content = render_html([Finding("evidence-row", "scopes/<x>.scope.md", "a & b")])

        self.assertIn("scopes/&lt;x&gt;.scope.md", content)
        self.assertIn("a &amp; b", content)


if __name__ == "__main__":
    unittest.main()
