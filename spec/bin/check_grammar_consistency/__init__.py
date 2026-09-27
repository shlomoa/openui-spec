"""Check that the OpenUI schema, README, and catalog match the EBNF format SSOT."""

from .checker import check, main

__all__ = ["check", "main"]
