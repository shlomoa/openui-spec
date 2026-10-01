"""Convert OpenUI scope markdown files into OpenUI JSON."""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from bin.openui_document import default_schema

from .section_grammar import README_PATH, USES_CATEGORY, SectionGrammar


def _token(pattern: str) -> str:
    """Return a schema pattern without its anchors, ready to embed in another pattern."""
    return f"(?:{pattern.removeprefix('^').removesuffix('$')})"


# The id, type-name and attribute-key tokens of a scope line are the ones of a document:
# the patterns of `openui.schema.json`, so a scope cannot declare what no document can use.
_DEFS = default_schema()["$defs"]
ID = _token(_DEFS["element"]["properties"]["id"]["pattern"])
TYPE_NAME = _token(_DEFS["typeName"]["pattern"])
ATTRIBUTE_KEY_RE = re.compile(_DEFS["attrs"]["propertyNames"]["pattern"])
# Part 6.4 defines type_name and camel_case (an id and an attribute name) by these patterns.
LEXICAL = {"type_name": TYPE_NAME, "camel_case": ID}

# The line shapes and the value types are not written here: README part 6.4 defines them, and
# the converter derives its patterns from the `ebnf` block of that part.
GRAMMAR = SectionGrammar.from_readme(README_PATH, lexical=LEXICAL)
IDENTITY_RE = GRAMMAR.identity_re
CHILD_RE = GRAMMAR.child_re
VALUE_TYPE_RE = GRAMMAR.value_type_re
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
    attrs: dict[str, str | None]
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


def parse_leaf_scope(
    path: Path | str,
    *,
    scopes_dir: Path | str | None = None,
    grammar: SectionGrammar = GRAMMAR,
) -> dict[str, Any]:
    """Parse a leaf `*.scope.md` file into its generated scope node.

    The machine-bearing sections are read with `grammar`, by default the section grammar of
    README part 6.4.
    """
    source_path = Path(path)
    text = source_path.read_text(encoding="utf-8")
    sections = _sections(text)
    title = _title(text, source_path)
    identity = _identity(sections, source_path, grammar)
    scope_document = _scope_document(source_path, scopes_dir)
    purpose = _prose(sections.get("Purpose", [])) or _leading_prose(text)

    leaf = LeafScope(
        id=identity["id"],
        type=identity["type"],
        status=identity["status"],
        title=title,
        purpose=purpose,
        scope_document=scope_document,
        attrs=_attributes(sections.get(grammar.attributes_section, []), source_path, grammar),
        children=_children(
            sections.get(grammar.child_model_section, []), source_path, identity["id"], grammar
        ),
    )
    return leaf.to_node()


def parse_child_model(
    path: Path | str, *, grammar: SectionGrammar = GRAMMAR
) -> list[tuple[str, str, str]]:
    """Return the Child model of a leaf as (child id, child type, multiplicity) triples.

    The catalog does not serialize multiplicity (part 6.3), so a validator reads it here.
    """
    source_path = Path(path)
    lines = _sections(source_path.read_text(encoding="utf-8")).get(grammar.child_model_section, [])
    _children(lines, source_path, "", grammar)  # rejects malformed lines
    return [
        (match.group("id"), match.group("type"), match.group("multiplicity"))
        for match in map(grammar.child_re.fullmatch, lines)
        if match
    ]


def build_openui_document(
    *,
    spec_dir: Path | str | None = None,
    version: str | None = None,
    grammar: SectionGrammar = GRAMMAR,
) -> dict[str, Any]:
    """Build the full OpenUI JSON document from the prose scope tree."""
    resolved_spec_dir = (
        Path(spec_dir) if spec_dir is not None else Path(__file__).resolve().parents[2]
    ).resolve()
    resolved_version = (
        version or (resolved_spec_dir.parent / "SCHEMA_VERSION").read_text(encoding="utf-8").strip()
    )

    document = {
        "id": "root",
        "type": "html",
        "version": resolved_version,
        "attrs": {
            "name": "OpenUI",
            "description": "Technology-independent Web UI framework specification",
            "scopeDocument": "README.md",
            "status": "draft",
        },
        "children": [build_scope_tree(resolved_spec_dir / "scopes", grammar=grammar)],
    }
    _check_reference_types(document, grammar)
    return document


def _walk(node: dict[str, Any]) -> list[dict[str, Any]]:
    nodes = [node]
    for child in node.get("children", []):
        nodes.extend(_walk(child))
    return nodes


def _check_reference_types(document: dict[str, Any], grammar: SectionGrammar) -> None:
    """Fail when a `reference(Type)` names a type that is not a known object type."""
    nodes = _walk(document)
    known_types = {node["type"] for node in nodes}
    for node in nodes:
        for key, value_type in (node.get("attrs") or {}).items():
            if not key.startswith("uses.") or not isinstance(value_type, str):
                continue
            unknown = [
                name for name in reference_types(value_type, grammar) if name not in known_types
            ]
            if unknown:
                raise ValueError(f"{node['id']}: {key} references unknown types {unknown}")


def build_scope_tree(
    scopes_dir: Path | str, *, grammar: SectionGrammar = GRAMMAR
) -> dict[str, Any]:
    """Build the generated JSON node for `spec/scopes` or any scope directory."""
    root = Path(scopes_dir).resolve()
    if not root.is_dir():
        raise ValueError(f"{root}: scope directory does not exist")
    return _build_scope_directory(root, root, grammar)


def main(argv: list[str] | None = None) -> int:
    """Run the converter from the command line."""
    parser = argparse.ArgumentParser(description="Convert OpenUI scope markdown to JSON.")
    parser.add_argument(
        "--spec-dir",
        type=Path,
        default=Path(__file__).resolve().parents[2],
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


def _build_scope_directory(path: Path, scopes_dir: Path, grammar: SectionGrammar) -> dict[str, Any]:
    scope_file = path / "scope.md"
    if not scope_file.is_file():
        raise ValueError(f"{path}: missing scope.md")

    text = scope_file.read_text(encoding="utf-8")
    title = _title(text, scope_file)
    children = [
        _build_child(child_path, scopes_dir, grammar)
        for child_path in _ordered_children(path, text)
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


def _build_child(path: Path, scopes_dir: Path, grammar: SectionGrammar) -> dict[str, Any]:
    if path.is_dir():
        return _build_scope_directory(path, scopes_dir, grammar)
    return parse_leaf_scope(path, scopes_dir=scopes_dir, grammar=grammar)


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


def _identity(
    sections: dict[str, list[str]], path: Path, grammar: SectionGrammar
) -> dict[str, str]:
    if grammar.identity_section not in sections:
        leaf_id = _leaf_id_from_path(path)
        return {"id": leaf_id, "type": _pascal_case(leaf_id), "status": "draft"}

    for line in sections[grammar.identity_section]:
        match = grammar.identity_re.fullmatch(line)
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


def _attributes(lines: list[str], path: Path, grammar: SectionGrammar) -> dict[str, str | None]:
    """Return each attribute key with its declared value type (Uses) or None."""
    attrs: dict[str, str | None] = {}
    for line in lines:
        attribute = _attribute_line(line, path, grammar)
        if attribute is None:
            continue
        key, value_type = attribute
        if key in attrs:
            raise ValueError(f"{path}: duplicate attribute {key}")
        attrs[key] = value_type
    return attrs


def _attribute_line(
    line: str, path: Path, grammar: SectionGrammar
) -> tuple[str, str | None] | None:
    """Return the key and the declared value type of an attribute line; None for prose.

    The line is a Uses line or an output line of part 6.4. A bullet that is neither is
    malformed, and the error says which rule it breaks when the head of the line shows it.
    """
    uses = grammar.uses_re.fullmatch(line)
    output = None if uses else grammar.output_re.fullmatch(line)
    if uses or output:
        match = uses or output
        key = match.group("prefix") + match.group("name")
        _check_key(key, match.group("category"), line, path)
        if output and grammar.declared_type_re.fullmatch(output.group("description")):
            raise ValueError(
                f"{path}: {output.group('category')} attribute {key} declares no value type"
            )
        return key, uses.group("type") if uses else None
    if not line.strip().startswith("-"):
        return None
    head = grammar.attribute_head_re.match(line)
    if head:
        key = head.group("prefix") + head.group("name")
        _check_key(key, head.group("category"), line, path)
        if head.group("category") == USES_CATEGORY:
            raise ValueError(f"{path}: attribute {key} needs a valid value type")
    raise ValueError(f"{path}: malformed Attributes line: {line}")


def _check_key(key: str, category: str, line: str, path: Path) -> None:
    """Check the key against the schema and its prefix against the category (part 6.4)."""
    if not ATTRIBUTE_KEY_RE.fullmatch(key):
        raise ValueError(f"{path}: malformed Attributes line: {line}")
    prefix = key.partition(".")[0]
    if prefix != category.lower():
        raise ValueError(f"{path}: attribute {key} must use {prefix.title()}")


def reference_types(value_type: str, grammar: SectionGrammar = GRAMMAR) -> list[str]:
    """Return the element types a `reference(...)` value type names, if any."""
    return grammar.reference_types(value_type)


def _children(
    lines: list[str], path: Path, scope_id: str, grammar: SectionGrammar
) -> list[dict[str, str]]:
    children: list[dict[str, str]] = []
    for line in lines:
        match = grammar.child_re.fullmatch(line)
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
