import json
import re
import unittest
from importlib import import_module
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
OPENUI_JSON = REPO_ROOT / "openui.json"
OPENUI_SCHEMA = SPEC_DIR / "openui.schema.json"
JSON_SCHEMA_MODULE = "json" + "schema"
Draft202012Validator: Any = import_module(JSON_SCHEMA_MODULE).Draft202012Validator

ALLOWED_ROOT_KEYS = {"version", "id", "type", "attrs", "children"}
ALLOWED_ELEMENT_KEYS = {"id", "type", "attrs", "children"}
ID_PATTERN = re.compile(r"^[a-z][A-Za-z0-9]*$")
KEBAB_TYPE_PATTERN = re.compile(r"^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$")
PASCAL_TYPE_PATTERN = re.compile(r"^[A-Z][A-Za-z0-9]*(?:-[a-z][a-z0-9]*)?$")
HTML_TAGS = {
    "html",
    "body",
    "main",
    "section",
    "article",
    "header",
    "footer",
    "nav",
    "div",
    "span",
    "input",
    "button",
    "table",
}


class OpenUiSpecContractTest(unittest.TestCase):
    def setUp(self) -> None:
        self.document = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        self.schema = json.loads(OPENUI_SCHEMA.read_text(encoding="utf-8"))

    def test_schema_file_exists_and_is_valid_draft_2020_12_schema(self) -> None:
        Draft202012Validator.check_schema(self.schema)

        self.assertEqual(self.schema["$schema"], "https://json-schema.org/draft/2020-12/schema")
        self.assertEqual(self.schema["title"], "OpenUI Specification Document")

    def test_openui_json_validates_against_entire_schema(self) -> None:
        validator = Draft202012Validator(self.schema)
        errors = sorted(validator.iter_errors(self.document), key=lambda error: error.json_path)

        self.assertEqual(
            [f"{error.json_path}: {error.message}" for error in errors],
            [],
        )

    def test_openui_json_uses_required_root_values(self) -> None:
        self.assertEqual(self.document["id"], "root")
        self.assertEqual(self.document["type"], "html")
        self.assertEqual(self.document["version"], "0.0.1")
        self.assertIsInstance(self.document.get("children"), list)
        self.assertGreater(len(self.document["children"]), 0)

    def test_openui_json_matches_document_shape(self) -> None:
        seen_ids: set[str] = set()
        self._assert_element_shape(self.document, path="root", is_root=True, seen_ids=seen_ids)

    def test_scope_documents_exist_and_cover_scope_markdown(self) -> None:
        scope_documents = set(self._scope_documents(self.document))
        expected_scope_documents = {
            path.relative_to(SPEC_DIR).as_posix() for path in (SPEC_DIR / "scopes").rglob("*.md")
        }

        self.assertLessEqual(expected_scope_documents, scope_documents)
        for relative_path in scope_documents:
            with self.subTest(relative_path=relative_path):
                self.assertTrue((SPEC_DIR / relative_path).is_file())

    def _assert_element_shape(
        self,
        value: Any,
        *,
        path: str,
        is_root: bool,
        seen_ids: set[str],
    ) -> None:
        self.assertIsInstance(value, dict, path)
        allowed_keys = ALLOWED_ROOT_KEYS if is_root else ALLOWED_ELEMENT_KEYS
        self.assertLessEqual(set(value), allowed_keys, path)

        element_id = value.get("id")
        self.assertIsInstance(element_id, str, f"{path}.id")
        self.assertRegex(element_id, ID_PATTERN, f"{path}.id")
        self.assertNotIn(element_id, seen_ids, f"{path}.id")
        seen_ids.add(element_id)

        element_type = value.get("type")
        self.assertIsInstance(element_type, str, f"{path}.type")
        self.assertTrue(self._is_valid_type(element_type), f"{path}.type={element_type}")

        attrs = value.get("attrs")
        if attrs is not None:
            self.assertIsInstance(attrs, dict, f"{path}.attrs")
            for key, attr_value in attrs.items():
                self.assertIsInstance(key, str, f"{path}.attrs key")
                self.assertTrue(
                    attr_value is None or isinstance(attr_value, str),
                    f"{path}.attrs.{key}",
                )

        children = value.get("children", [])
        self.assertIsInstance(children, list, f"{path}.children")
        for index, child in enumerate(children):
            self._assert_element_shape(
                child,
                path=f"{path}.children[{index}]",
                is_root=False,
                seen_ids=seen_ids,
            )

    def _scope_documents(self, value: dict[str, Any]) -> list[str]:
        attrs = value.get("attrs", {})
        own_document = (
            [attrs["scopeDocument"]] if isinstance(attrs.get("scopeDocument"), str) else []
        )
        return own_document + [
            document
            for child in value.get("children", [])
            for document in self._scope_documents(child)
        ]

    def _is_valid_type(self, value: str) -> bool:
        return bool(
            value in HTML_TAGS
            or KEBAB_TYPE_PATTERN.fullmatch(value)
            or PASCAL_TYPE_PATTERN.fullmatch(value)
        )


if __name__ == "__main__":
    unittest.main()
