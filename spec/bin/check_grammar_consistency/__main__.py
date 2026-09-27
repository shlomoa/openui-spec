"""Command-line entry point for the OpenUI grammar consistency check."""

from .checker import main

if __name__ == "__main__":
    raise SystemExit(main())
