"""Parse OpenUI documents into a typed object model and validate them.

The pipeline has four stages, in the order the conformance suite defines
(`spec/conformance/README.md`):

1. grammar: the document format of `spec/EBNF.txt` (parsed with TatSu) and its
   JSON Schema projection;
2. document: globally unique ids and the spec version;
3. catalog: every type is a known object type of `spec/openui.json`;
4. contract: every declared attribute fits its declared value type, and every
   literal element reference resolves to an element of an allowed type.

A grammar diagnostic stops the pipeline; the other stages all run.

Public API (the TypeScript package mirrors it): ``parse``, ``validate``,
``validate_text``, ``Catalog``, ``Document``, ``Element``, ``Attribute``,
``Declaration``, ``Diagnostic`` and ``OpenUiParseError``.
"""

from __future__ import annotations

import json
import re
from collections.abc import Iterator
from dataclasses import dataclass, field
from functools import cache
from pathlib import Path
from typing import Any

REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPOSITORY_ROOT / "spec"
EBNF_PATH = SPEC_DIR / "EBNF.txt"
CATALOG_PATH = SPEC_DIR / "openui.json"

ID_PATTERN = re.compile(r"^[a-z][A-Za-z0-9]*$")
TYPE_PATTERN = re.compile(
    r"^(?:[a-z][a-z0-9]*(?:-[a-z0-9]+)*|[A-Z][A-Za-z0-9]*(?:-[a-z][a-z0-9]*)?)$"
)
VERSION_PATTERN = re.compile(r"^[0-9]+\.[0-9]+\.[0-9]+$")
ATTR_KEY_PATTERN = re.compile(
    r"^(?:(?P<category>uses|produces|behaves)\.)?(?P<name>[a-z][A-Za-z0-9]*)$"
)
VALUE_TYPE_PATTERN = re.compile(r"^(?P<base>[a-z]+)(?:\((?P<argument>.*)\))?$")
ROOT_MEMBERS = ("id", "version", "type", "attrs", "children")
ELEMENT_MEMBERS = ("id", "type", "attrs", "children")


@dataclass(frozen=True)
class Diagnostic:
    """One broken rule: a stage-prefixed code, a JSON Pointer and a free-text message."""

    code: str
    path: str
    message: str

    def __str__(self) -> str:
        return f"{self.path or '/'}: {self.code}: {self.message}"


class OpenUiParseError(ValueError):
    """Raised by ``parse`` when the document breaks the grammar."""

    def __init__(self, diagnostics: list[Diagnostic]) -> None:
        super().__init__("\n".join(str(diagnostic) for diagnostic in diagnostics))
        self.diagnostics = diagnostics


@dataclass(frozen=True)
class Attribute:
    """One `attrs` member: its key, category, name, raw JSON value and JSON Pointer."""

    key: str
    category: str | None
    name: str
    value: Any
    path: str

    @property
    def is_expression(self) -> bool:
        """An unquoted string: a binding or target-language expression."""
        return isinstance(self.value, str) and _decode_literal(self.value) is None

    @property
    def literal(self) -> Any:
        """The literal value: a decoded quoted string, or the JSON value itself."""
        if isinstance(self.value, str):
            return _decode_literal(self.value)
        return self.value


@dataclass(frozen=True)
class Element:
    """One element of the tree."""

    id: str
    type: str
    path: str
    attributes: tuple[Attribute, ...] = ()
    children: tuple[Element, ...] = ()

    def attribute(self, key: str) -> Attribute | None:
        """Return the attribute with *key*, or None."""
        return next((attribute for attribute in self.attributes if attribute.key == key), None)

    def walk(self) -> Iterator[Element]:
        """Yield this element and every descendant, in document order."""
        yield self
        for child in self.children:
            yield from child.walk()


@dataclass(frozen=True)
class Document:
    """A grammar-valid OpenUI document: its spec version and its root element."""

    version: str
    root: Element

    def elements(self) -> Iterator[Element]:
        """Yield every element in document order, root first."""
        return self.root.walk()


@dataclass(frozen=True)
class Declaration:
    """One attribute a known type declares: its category and, for Uses, its value type."""

    category: str
    value_type: str | None


@dataclass(frozen=True)
class Catalog:
    """The spec version, the known object types and their declared attributes."""

    version: str
    known_types: frozenset[str]
    contracts: dict[str, dict[str, Declaration]] = field(default_factory=dict)

    @classmethod
    def from_value(cls, catalog: dict[str, Any]) -> Catalog:
        """Build a catalog from a decoded `spec/openui.json` document.

        A leaf's attributes sit on its instance node (id `<scopeId>Instance`); they
        also apply to the leaf's scope type, which names the same object.
        """
        known_types: set[str] = set()
        contracts: dict[str, dict[str, Declaration]] = {}

        def visit(node: dict[str, Any], parent: dict[str, Any] | None) -> None:
            known_types.add(node["type"])
            declared = {}
            for key, value in (node.get("attrs") or {}).items():
                match = ATTR_KEY_PATTERN.fullmatch(key)
                if match and match.group("category"):
                    declared[match.group("name")] = Declaration(match.group("category"), value)
            if declared:
                contracts.setdefault(node["type"], {}).update(declared)
                if parent is not None and node["id"] == f"{parent['id']}Instance":
                    contracts.setdefault(parent["type"], {}).update(declared)
            for child in node.get("children", []):
                visit(child, node)

        visit(catalog, None)
        return cls(catalog["version"], frozenset(known_types), contracts)

    @classmethod
    def load(cls, path: str | Path = CATALOG_PATH) -> Catalog:
        """Load a catalog from *path* (default: the bundled `spec/openui.json`)."""
        return cls.from_value(json.loads(Path(path).read_text(encoding="utf-8")))


@cache
def default_catalog() -> Catalog:
    """The catalog of the spec version this package implements."""
    return Catalog.load()


def parse(text: str) -> Document:
    """Parse *text* into a Document, or raise OpenUiParseError with grammar diagnostics."""
    value, diagnostics = decode(text)
    if not diagnostics:
        diagnostics = grammar_diagnostics(value)
    if not diagnostics and not _ebnf_accepts(text):
        diagnostics = [Diagnostic("grammar/json-syntax", "", "the EBNF grammar rejects the text")]
    if diagnostics:
        raise OpenUiParseError(diagnostics)
    return from_value(value)


def from_value(value: dict[str, Any]) -> Document:
    """Build a Document from a decoded, grammar-valid JSON value."""
    return Document(value["version"], _element(value, ""))


def validate(document: Document, catalog: Catalog | None = None) -> list[Diagnostic]:
    """Run the document, catalog and contract stages on a parsed document."""
    catalog = catalog or default_catalog()
    diagnostics: list[Diagnostic] = []
    if document.version != catalog.version:
        diagnostics.append(
            Diagnostic(
                "document/unsupported-version",
                "/version",
                f"spec version {document.version} is not {catalog.version}, "
                "the version this tool implements",
            )
        )
    elements = list(document.elements())
    by_id: dict[str, Element] = {}
    for element in elements:
        if element.id in by_id:
            diagnostics.append(
                Diagnostic(
                    "document/duplicate-id",
                    f"{element.path}/id",
                    f"duplicate object id: {element.id}",
                )
            )
        else:
            by_id[element.id] = element
    for element in elements:
        if element.type not in catalog.known_types:
            diagnostics.append(
                Diagnostic(
                    "catalog/unknown-type",
                    f"{element.path}/type",
                    f"unknown OpenUI object type: {element.type}",
                )
            )
    for element in elements:
        declared = catalog.contracts.get(element.type, {})
        for attribute in element.attributes:
            declaration = declared.get(attribute.name)
            if declaration is not None and declaration.category == attribute.category:
                diagnostics.extend(_contract_diagnostics(attribute, declaration, by_id))
    return diagnostics


def validate_text(text: str, catalog: Catalog | None = None) -> list[Diagnostic]:
    """Run every stage on *text*; a grammar diagnostic stops the pipeline."""
    try:
        document = parse(text)
    except OpenUiParseError as error:
        return error.diagnostics
    return validate(document, catalog)


def validate_value(value: Any, catalog: Catalog | None = None) -> list[Diagnostic]:
    """Run every stage on an already decoded JSON value (duplicate members are not visible)."""
    diagnostics = grammar_diagnostics(value)
    return diagnostics or validate(from_value(value), catalog)


def grammar_diagnostics(value: Any) -> list[Diagnostic]:
    """Return the grammar diagnostics of a decoded JSON value."""
    diagnostics: list[Diagnostic] = []
    _check_element(value, "", True, diagnostics)
    return diagnostics


# --- grammar stage -------------------------------------------------------------------------


class _Object(dict):  # type: ignore[type-arg]
    """A decoded JSON object that remembers its duplicate member names."""

    duplicates: list[str]


def decode(text: str) -> tuple[Any, list[Diagnostic]]:
    """Decode JSON *text*; report invalid JSON and duplicate object members."""

    def object_from_pairs(pairs: list[tuple[str, Any]]) -> _Object:
        result = _Object()
        result.duplicates = []
        for key, item in pairs:
            if key in result:
                result.duplicates.append(key)
            result[key] = item
        return result

    def reject_constant(name: str) -> Any:
        raise ValueError(f"{name} is not JSON")

    try:
        value = json.loads(
            text, object_pairs_hook=object_from_pairs, parse_constant=reject_constant
        )
    except ValueError as error:
        return None, [Diagnostic("grammar/json-syntax", "", f"not JSON: {error}")]
    duplicates = [
        Diagnostic("grammar/duplicate-member", path, f"duplicate object member: {path}")
        for path in _duplicate_paths(value, "")
    ]
    return value, duplicates


def _duplicate_paths(value: Any, path: str) -> Iterator[str]:
    if isinstance(value, dict):
        for key in getattr(value, "duplicates", []):
            yield f"{path}/{_escape(key)}"
        for key, item in value.items():
            yield from _duplicate_paths(item, f"{path}/{_escape(key)}")
    elif isinstance(value, list):
        for index, item in enumerate(value):
            yield from _duplicate_paths(item, f"{path}/{index}")


def _check_element(value: Any, path: str, is_root: bool, out: list[Diagnostic]) -> None:
    if not isinstance(value, dict):
        out.append(Diagnostic("grammar/invalid-member-type", path, "an element must be an object"))
        return
    members = ROOT_MEMBERS if is_root else ELEMENT_MEMBERS
    for key in value:
        if key not in members:
            out.append(
                Diagnostic(
                    "grammar/unknown-property", f"{path}/{_escape(key)}", f"unknown member {key}"
                )
            )
    required = ("id", "version", "type") if is_root else ("id", "type")
    for key in required:
        if key not in value:
            out.append(
                Diagnostic(
                    "grammar/missing-property", f"{path}/{key}", f"missing required property {key}"
                )
            )
    if "id" in value:
        _check_id(value["id"], f"{path}/id", is_root, out)
    if "type" in value:
        _check_pattern(value["type"], f"{path}/type", TYPE_PATTERN, "grammar/invalid-type", out)
    if is_root and "version" in value:
        _check_pattern(
            value["version"], "/version", VERSION_PATTERN, "grammar/invalid-version", out
        )
    if "attrs" in value:
        _check_attrs(value["attrs"], f"{path}/attrs", out)
    if "children" in value:
        children = value["children"]
        if not isinstance(children, list):
            out.append(
                Diagnostic(
                    "grammar/invalid-member-type", f"{path}/children", "children must be a list"
                )
            )
        else:
            for index, child in enumerate(children):
                _check_element(child, f"{path}/children/{index}", False, out)


def _check_id(value: Any, path: str, is_root: bool, out: list[Diagnostic]) -> None:
    if is_root:
        if value != "root":
            out.append(Diagnostic("grammar/invalid-root-id", path, 'the root id must be "root"'))
        return
    _check_pattern(value, path, ID_PATTERN, "grammar/invalid-id", out)


def _check_pattern(
    value: Any, path: str, pattern: re.Pattern[str], code: str, out: list[Diagnostic]
) -> None:
    if not isinstance(value, str):
        out.append(Diagnostic("grammar/invalid-member-type", path, "the value must be a string"))
    elif not pattern.fullmatch(value):
        out.append(Diagnostic(code, path, f"{value!r} does not match {pattern.pattern}"))


def _check_attrs(value: Any, path: str, out: list[Diagnostic]) -> None:
    if not isinstance(value, dict):
        out.append(Diagnostic("grammar/invalid-member-type", path, "attrs must be an object"))
        return
    for key, item in value.items():
        item_path = f"{path}/{_escape(key)}"
        if not ATTR_KEY_PATTERN.fullmatch(key):
            out.append(Diagnostic("grammar/invalid-key", item_path, f"invalid attribute key {key}"))
        items = item if isinstance(item, list) else [item]
        if not all(_is_scalar(entry) for entry in items):
            out.append(
                Diagnostic(
                    "grammar/invalid-attribute-value",
                    item_path,
                    "a value must be a string, number, boolean, null, or a list of these",
                )
            )


@cache
def _compiled_grammar() -> Any:
    import tatsu

    return tatsu.compile(EBNF_PATH.read_text(encoding="utf-8"))


def _ebnf_accepts(text: str) -> bool:
    from tatsu.exceptions import FailedParse

    try:
        _compiled_grammar().parse(text)
    except FailedParse:
        return False
    return True


# --- model -----------------------------------------------------------------------------------


def _element(value: dict[str, Any], path: str) -> Element:
    attributes = []
    for key, item in (value.get("attrs") or {}).items():
        match = ATTR_KEY_PATTERN.fullmatch(key)
        assert match is not None  # the grammar stage guarantees it
        attributes.append(
            Attribute(
                key,
                match.group("category"),
                match.group("name"),
                item,
                f"{path}/attrs/{_escape(key)}",
            )
        )
    children = tuple(
        _element(child, f"{path}/children/{index}")
        for index, child in enumerate(value.get("children", []))
    )
    return Element(value["id"], value["type"], path, tuple(attributes), children)


# --- contract stage --------------------------------------------------------------------------


def _contract_diagnostics(
    attribute: Attribute, declaration: Declaration, by_id: dict[str, Element]
) -> list[Diagnostic]:
    if declaration.value_type is None:
        if attribute.value is None or isinstance(attribute.value, str):
            return []
        return [_wrong_type(attribute, "an expression or null")]
    return _fits(attribute, attribute.value, declaration.value_type, by_id)


def _fits(
    attribute: Attribute, value: Any, value_type: str, by_id: dict[str, Element]
) -> list[Diagnostic]:
    match = VALUE_TYPE_PATTERN.fullmatch(value_type)
    base, argument = (match.group("base"), match.group("argument")) if match else (value_type, None)
    if value is None:
        return []
    if base == "list":
        if isinstance(value, str) and _decode_literal(value) is None:
            return []
        if not isinstance(value, list):
            return [_wrong_type(attribute, value_type)]
        return [
            diagnostic
            for item in value
            for diagnostic in _fits(attribute, item, argument or "", by_id)
        ]
    if isinstance(value, str):
        literal = _decode_literal(value)
        if literal is None:
            return []  # a binding or target-language expression
        if base in {"string", "url"}:
            return []
        if base == "enum":
            return (
                []
                if literal in (argument or "").split("|")
                else [_wrong_type(attribute, value_type)]
            )
        if base == "reference":
            return _reference(attribute, literal, argument, by_id)
        return [_wrong_type(attribute, value_type)]
    if base == "boolean":
        return [] if isinstance(value, bool) else [_wrong_type(attribute, value_type)]
    is_number = isinstance(value, (int, float)) and not isinstance(value, bool)
    if base == "number" and is_number:
        return []
    if base == "integer" and is_number and float(value).is_integer():
        return []
    return [_wrong_type(attribute, value_type)]


def _reference(
    attribute: Attribute, target_id: str, argument: str | None, by_id: dict[str, Element]
) -> list[Diagnostic]:
    target = by_id.get(target_id)
    if target is None:
        return [
            Diagnostic(
                "contract/unresolved-reference",
                attribute.path,
                f"{attribute.key} names no element: {target_id}",
            )
        ]
    if argument and target.type not in argument.split("|"):
        return [
            Diagnostic(
                "contract/wrong-reference-type",
                attribute.path,
                f"{attribute.key} names a {target.type}, not a {argument.replace('|', ' or ')}",
            )
        ]
    return []


def _wrong_type(attribute: Attribute, expected: str) -> Diagnostic:
    return Diagnostic(
        "contract/wrong-value-type",
        attribute.path,
        f"{attribute.key} must be {expected}, not {json.dumps(attribute.value)}",
    )


# --- helpers ---------------------------------------------------------------------------------


def _decode_literal(value: str) -> str | None:
    """Return the decoded text of a quoted literal string, or None for an expression."""
    if len(value) < 2 or not (value.startswith('"') and value.endswith('"')):
        return None
    try:
        decoded = json.loads(value)
    except ValueError:
        return None
    return decoded if isinstance(decoded, str) else None


def _is_scalar(value: Any) -> bool:
    return value is None or isinstance(value, (str, bool, int, float))


def _escape(key: str) -> str:
    return key.replace("~", "~0").replace("/", "~1")
