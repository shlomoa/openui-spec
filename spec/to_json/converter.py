"""Convert OpenUI scope markdown files into OpenUI JSON."""

from __future__ import annotations

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

    leaf = LeafScope(
        id=identity["id"],
        type=identity["type"],
        status=identity["status"],
        title=title,
        purpose=_prose(sections.get("Purpose", [])),
        scope_document=scope_document,
        attrs=_attributes(sections.get("Attributes", []), source_path),
        children=_children(sections.get("Child model", []), source_path),
    )
    return leaf.to_node()


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


def _identity(sections: dict[str, list[str]], path: Path) -> dict[str, str]:
    for line in sections.get("Identity", []):
        match = IDENTITY_RE.fullmatch(line)
        if match:
            return match.groupdict()
    raise ValueError(f"{path}: missing or invalid Identity line")


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
            continue
        key = match.group("key")
        category = match.group("category")
        if key.startswith("[") and category != "Uses":
            raise ValueError(f"{path}: attribute {key} must use Uses")
        if key.startswith("(") and category == "Uses":
            raise ValueError(f"{path}: attribute {key} must use Produces or Behaves")
        attrs[key] = None
    return attrs


def _children(lines: list[str], path: Path) -> list[dict[str, str]]:
    children: list[dict[str, str]] = []
    for line in lines:
        match = CHILD_RE.fullmatch(line)
        if not match:
            continue
        children.append({"id": match.group("id"), "type": match.group("type")})
    return children


def _scope_document(path: Path, scopes_dir: Path | str | None) -> str:
    if scopes_dir is None:
        return path.as_posix()
    return path.relative_to(Path(scopes_dir)).as_posix()


def _pascal_case(value: str) -> str:
    return value[:1].upper() + value[1:]
