"""Load, validate, and edit OpenUI JSON documents."""

from __future__ import annotations

import copy
import json
from collections.abc import Iterator, Mapping
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator

JsonObject = dict[str, Any]
REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SCHEMA_PATH = REPOSITORY_ROOT / "spec" / "openui.schema.json"
DEFAULT_CATALOG_PATH = REPOSITORY_ROOT / "spec" / "openui.json"


class OpenUiJsonError(ValueError):
    """Raised when an OpenUI JSON operation cannot be completed."""


class OpenUiValidationError(OpenUiJsonError):
    """Raised when an OpenUI JSON document is invalid."""


class OpenUiJson:
    """An editable OpenUI JSON document."""

    def __init__(
        self,
        document: JsonObject | None,
        *,
        schema_path: Path = DEFAULT_SCHEMA_PATH,
        catalog_path: Path = DEFAULT_CATALOG_PATH,
    ) -> None:
        self.document = document
        self.schema_path = schema_path
        self.catalog_path = catalog_path

    @classmethod
    def load(
        cls,
        path: str | Path,
        *,
        schema_path: Path = DEFAULT_SCHEMA_PATH,
        catalog_path: Path = DEFAULT_CATALOG_PATH,
    ) -> OpenUiJson:
        """Load an OpenUI JSON document from *path*."""
        try:
            document = json.loads(Path(path).read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as error:
            raise OpenUiJsonError(f"cannot load JSON document {path}: {error}") from error
        if not isinstance(document, dict):
            raise OpenUiJsonError("an OpenUI JSON document must be an object")
        return cls(document, schema_path=schema_path, catalog_path=catalog_path)

    def save(self, path: str | Path) -> None:
        """Save the in-memory document to *path*."""
        if self.document is None:
            raise OpenUiJsonError("cannot save a removed root object")
        output_path = Path(path)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(json.dumps(self.document, indent=2) + "\n", encoding="utf-8")

    def validate(self) -> None:
        """Validate the document against the OpenUI schema and catalog."""
        if self.document is None:
            raise OpenUiValidationError("the root object has been removed")

        schema = self._load_json(self.schema_path, "schema")
        catalog = self._load_json(self.catalog_path, "catalog")
        try:
            Draft202012Validator.check_schema(schema)
        except Exception as error:
            raise OpenUiValidationError(f"invalid OpenUI schema: {error}") from error

        validator = Draft202012Validator(schema)
        errors = sorted(
            validator.iter_errors(self.document), key=lambda error: list(error.absolute_path)
        )
        if errors:
            messages = [
                f"{self._json_path(error.absolute_path)}: {error.message}" for error in errors
            ]
            raise OpenUiValidationError("\n".join(messages))

        supported_types = {node["type"] for node in self._walk(catalog)}
        seen_ids: set[str] = set()
        for node in self._walk(self.document):
            object_id = node["id"]
            if object_id in seen_ids:
                raise OpenUiValidationError(f"duplicate object id: {object_id}")
            seen_ids.add(object_id)
            if node["type"] not in supported_types:
                raise OpenUiValidationError(f"unsupported object type: {node['type']}")

    def add(self, parent_id: str, child: Mapping[str, Any]) -> None:
        """Validate and append *child* to the children of *parent_id*."""
        parent = self._find(parent_id)
        if parent is None:
            raise OpenUiJsonError(f"parent object not found: {parent_id}")
        candidate = copy.deepcopy(dict(child))
        self._validate_child(candidate)
        existing_ids = (
            {node["id"] for node in self._walk(self.document)} if self.document else set()
        )
        candidate_ids = [node["id"] for node in self._walk(candidate)]
        duplicate_ids = existing_ids.intersection(candidate_ids)
        if duplicate_ids:
            raise OpenUiJsonError(f"object id already exists: {sorted(duplicate_ids)[0]}")
        parent.setdefault("children", []).append(candidate)

    def remove(self, object_id: str, *, parent_id: str | None = None) -> None:
        """Remove *object_id*, optionally requiring it to belong to *parent_id*."""
        if self.document is None:
            raise OpenUiJsonError("the root object has already been removed")
        if self.document["id"] == object_id:
            if parent_id is not None:
                raise OpenUiJsonError("the root object has no parent")
            self.document = None
            return

        parent, index = self._find_parent(object_id)
        if parent is None or index is None:
            raise OpenUiJsonError(f"object not found: {object_id}")
        if parent_id is not None and parent["id"] != parent_id:
            raise OpenUiJsonError(f"object {object_id} does not belong to parent {parent_id}")
        del parent["children"][index]

    def replace(
        self, object_id: str, replacement: Mapping[str, Any], *, parent_id: str | None = None
    ) -> None:
        """Fundamentally replace an object, including any children it contains."""
        candidate = copy.deepcopy(dict(replacement))
        self._validate_child(candidate)
        if candidate["id"] != object_id:
            raise OpenUiJsonError("replacement object id must match the replaced object id")
        if self.document is not None and self.document["id"] == object_id:
            if parent_id is not None:
                raise OpenUiJsonError("the root object has no parent")
            self.document = candidate
            return

        parent, index = self._find_parent(object_id)
        if parent is None or index is None:
            raise OpenUiJsonError(f"object not found: {object_id}")
        if parent_id is not None and parent["id"] != parent_id:
            raise OpenUiJsonError(f"object {object_id} does not belong to parent {parent_id}")
        parent["children"][index] = candidate

    def update_attributes(self, object_id: str, attributes: Mapping[str, str | None]) -> None:
        """Change attributes on *object_id* without replacing its children."""
        node = self._find(object_id)
        if node is None:
            raise OpenUiJsonError(f"object not found: {object_id}")
        if not all(
            isinstance(key, str) and (value is None or isinstance(value, str))
            for key, value in attributes.items()
        ):
            raise OpenUiJsonError("attribute changes must map strings to strings or null")
        updated = copy.deepcopy(node)
        updated.setdefault("attrs", {}).update(attributes)
        self._validate_node(updated, is_root=node is self.document)
        node["attrs"] = updated["attrs"]

    def _validate_child(self, child: JsonObject) -> None:
        self._validate_node(child, is_root=False)
        supported_types = {
            node["type"] for node in self._walk(self._load_json(self.catalog_path, "catalog"))
        }
        seen_ids: set[str] = set()
        for node in self._walk(child):
            if node["id"] in seen_ids:
                raise OpenUiJsonError(f"duplicate object id: {node['id']}")
            seen_ids.add(node["id"])
            if node["type"] not in supported_types:
                raise OpenUiJsonError(f"unsupported object type: {node['type']}")

    def _validate_node(self, node: JsonObject, *, is_root: bool) -> None:
        schema = self._load_json(self.schema_path, "schema")
        definition = (
            schema
            if is_root
            else {
                "$ref": "#/$defs/element",
                "$defs": schema["$defs"],
            }
        )
        errors = sorted(
            Draft202012Validator(definition).iter_errors(node),
            key=lambda error: list(error.absolute_path),
        )
        if errors:
            messages = [
                f"{self._json_path(error.absolute_path)}: {error.message}" for error in errors
            ]
            raise OpenUiJsonError("\n".join(messages))

    def _find(self, object_id: str) -> JsonObject | None:
        if self.document is None:
            return None
        return next((node for node in self._walk(self.document) if node["id"] == object_id), None)

    def _find_parent(self, object_id: str) -> tuple[JsonObject | None, int | None]:
        if self.document is None:
            return None, None
        for node in self._walk(self.document):
            for index, child in enumerate(node.get("children", [])):
                if child["id"] == object_id:
                    return node, index
        return None, None

    @staticmethod
    def _walk(node: JsonObject) -> Iterator[JsonObject]:
        yield node
        for child in node.get("children", []):
            yield from OpenUiJson._walk(child)

    @staticmethod
    def _load_json(path: Path, name: str) -> JsonObject:
        try:
            value = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as error:
            raise OpenUiValidationError(f"cannot load {name} {path}: {error}") from error
        if not isinstance(value, dict):
            raise OpenUiValidationError(f"OpenUI {name} must be an object")
        return value

    @staticmethod
    def _json_path(path: Iterator[Any]) -> str:
        values = list(path)
        return "$" if not values else "$." + ".".join(str(value) for value in values)
