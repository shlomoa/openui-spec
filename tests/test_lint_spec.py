"""Regression coverage for the spec-content linter (spec/bin/lint_spec.py)."""

from __future__ import annotations

import contextlib
import io
import tempfile
import unittest
from pathlib import Path

from spec.bin.lint_spec import (
    RULES,
    Finding,
    check_evidence_rows,
    check_glossary_single_definition,
    check_template_sections,
    lint,
    main,
    render_html,
)

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"

REGISTER_HEADER = "| Leaf scope | Source | Citation | Authorizes |\n| --- | --- | --- | --- |\n"


TEMPLATE = """# <Object title>

## Identity

- id: `x` · type: `x` · status: `draft`

## Attributes

Omit the whole
section if the object has no attributes.

## Validation notes

Free prose.
"""

GLOSSARY = """# Scopes

## Glossary

### Terms

#### Widget

**Aliases:** component.

A widget.

#### Control

**Aliases:** input.

A control.

## Next section
"""


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
        (scopes / "scope.md").write_text(GLOSSARY, encoding="utf-8")

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

    def test_all_rules_are_enabled(self) -> None:
        self.assertEqual(
            {rule.id: rule.enabled for rule in RULES},
            {
                "template-sections": True,
                "evidence-row": True,
                "glossary-single-definition": True,
            },
        )

    def _write(self, name: str, text: str) -> None:
        (self.spec_dir / "scopes" / name).write_text(text, encoding="utf-8")

    def test_leaves_with_template_sections_pass(self) -> None:
        self._write("template.scope.md", TEMPLATE)
        self._write(
            "Widgets/a.scope.md", "# A\n\n## Identity\n\n## Attributes\n\n## Validation notes\n"
        )
        # Attributes is optional in the template, so a leaf may omit it.
        self._write("Widgets/b.scope.md", "# B\n\n## Identity\n\n## Validation notes\n")

        self.assertEqual(check_template_sections(self.spec_dir), [])

    def test_template_section_violations_are_reported(self) -> None:
        self._write("template.scope.md", TEMPLATE)
        self._write(
            "Widgets/a.scope.md",
            "# A\n\n## Attributes\n\n## Identity\n\n## Validation notes\n\n## Extra\n",
        )
        self._write(
            "Widgets/b.scope.md",
            "# B\n\n## Identity\n\n```md\n## Validation notes\n```\n\n## Identity\n",
        )

        messages = [str(finding) for finding in check_template_sections(self.spec_dir)]

        self.assertEqual(
            messages,
            [
                "scopes/Widgets/a.scope.md: [template-sections] unexpected section '## Extra' "
                "(not in scopes/template.scope.md)",
                "scopes/Widgets/a.scope.md: [template-sections] sections are out of order; "
                "expected Identity, Attributes, Validation notes",
                "scopes/Widgets/b.scope.md: [template-sections] section '## Identity' appears "
                "2 times",
                "scopes/Widgets/b.scope.md: [template-sections] missing required section "
                "'## Validation notes'",
            ],
        )

    def test_missing_template_is_reported(self) -> None:
        (self.spec_dir / "scopes" / "template.scope.md").unlink()

        findings = check_template_sections(self.spec_dir)

        self.assertEqual([finding.path for finding in findings], ["scopes/template.scope.md"])

    def test_glossary_defined_once_passes(self) -> None:
        # Linking to a term, or using it as a leaf title, is not a redefinition.
        self._write("Widgets/a.scope.md", "# Widget\n\nSee the [glossary](../scope.md#widget).\n")
        survey = self.spec_dir / "survey"
        survey.mkdir()
        (survey / "notes.md").write_text("#### Widget\n\n**Aliases:** gadget.\n", encoding="utf-8")

        self.assertEqual(check_glossary_single_definition(self.spec_dir), [])

    def test_duplicate_and_outside_definitions_are_reported(self) -> None:
        self._write(
            "scope.md",
            "## Intro\n\n#### Control\n\n**Aliases:** knob.\n\n"
            + GLOSSARY.replace("## Next section", "#### widget\n\n**Aliases:** part.\n"),
        )
        self._write("Widgets/scope.md", "# Widgets\n\n### Widget\n\n**Aliases:** gadget.\n")

        messages = [str(finding) for finding in check_glossary_single_definition(self.spec_dir)]

        self.assertEqual(
            messages,
            [
                "scopes/scope.md: [glossary-single-definition] glossary term 'Widget' is "
                "defined 2 times",
                "scopes/Widgets/scope.md: [glossary-single-definition] redefines glossary term "
                "'Widget'; link to scopes/scope.md#glossary instead",
                "scopes/scope.md: [glossary-single-definition] redefines glossary term "
                "'Control'; link to scopes/scope.md#glossary instead",
            ],
        )

    def test_missing_glossary_is_reported(self) -> None:
        self._write("scope.md", "# Scopes\n")
        self.assertEqual(
            [finding.message for finding in check_glossary_single_definition(self.spec_dir)],
            ["no '## Glossary' section with terms"],
        )

        (self.spec_dir / "scopes" / "scope.md").unlink()
        self.assertEqual(
            [finding.message for finding in check_glossary_single_definition(self.spec_dir)],
            ["glossary document is missing"],
        )

    def test_main_exit_code_and_html_report(self) -> None:
        self._write_register("scopes/Widgets/a.scope.md")
        report = self.spec_dir / "report" / "lint.html"

        self.assertEqual(_quiet(["--spec-dir", str(self.spec_dir), "--html", str(report)]), 1)
        content = report.read_text(encoding="utf-8")
        self.assertIn("1 finding(s)", content)
        self.assertIn("scopes/Widgets/b.scope.md", content)
        self.assertIn("<td>enabled</td>", content)

        self._write_register("scopes/Widgets/a.scope.md", "scopes/Widgets/b.scope.md")
        self.assertEqual(_quiet(["--spec-dir", str(self.spec_dir)]), 0)

    def test_html_report_escapes_content(self) -> None:
        content = render_html([Finding("evidence-row", "scopes/<x>.scope.md", "a & b")])

        self.assertIn("scopes/&lt;x&gt;.scope.md", content)
        self.assertIn("a &amp; b", content)


if __name__ == "__main__":
    unittest.main()
