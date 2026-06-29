"""Convert OpenUI scope markdown files into OpenUI JSON."""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

IDENTITY_RE = re.compile(
    r"^-\s+id:\s+(?P<id>[a-z][A-Za-z0-9]*)\s+·\s+"
    r"type:\s+(?P<type>[A-Za-z][A-Za-z0-9-]*)\s+·\s+"
    r"status:\s+(?P<status>draft|review|stable)\s*$"
)
ATTRIBUTE_RE = re.compile(
    r"^-\s+`(?P<key>(?:\[[A-Za-z][A-Za-z0-9]*\]|\([A-Za-z][A-Za-z0-9]*\)))`"
    r"\s+—\s+(?P<category>Uses|Produces|Behaves)\s+—\s+.+$"
)
CHILD_RE = re.compile(
    r"^-\s+(?P<id>[a-z][A-Za-z0-9]*)\s+—\s+"
    r"(?P<type>[A-Za-z][A-Za-z0-9-]*)\s+—\s+"
    r"(?P<multiplicity>1|0\.\.1|0\.\.n|1\.\.n)\s+—\s+.+$"
)
HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$")
OBJECT_LINK_RE = re.compile(r"^-\s+\[[^\]]+\]\((?P<link>[^)]+)\):.*$")


@dataclass(frozen=True)
class LeafScope:
    """Parsed source data for one leaf `*.scope.md` document."""

    id: str
    type: str
    status: str
    title: str
    purpose: str
    scope_document: str
    attrs: dict[str, None]
    children: list[dict[str, str]]

    def to_node(self) -> dict[str, Any]:
        """Return the OpenUI scope node for this leaf."""
        node: dict[str, Any] = {
            "id": self.id,
            "type": _pascal_case(self.id),
            "attrs": {
                "title": self.title,
                "purpose": self.purpose,
                "scopeDocument": self.scope_document,
                "status": self.status,
            },
            "children": [self._instance_node()],
        }
        return node

    def _instance_node(self) -> dict[str, Any]:
        instance: dict[str, Any] = {
            "id": f"{self.id}Instance",
            "type": self.type,
        }
        if self.attrs:
            instance["attrs"] = dict(self.attrs)
        if self.children:
            instance["children"] = list(self.children)
        return instance


def parse_leaf_scope(path: Path | str, *, scopes_dir: Path | str | None = None) -> dict[str, Any]:
    """Parse a leaf `*.scope.md` file into its generated scope node."""
    source_path = Path(path)
    text = source_path.read_text(encoding="utf-8")
    sections = _sections(text)
    title = _title(text, source_path)
    identity = _identity(sections, source_path)
    scope_document = _scope_document(source_path, scopes_dir)
    purpose = _prose(sections.get("Purpose", [])) or _leading_prose(text)

    leaf = LeafScope(
        id=identity["id"],
        type=identity["type"],
        status=identity["status"],
        title=title,
        purpose=purpose,
        scope_document=scope_document,
        attrs=_attributes(sections.get("Attributes", []), source_path),
        children=_children(sections.get("Child model", []), source_path, identity["id"]),
    )
    return leaf.to_node()


def build_openui_document(
    *,
    spec_dir: Path | str | None = None,
    version: str | None = None,
) -> dict[str, Any]:
    """Build the full OpenUI JSON document from the prose scope tree."""
    resolved_spec_dir = (
        Path(spec_dir) if spec_dir is not None else Path(__file__).resolve().parents[1]
    ).resolve()
    resolved_version = (
        version or (resolved_spec_dir.parent / "SCHEMA_VERSION").read_text(encoding="utf-8").strip()
    )

    return {
        "id": "root",
        "type": "html",
        "version": resolved_version,
        "attrs": {
            "name": "OpenUI",
            "description": "Technology-independent Web UI framework specification",
            "scopeDocument": "README.md",
            "status": "draft",
        },
        "children": [build_scope_tree(resolved_spec_dir / "scopes")],
    }


def build_scope_tree(scopes_dir: Path | str) -> dict[str, Any]:
    """Build the generated JSON node for `spec/scopes` or any scope directory."""
    root = Path(scopes_dir).resolve()
    if not root.is_dir():
        raise ValueError(f"{root}: scope directory does not exist")
    return _build_scope_directory(root, root)


def main(argv: list[str] | None = None) -> int:
    """Run the converter from the command line."""
    parser = argparse.ArgumentParser(description="Convert OpenUI scope markdown to JSON.")
    parser.add_argument(
        "--spec-dir",
        type=Path,
        default=Path(__file__).resolve().parents[1],
        help="Path to the spec directory that contains README.md and scopes/.",
    )
    parser.add_argument(
        "--output",
        "-o",
        type=Path,
        help="Output JSON file. Defaults to stdout when omitted.",
    )
    parser.add_argument(
        "--version",
        help="Override the generated top-level version.",
    )
    args = parser.parse_args(argv)

    document = build_openui_document(spec_dir=args.spec_dir, version=args.version)
    output = json.dumps(document, ensure_ascii=False, indent=2) + "\n"
    if args.output is None:
        print(output, end="")
    else:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(output, encoding="utf-8")
    return 0


def _title(text: str, path: Path) -> str:
    for line in text.splitlines():
        match = HEADING_RE.fullmatch(line)
        if match and match.group(1) == "#":
            return match.group(2)
    raise ValueError(f"{path}: missing H1 title")


def _sections(text: str) -> dict[str, list[str]]:
    sections: dict[str, list[str]] = {}
    current: str | None = None
    for line in text.splitlines():
        match = HEADING_RE.fullmatch(line)
        if match and match.group(1) == "##":
            current = match.group(2)
            sections[current] = []
            continue
        if current is not None:
            sections[current].append(line)
    return sections


def _build_scope_directory(path: Path, scopes_dir: Path) -> dict[str, Any]:
    scope_file = path / "scope.md"
    if not scope_file.is_file():
        raise ValueError(f"{path}: missing scope.md")

    text = scope_file.read_text(encoding="utf-8")
    title = _title(text, scope_file)
    children = [
        _build_child(child_path, scopes_dir) for child_path in _ordered_children(path, text)
    ]
    child_ids = {child["id"] for child in children}
    node_id = _scope_directory_id(path, scopes_dir, title, child_ids)
    node: dict[str, Any] = {
        "id": node_id,
        "type": _pascal_words(title),
        "attrs": {
            "title": title,
            "purpose": _leading_prose(text),
            "scopeDocument": _scope_document(scope_file, scopes_dir),
            "status": "draft",
        },
    }
    if children:
        node["children"] = children
    return node


def _build_child(path: Path, scopes_dir: Path) -> dict[str, Any]:
    if path.is_dir():
        return _build_scope_directory(path, scopes_dir)
    return parse_leaf_scope(path, scopes_dir=scopes_dir)


def _ordered_children(path: Path, text: str) -> list[Path]:
    children: list[Path] = []
    seen: set[Path] = set()
    for line in _sections(text).get("Objects", []):
        match = OBJECT_LINK_RE.fullmatch(line)
        if not match:
            if line.strip().startswith("-"):
                raise ValueError(f"{path}: malformed Objects line: {line}")
            continue
        target = (path / match.group("link")).resolve()
        if target.name == "scope.md":
            target = target.parent
        if not target.exists():
            raise ValueError(f"{path}: missing linked scope object: {match.group('link')}")
        if target not in seen:
            children.append(target)
            seen.add(target)

    discoverable = [
        child
        for child in [*path.glob("*.scope.md"), *[item for item in path.iterdir() if item.is_dir()]]
        if child.name != "template.scope.md"
    ]
    for child in sorted(discoverable, key=lambda item: (item.is_file(), item.name.lower())):
        resolved = child.resolve()
        if resolved not in seen:
            children.append(resolved)
            seen.add(resolved)
    return children


def _scope_directory_id(path: Path, scopes_dir: Path, title: str, child_ids: set[str]) -> str:
    if path == scopes_dir:
        return "scopes"
    node_id = _camel_words(title)
    if node_id in child_ids:
        return f"{node_id}Scope"
    return node_id


def _leading_prose(text: str) -> str:
    lines: list[str] = []
    for line in text.splitlines()[1:]:
        if line.startswith("## "):
            break
        lines.append(line)
    return _prose(lines)


def _identity(sections: dict[str, list[str]], path: Path) -> dict[str, str]:
    if "Identity" not in sections:
        leaf_id = _leaf_id_from_path(path)
        return {"id": leaf_id, "type": _pascal_case(leaf_id), "status": "draft"}

    for line in sections.get("Identity", []):
        match = IDENTITY_RE.fullmatch(line)
        if match:
            return match.groupdict()
        if line.strip().startswith("-"):
            raise ValueError(f"{path}: malformed Identity line: {line}")
    raise ValueError(f"{path}: missing valid Identity line")


def _prose(lines: list[str]) -> str:
    paragraphs: list[str] = []
    current: list[str] = []
    for line in lines:
        stripped = line.strip()
        if not stripped:
            if current:
                paragraphs.append(" ".join(current))
                current = []
            continue
        if stripped.startswith("-"):
            continue
        current.append(stripped)
    if current:
        paragraphs.append(" ".join(current))
    return "\n\n".join(paragraphs)


def _attributes(lines: list[str], path: Path) -> dict[str, None]:
    attrs: dict[str, None] = {}
    for line in lines:
        match = ATTRIBUTE_RE.fullmatch(line)
        if not match:
            if line.strip().startswith("-"):
                raise ValueError(f"{path}: malformed Attributes line: {line}")
            continue
        key = match.group("key")
        category = match.group("category")
        if key.startswith("[") and category != "Uses":
            raise ValueError(f"{path}: attribute {key} must use Uses")
        if key.startswith("(") and category == "Uses":
            raise ValueError(f"{path}: attribute {key} must use Produces or Behaves")
        attrs[key] = None
    return attrs


def _children(lines: list[str], path: Path, scope_id: str) -> list[dict[str, str]]:
    children: list[dict[str, str]] = []
    for line in lines:
        match = CHILD_RE.fullmatch(line)
        if not match:
            if line.strip().startswith("-"):
                raise ValueError(f"{path}: malformed Child model line: {line}")
            continue
        children.append(
            {
                "id": _scoped_child_id(scope_id, match.group("id")),
                "type": match.group("type"),
            }
        )
    return children


def _scope_document(path: Path, scopes_dir: Path | str | None) -> str:
    if scopes_dir is None:
        return path.as_posix()
    return f"scopes/{path.resolve().relative_to(Path(scopes_dir).resolve()).as_posix()}"


def _pascal_case(value: str) -> str:
    return value[:1].upper() + value[1:]


def _leaf_id_from_path(path: Path) -> str:
    name = path.name.removesuffix(".scope.md")
    parts = [part for part in re.split(r"[^A-Za-z0-9]+", name) if part]
    if not parts:
        raise ValueError(f"{path}: cannot derive id from file name")
    return parts[0].lower() + "".join(part[:1].upper() + part[1:] for part in parts[1:])


def _scoped_child_id(scope_id: str, child_id: str) -> str:
    if child_id.startswith(scope_id):
        return child_id
    return f"{scope_id}{_pascal_case(child_id)}"


def _pascal_words(value: str) -> str:
    words = re.findall(r"[A-Za-z0-9]+", value)
    return "".join(word[:1].upper() + word[1:] for word in words)


def _camel_words(value: str) -> str:
    pascal = _pascal_words(value)
    return pascal[:1].lower() + pascal[1:]
