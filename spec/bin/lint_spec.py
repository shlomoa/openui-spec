"""Lint OpenUI specification content (scope prose and registers).

Each rule checks one spec-content invariant and reports findings. A rule may be
registered with no check (disabled) while the work it depends on is unfinished.

Usage: ``python -m spec.bin.lint_spec [--spec-dir DIR] [--html REPORT.html]``
"""

from __future__ import annotations

import argparse
import html
import re
import sys
from collections import Counter
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path

DEFAULT_SPEC_DIR = Path(__file__).resolve().parents[1]
TEMPLATE_NAME = "template.scope.md"
EVIDENCE_ROW_RE = re.compile(r"^\|\s*`(?P<leaf>scopes/[^`]+\.scope\.md)`\s*\|")
GLOSSARY_DOC = "scopes/scope.md"
GLOSSARY_HEADING = "## Glossary"
ALIASES_PREFIX = "**Aliases:**"
OPTIONAL_SECTION_MARK = "Omit the whole section"
# Archived source evidence: surveys quote framework vocabulary and are not spec prose.
GLOSSARY_EXCLUDED_DIRS = ("survey",)


@dataclass(frozen=True)
class Finding:
    """One lint violation, reported against a spec-relative path."""

    rule: str
    path: str
    message: str

    def __str__(self) -> str:
        return f"{self.path}: [{self.rule}] {self.message}"


@dataclass(frozen=True)
class Rule:
    """A named spec-content check; ``check`` is ``None`` while the rule is pending."""

    id: str
    description: str
    check: Callable[[Path], list[Finding]] | None
    note: str = ""

    @property
    def enabled(self) -> bool:
        return self.check is not None


def leaf_scopes(spec_dir: Path) -> list[str]:
    """Return every leaf ``*.scope.md`` path, relative to ``spec_dir``, sorted."""
    return sorted(
        path.relative_to(spec_dir).as_posix()
        for path in (spec_dir / "scopes").rglob("*.scope.md")
        if path.name != TEMPLATE_NAME
    )


def check_evidence_rows(spec_dir: Path) -> list[Finding]:
    """Every leaf scope has exactly one row in ``scopes/evidence.md`` and no row is orphaned."""
    register = "scopes/evidence.md"
    register_path = spec_dir / register
    if not register_path.is_file():
        return [Finding("evidence-row", register, "evidence register is missing")]

    rows = Counter(
        match.group("leaf")
        for line in register_path.read_text(encoding="utf-8").splitlines()
        if (match := EVIDENCE_ROW_RE.match(line))
    )
    leaves = leaf_scopes(spec_dir)
    findings = [
        Finding("evidence-row", leaf, f"expected exactly one row in {register}, found {count}")
        for leaf in leaves
        if (count := rows[leaf]) != 1
    ]
    findings += [
        Finding("evidence-row", register, f"row for non-existent leaf scope {leaf}")
        for leaf in sorted(set(rows) - set(leaves))
    ]
    return findings


def markdown_lines(path: Path) -> list[str]:
    """Return the lines of a Markdown file with fenced code blocks blanked out."""
    lines = []
    in_fence = False
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.lstrip().startswith(("```", "~~~")):
            in_fence = not in_fence
            lines.append("")
        else:
            lines.append("" if in_fence else line)
    return lines


def h2_sections(lines: list[str]) -> list[str]:
    """Return the ``## `` headings of a Markdown document, in order."""
    return [line.rstrip() for line in lines if line.startswith("## ")]


def template_sections(spec_dir: Path) -> tuple[list[str], set[str]]:
    """Return the template's ``## `` sections and the ones it allows a leaf to omit."""
    bodies: dict[str, list[str]] = {}
    for line in markdown_lines(spec_dir / "scopes" / TEMPLATE_NAME):
        if line.startswith("## "):
            bodies[line.rstrip()] = []
        elif bodies:
            bodies[next(reversed(bodies))].append(line.strip())
    optional = {
        section for section, body in bodies.items() if OPTIONAL_SECTION_MARK in " ".join(body)
    }
    return list(bodies), optional


def check_template_sections(spec_dir: Path) -> list[Finding]:
    """Every leaf scope has the template's sections, in order; only optional ones may be omitted."""
    rule = "template-sections"
    template = f"scopes/{TEMPLATE_NAME}"
    if not (spec_dir / template).is_file():
        return [Finding(rule, template, "leaf scope template is missing")]

    expected, optional = template_sections(spec_dir)
    findings = []
    for leaf in leaf_scopes(spec_dir):
        actual = h2_sections(markdown_lines(spec_dir / leaf))
        counts = Counter(actual)
        findings += [
            Finding(rule, leaf, f"unexpected section '{section}' (not in {template})")
            for section in dict.fromkeys(actual)
            if section not in expected
        ]
        findings += [
            Finding(rule, leaf, f"section '{section}' appears {count} times")
            for section, count in counts.items()
            if count > 1 and section in expected
        ]
        findings += [
            Finding(rule, leaf, f"missing required section '{section}'")
            for section in expected
            if section not in counts and section not in optional
        ]
        known = [section for section in dict.fromkeys(actual) if section in expected]
        if known != [section for section in expected if section in counts]:
            order = ", ".join(section[3:] for section in expected)
            findings.append(Finding(rule, leaf, f"sections are out of order; expected {order}"))
    return findings


def glossary_definitions(lines: list[str]) -> list[tuple[int, str]]:
    """Return ``(line index, term)`` for each heading whose body opens with an Aliases line."""
    definitions = []
    for index, line in enumerate(lines):
        if not line.startswith("#"):
            continue
        body = next((text for text in lines[index + 1 :] if text.strip()), "")
        if body.startswith(ALIASES_PREFIX):
            definitions.append((index, line.lstrip("#").strip()))
    return definitions


def glossary_range(lines: list[str]) -> range:
    """Return the line indexes of the Glossary section (empty when there is none)."""
    start = next((i for i, line in enumerate(lines) if line.rstrip() == GLOSSARY_HEADING), None)
    if start is None:
        return range(0)
    end = next((i for i in range(start + 1, len(lines)) if lines[i].startswith("## ")), len(lines))
    return range(start, end)


def check_glossary_single_definition(spec_dir: Path) -> list[Finding]:
    """Glossary terms are defined once, and only in the glossary."""
    rule = "glossary-single-definition"
    glossary_path = spec_dir / GLOSSARY_DOC
    if not glossary_path.is_file():
        return [Finding(rule, GLOSSARY_DOC, "glossary document is missing")]

    glossary_lines = markdown_lines(glossary_path)
    section = glossary_range(glossary_lines)
    terms = [term for index, term in glossary_definitions(glossary_lines) if index in section]
    if not terms:
        return [Finding(rule, GLOSSARY_DOC, f"no '{GLOSSARY_HEADING}' section with terms")]

    counts = Counter(term.casefold() for term in terms)
    first: dict[str, str] = {}
    for term in terms:
        first.setdefault(term.casefold(), term)
    findings = [
        Finding(rule, GLOSSARY_DOC, f"glossary term '{term}' is defined {counts[key]} times")
        for key, term in first.items()
        if counts[key] > 1
    ]
    for path in sorted(spec_dir.rglob("*.md"), key=lambda p: p.relative_to(spec_dir).as_posix()):
        relative = path.relative_to(spec_dir)
        if relative.parts[0] in GLOSSARY_EXCLUDED_DIRS:
            continue
        is_glossary_doc = relative.as_posix() == GLOSSARY_DOC
        findings += [
            Finding(
                rule,
                relative.as_posix(),
                f"redefines glossary term '{term}'; link to {GLOSSARY_DOC}#glossary instead",
            )
            for index, term in glossary_definitions(markdown_lines(path))
            if term.casefold() in counts and not (is_glossary_doc and index in section)
        ]
    return findings


RULES: tuple[Rule, ...] = (
    Rule(
        "template-sections",
        "Every leaf *.scope.md has the template.scope.md sections, in order.",
        check_template_sections,
    ),
    Rule(
        "evidence-row",
        "Every leaf *.scope.md has exactly one row in scopes/evidence.md.",
        check_evidence_rows,
    ),
    Rule(
        "glossary-single-definition",
        "Glossary terms are defined once; other documents link instead of redefining.",
        check_glossary_single_definition,
    ),
)


def lint(spec_dir: Path, rules: tuple[Rule, ...] = RULES) -> list[Finding]:
    """Run every enabled rule against ``spec_dir`` and return all findings."""
    return [finding for rule in rules if rule.check for finding in rule.check(spec_dir)]


def render_html(findings: list[Finding], rules: tuple[Rule, ...] = RULES) -> str:
    """Render a small standalone HTML lint report."""
    counts = Counter(finding.rule for finding in findings)
    rule_rows = "\n".join(
        f"<tr><td><code>{html.escape(rule.id)}</code></td>"
        f"<td>{html.escape(rule.description)}</td>"
        f"<td>{'enabled' if rule.enabled else 'disabled: ' + html.escape(rule.note)}</td>"
        f"<td>{counts[rule.id] if rule.enabled else '-'}</td></tr>"
        for rule in rules
    )
    finding_rows = "\n".join(
        f"<tr><td><code>{html.escape(f.rule)}</code></td><td><code>{html.escape(f.path)}</code>"
        f"</td><td>{html.escape(f.message)}</td></tr>"
        for f in findings
    )
    summary = f"{len(findings)} finding(s)" if findings else "No findings"
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>OpenUI spec lint report</title>
<style>
body {{ font-family: system-ui, sans-serif; margin: 1rem; }}
table {{ border-collapse: collapse; margin-bottom: 1.5rem; }}
th, td {{ border: 1px solid #999; padding: 0.3rem 0.6rem; text-align: left; }}
</style>
</head>
<body>
<h1>OpenUI spec lint report</h1>
<p>{summary}</p>
<h2>Rules</h2>
<table>
<tr><th>Rule</th><th>Description</th><th>Status</th><th>Findings</th></tr>
{rule_rows}
</table>
<h2>Findings</h2>
<table>
<tr><th>Rule</th><th>Path</th><th>Message</th></tr>
{finding_rows}
</table>
</body>
</html>
"""


def main(argv: list[str] | None = None) -> int:
    """Run the spec-content linter from the command line."""
    parser = argparse.ArgumentParser(description="Lint OpenUI specification content.")
    parser.add_argument(
        "--spec-dir",
        type=Path,
        default=DEFAULT_SPEC_DIR,
        help="Path to the spec directory that contains scopes/.",
    )
    parser.add_argument("--html", type=Path, help="Also write an HTML lint report to this path.")
    args = parser.parse_args(argv)

    findings = lint(args.spec_dir.resolve())
    if args.html is not None:
        args.html.parent.mkdir(parents=True, exist_ok=True)
        args.html.write_text(render_html(findings), encoding="utf-8")
    for finding in findings:
        print(finding, file=sys.stderr)
    if findings:
        print(f"Spec lint failed: {len(findings)} finding(s).", file=sys.stderr)
        return 1
    print("Spec lint passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
