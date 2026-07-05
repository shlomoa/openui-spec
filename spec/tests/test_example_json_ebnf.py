"""Validate OpenUI example JSON documents against the EBNF grammar."""

from __future__ import annotations

import argparse
import re
import sys
import unittest
from collections.abc import Callable
from pathlib import Path
from typing import ClassVar

from tatsu import parse

SPEC_DIR = Path(__file__).resolve().parents[1]
EXAMPLES_DIR = SPEC_DIR / "examples"
OPENUI_EBNF = SPEC_DIR / "EBNF.txt"


def example_paths() -> list[Path]:
    """Return every committed OpenUI example JSON document."""
    return sorted(EXAMPLES_DIR.rglob("*.example.json"))


def validate_example_json(path: Path, grammar: str | None = None) -> None:
    """Parse one OpenUI JSON document with the EBNF grammar."""
    active_grammar = grammar or OPENUI_EBNF.read_text(encoding="utf-8")
    parse(active_grammar, path.read_text(encoding="utf-8"), parseinfo=True)


class OpenUiExampleJsonEbnfTest(unittest.TestCase):
    grammar: ClassVar[str]

    @classmethod
    def setUpClass(cls) -> None:
        cls.grammar = OPENUI_EBNF.read_text(encoding="utf-8")

    def test_examples_exist(self) -> None:
        self.assertGreater(len(example_paths()), 0)


def example_test_name(index: int, path: Path) -> str:
    """Build a stable unittest method name for an example JSON file."""
    relative_name = path.relative_to(EXAMPLES_DIR).as_posix().removesuffix(".example.json")
    safe_name = re.sub(r"[^0-9A-Za-z]+", "_", relative_name).strip("_").lower()
    return f"test_example_{index:03d}_{safe_name}"


def make_example_test(path: Path) -> Callable[[OpenUiExampleJsonEbnfTest], None]:
    """Create one unittest method for one example JSON file."""

    def test(self: OpenUiExampleJsonEbnfTest) -> None:
        validate_example_json(path, self.grammar)

    test.__doc__ = f"Parse {path.relative_to(EXAMPLES_DIR).as_posix()} with spec/EBNF.txt."
    return test


for test_index, example_path in enumerate(example_paths(), start=1):
    setattr(
        OpenUiExampleJsonEbnfTest,
        example_test_name(test_index, example_path),
        make_example_test(example_path),
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Validate OpenUI JSON files against spec/EBNF.txt."
    )
    parser.add_argument(
        "json_files",
        nargs="*",
        type=Path,
        help="JSON files to validate. If omitted, runs the unittest suite for all examples.",
    )
    args = parser.parse_args(argv)

    if not args.json_files:
        suite = unittest.defaultTestLoader.loadTestsFromTestCase(OpenUiExampleJsonEbnfTest)
        result = unittest.TextTestRunner().run(suite)
        return 0 if result.wasSuccessful() else 1

    for path in args.json_files:
        validate_example_json(path)
    return 0


if __name__ == "__main__":
    sys.exit(main())
