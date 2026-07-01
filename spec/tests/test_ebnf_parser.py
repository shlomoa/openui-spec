"""Compile the OpenUI EBNF grammar with TatSu."""

from __future__ import annotations

import unittest
from pathlib import Path

import tatsu

SPEC_DIR = Path(__file__).resolve().parents[1]
OPENUI_EBNF = SPEC_DIR / "EBNF.txt"


def compile_openui_grammar():
    """Compile and return the OpenUI TatSu grammar model."""
    return tatsu.compile(OPENUI_EBNF.read_text(encoding="utf-8"))


class OpenUiEbnfParserTest(unittest.TestCase):
    def test_openui_ebnf_compiles_with_tatsu(self) -> None:
        compile_openui_grammar()


if __name__ == "__main__":
    unittest.main()
