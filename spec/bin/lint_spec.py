"""Lint OpenUI specification content (scope prose and registers).

Each rule checks one spec-content invariant and reports findings. Rules that
depend on unfinished work are registered but disabled until that work lands.

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


PENDING_W1 = "Disabled until W1 task 7 moves the glossary into spec/scopes/scope.md."

RULES: tuple[Rule, ...] = (
    Rule(
        "template-sections",
        "Every leaf *.scope.md matches the template.scope.md sections.",
        None,
        PENDING_W1,
    ),
    Rule(
        "evidence-row",
        "Every leaf *.scope.md has exactly one row in scopes/evidence.md.",
        check_evidence_rows,
    ),
    Rule(
        "glossary-single-definition",
        "Glossary terms are defined once; other documents link instead of redefining.",
        None,
        PENDING_W1,
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
