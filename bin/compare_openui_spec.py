#!/usr/bin/env python3
"""Compare two OpenUI JSON specifications and emit a deterministic changelog."""

from __future__ import annotations

import argparse
import json
from collections.abc import Mapping, Sequence
from pathlib import Path
from typing import Any


def compare(reference: Any, new: Any) -> dict[str, list[dict[str, Any]]]:
    """Return additions, removals, and changes from reference to new."""
    changelog: dict[str, list[dict[str, Any]]] = {
        "remove": [],
        "add": [],
        "change": [],
    }
    _compare(reference, new, "", changelog)
    return changelog


def _compare(
    reference: Any, new: Any, path: str, changelog: dict[str, list[dict[str, Any]]]
) -> None:
    if isinstance(reference, Mapping) and isinstance(new, Mapping):
        for key in sorted(reference.keys() - new.keys()):
            changelog["remove"].append({"path": _path(path, str(key)), "reference": reference[key]})
        for key in sorted(new.keys() - reference.keys()):
            changelog["add"].append({"path": _path(path, str(key)), "new": new[key]})
        for key in sorted(reference.keys() & new.keys()):
            _compare(reference[key], new[key], _path(path, str(key)), changelog)
        return

    if _is_identified_list(reference) and _is_identified_list(new):
        reference_by_id = {item["id"]: item for item in reference}
        new_by_id = {item["id"]: item for item in new}
        for identifier in sorted(reference_by_id.keys() - new_by_id.keys()):
            changelog["remove"].append(
                {"path": _path(path, str(identifier)), "reference": reference_by_id[identifier]}
            )
        for identifier in sorted(new_by_id.keys() - reference_by_id.keys()):
            changelog["add"].append(
                {"path": _path(path, str(identifier)), "new": new_by_id[identifier]}
            )
        for identifier in sorted(reference_by_id.keys() & new_by_id.keys()):
            _compare(
                reference_by_id[identifier],
                new_by_id[identifier],
                _path(path, str(identifier)),
                changelog,
            )
        return

    if _canonicalize(reference) != _canonicalize(new):
        changelog["change"].append({"path": path or "/", "reference": reference, "new": new})


def _is_identified_list(value: Any) -> bool:
    if not isinstance(value, Sequence) or isinstance(value, (str, bytes, bytearray)):
        return False
    identifiers = [item.get("id") for item in value if isinstance(item, Mapping)]
    return len(identifiers) == len(value) and len(set(identifiers)) == len(identifiers)


def _canonicalize(value: Any) -> Any:
    if isinstance(value, Mapping):
        return {key: _canonicalize(value[key]) for key in sorted(value)}
    if isinstance(value, list):
        return sorted(
            (_canonicalize(item) for item in value),
            key=lambda item: json.dumps(item, sort_keys=True, separators=(",", ":")),
        )
    return value


def _path(parent: str, child: str) -> str:
    escaped = child.replace("~", "~0").replace("/", "~1")
    return f"{parent}/{escaped}"


def main(argv: list[str] | None = None) -> int:
    """Run the OpenUI JSON comparison command."""
    parser = argparse.ArgumentParser(description="Compare two OpenUI JSON specifications.")
    parser.add_argument("reference", type=Path, help="Reference OpenUI JSON specification.")
    parser.add_argument("new", type=Path, help="New OpenUI JSON specification.")
    parser.add_argument("--output", "-o", type=Path, help="Write the changelog to this file.")
    args = parser.parse_args(argv)

    try:
        reference = json.loads(args.reference.read_text(encoding="utf-8"))
        new = json.loads(args.new.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        parser.error(str(error))

    output = (
        json.dumps(compare(reference, new), ensure_ascii=False, indent=2, sort_keys=True) + "\n"
    )
    if args.output is None:
        print(output, end="")
    else:
        args.output.write_text(output, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
