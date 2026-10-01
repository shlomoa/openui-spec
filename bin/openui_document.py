"""Parse OpenUI documents into a typed object model and validate them.

The pipeline has four stages, in the order the conformance suite defines
(`spec/conformance/README.md`):

1. grammar: `spec/openui.schema.json`, the JSON Schema projection of the
   document format in `spec/EBNF.txt`;
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

from jsonschema import Draft202012Validator

REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPOSITORY_ROOT / "spec"
CATALOG_PATH = SPEC_DIR / "openui.json"
SCHEMA_PATH = SPEC_DIR / "openui.schema.json"

VALUE_TYPE_PATTERN = re.compile(r"^(?P<base>[a-z]+)(?:\((?P<argument>.*)\))?$")


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
                category, name = _attribute_parts(key)
                if category:
                    declared[name] = Declaration(category, value)
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


def validate_value(
    value: Any,
    catalog: Catalog | None = None,
    schema: dict[str, Any] | None = None,
) -> list[Diagnostic]:
    """Run every stage on an already decoded JSON value (duplicate members are not visible)."""
    diagnostics = grammar_diagnostics(value, schema)
    return diagnostics or validate(from_value(value), catalog)


@cache
def default_schema() -> dict[str, Any]:
    """Load the bundled JSON Schema that owns the document format."""
    return json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))


@cache
def _default_schema_validator() -> Draft202012Validator:
    return Draft202012Validator(default_schema())


def grammar_diagnostics(value: Any, schema: dict[str, Any] | None = None) -> list[Diagnostic]:
    """Return schema-derived grammar diagnostics for a decoded JSON value."""
    validator = _default_schema_validator() if schema is None else Draft202012Validator(schema)
    return [
        diagnostic
        for error in validator.iter_errors(value)
        for diagnostic in _schema_diagnostics(error)
    ]


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


def _schema_diagnostics(error: Any) -> list[Diagnostic]:
    """Translate one JSON Schema error into the conformance diagnostic vocabulary."""
    path = _json_pointer(error.absolute_path)
    if error.validator == "additionalProperties":
        properties = error.schema.get("properties", {})
        return [
            Diagnostic(
                "grammar/unknown-property",
                f"{path}/{_escape(key)}",
                f"unknown member {key}",
            )
            for key in sorted(set(error.instance) - set(properties))
        ]
    if error.validator == "required":
        return [
            Diagnostic(
                "grammar/missing-property",
                f"{path}/{_escape(key)}",
                f"missing required property {key}",
            )
            for key in error.validator_value
            if key not in error.instance
        ]
    if error.validator == "type":
        return [Diagnostic("grammar/invalid-member-type", path, error.message)]
    if error.validator == "const":
        return [Diagnostic("grammar/invalid-root-id", path, error.message)]
    if error.validator == "pattern":
        if list(error.absolute_schema_path)[-2:] == ["propertyNames", "pattern"]:
            key = error.instance
            return [
                Diagnostic(
                    "grammar/invalid-key",
                    f"{path}/{_escape(key)}",
                    f"invalid attribute key {key}",
                )
            ]
        name = list(error.absolute_path)[-1]
        code = {
            "id": "grammar/invalid-id",
            "type": "grammar/invalid-type",
            "version": "grammar/invalid-version",
        }[name]
        return [Diagnostic(code, path, error.message)]
    if error.validator == "anyOf":
        return [Diagnostic("grammar/invalid-attribute-value", path, error.message)]
    return []


# --- model -----------------------------------------------------------------------------------


def _element(value: dict[str, Any], path: str) -> Element:
    attributes = []
    for key, item in (value.get("attrs") or {}).items():
        category, name = _attribute_parts(key)
        attributes.append(
            Attribute(
                key,
                category,
                name,
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


def _attribute_parts(key: str) -> tuple[str | None, str]:
    """Return an attribute's category and name; the schema guarantees the key form."""
    category, separator, name = key.partition(".")
    return (category, name) if separator else (None, key)


def _escape(key: str) -> str:
    return key.replace("~", "~0").replace("/", "~1")


def _json_pointer(path: Iterator[Any]) -> str:
    return "".join(f"/{_escape(str(value))}" for value in path)
