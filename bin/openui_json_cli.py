"""Command-line interface for editing OpenUI JSON documents."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

if __package__:
    from .openui_json import OpenUiJson, OpenUiJsonError
else:
    from openui_json import OpenUiJson, OpenUiJsonError


def _json_argument(value: str) -> dict[str, Any]:
    try:
        candidate = Path(value)
        content = candidate.read_text(encoding="utf-8") if candidate.is_file() else value
        parsed = json.loads(content)
    except (OSError, json.JSONDecodeError) as error:
        raise argparse.ArgumentTypeError(f"invalid JSON: {error}") from error
    if not isinstance(parsed, dict):
        raise argparse.ArgumentTypeError("JSON input must be an object")
    return parsed


def _output_path(arguments: argparse.Namespace) -> Path:
    return Path(arguments.output) if arguments.output else Path(arguments.input)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Validate and edit OpenUI JSON documents.")
    commands = parser.add_subparsers(dest="command", required=True)

    validate = commands.add_parser("validate", help="validate an OpenUI JSON document")
    validate.add_argument("--input", required=True)

    add = commands.add_parser("add", help="append an object to a parent")
    add.add_argument("--input", required=True)
    add.add_argument("--output")
    add.add_argument("--parent", required=True)
    add.add_argument("--object", required=True, type=_json_argument)

    remove = commands.add_parser("remove", help="remove an object")
    remove.add_argument("--input", required=True)
    remove.add_argument("--output")
    remove.add_argument("--id", required=True)
    remove.add_argument("--parent")

    modify = commands.add_parser("modify", help="modify an object")
    modify.add_argument("--input", required=True)
    modify.add_argument("--output")
    modify.add_argument("--id", required=True)
    modify.add_argument("--parent")
    changes = modify.add_mutually_exclusive_group(required=True)
    changes.add_argument("--attrs", type=_json_argument)
    changes.add_argument("--object", type=_json_argument)
    return parser


def main(argv: list[str] | None = None) -> int:
    arguments = build_parser().parse_args(argv)
    try:
        document = OpenUiJson.load(arguments.input)
        if arguments.command == "validate":
            document.validate()
            return 0
        if arguments.command == "add":
            document.add(arguments.parent, arguments.object)
        elif arguments.command == "remove":
            document.remove(arguments.id, parent_id=arguments.parent)
        elif arguments.attrs is not None:
            document.update_attributes(arguments.id, arguments.attrs)
        else:
            document.replace(arguments.id, arguments.object, parent_id=arguments.parent)
        document.validate()
        document.save(_output_path(arguments))
        return 0
    except OpenUiJsonError as error:
        print(f"error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
