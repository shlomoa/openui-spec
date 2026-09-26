"""Regression coverage for the EBNF-to-schema grammar consistency checker."""

from __future__ import annotations

import unittest

from spec.tooling.check_grammar_consistency import check


class GrammarConsistencyTest(unittest.TestCase):
    def test_ebnf_schema_and_readme_remain_aligned(self) -> None:
        check()


if __name__ == "__main__":
    unittest.main()
