#!/usr/bin/env python3
"""Deprecated alias of `openui_spec.comparison`; import `openui_spec.compare` instead."""

from __future__ import annotations

import sys
from pathlib import Path

if __package__ is None or __package__ == "":
    # Run as a script: the repository root, not `bin/`, holds the `openui_spec` package.
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from openui_spec.comparison import compare, main

__all__ = ["compare", "main"]

if __name__ == "__main__":
    raise SystemExit(main())
