"""Regression coverage for OpenUI format and catalog consistency checks."""

from __future__ import annotations

import unittest

from spec.tooling.check_grammar_consistency import check


class GrammarConsistencyTest(unittest.TestCase):
    def test_format_and_catalog_artifacts_remain_aligned(self) -> None:
        check()


if __name__ == "__main__":
    unittest.main()
