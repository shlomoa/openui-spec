import json
import re
import subprocess
import sys
import unittest
from pathlib import Path
from typing import cast

from spec.bin.to_json.converter import parse_leaf_scope

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
SCOPES_DIR = SPEC_DIR / "scopes"
EXAMPLES_DIR = SPEC_DIR / "examples"
EBNF_VALIDATOR = SPEC_DIR / "tests" / "test_example_json_ebnf.py"
SCHEMA_VERSION_FILE = REPO_ROOT / "SCHEMA_VERSION"
CATALOG_PATH = SPEC_DIR / "openui.json"


class SpecExamplesFormatTest(unittest.TestCase):
    def setUp(self) -> None:
        self.expected_version = SCHEMA_VERSION_FILE.read_text(encoding="utf-8").strip()
        catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
        self.catalog_types = _document_types(catalog)

    def test_every_spec_example_is_ebnf_valid_openui_json(self) -> None:
        example_paths = sorted(EXAMPLES_DIR.rglob("*.example.json"))
        self.assertGreater(len(example_paths), 0)

        for path in example_paths:
            with self.subTest(path=path.relative_to(EXAMPLES_DIR).as_posix()):
                result = subprocess.run(
                    [sys.executable, str(EBNF_VALIDATOR), str(path)],
                    capture_output=True,
                    text=True,
                    check=False,
                    cwd=REPO_ROOT,
                )
                self.assertEqual(
                    result.returncode,
                    0,
                    f"stdout:\n{result.stdout}\nstderr:\n{result.stderr}",
                )

                document = json.loads(path.read_text(encoding="utf-8"))
                self.assertEqual(document["id"], "root")
                self.assertEqual(document["version"], self.expected_version)
                self.assertIsInstance(document.get("children"), list)
                self.assertGreater(len(document["children"]), 0)

    def test_every_spec_example_uses_exact_catalog_type_literals(self) -> None:
        for path in sorted(EXAMPLES_DIR.rglob("*.example.json")):
            with self.subTest(path=path.relative_to(EXAMPLES_DIR).as_posix()):
                document = json.loads(path.read_text(encoding="utf-8"))
                unknown_types = _document_types(document) - self.catalog_types
                self.assertEqual(unknown_types, set())

    def test_every_leaf_scope_has_matching_example(self) -> None:
        self.assertEqual(_leaf_scope_paths(), _leaf_example_paths_as_scope_paths())

    def test_every_scope_folder_has_matching_composite_example(self) -> None:
        scope_folders = {
            path.parent.relative_to(SCOPES_DIR).as_posix() for path in SCOPES_DIR.rglob("scope.md")
        }
        example_folders = {
            path.parent.relative_to(EXAMPLES_DIR).as_posix()
            for path in EXAMPLES_DIR.rglob("scope.example.json")
        }

        self.assertEqual(scope_folders, example_folders)

    def test_leaf_examples_represent_their_cataloged_scope_type(self) -> None:
        for relative_scope_path in sorted(_leaf_scope_paths()):
            scope_path = SCOPES_DIR / relative_scope_path
            example_path = EXAMPLES_DIR / relative_scope_path.replace(".scope.md", ".example.json")

            with self.subTest(example=example_path.relative_to(EXAMPLES_DIR).as_posix()):
                scope_node = parse_leaf_scope(scope_path, scopes_dir=SCOPES_DIR)
                instance = cast(dict[str, object], scope_node["children"][0])
                expected_types = {cast(str, scope_node["type"]), cast(str, instance["type"])}
                example_types = _document_types(
                    json.loads(example_path.read_text(encoding="utf-8"))
                )

                self.assertTrue(
                    expected_types & example_types,
                    f"expected one of {sorted(expected_types)} in {sorted(example_types)}",
                )

    def test_behavior_nodes_reference_their_controlled_element(self) -> None:
        behavior_types = {
            cast(str, parse_leaf_scope(path, scopes_dir=SCOPES_DIR)["type"])
            for path in (SCOPES_DIR / "Behaviors").glob("*.scope.md")
        }
        self.assertGreater(len(behavior_types), 0)

        for path in sorted(EXAMPLES_DIR.rglob("*.example.json")):
            document = json.loads(path.read_text(encoding="utf-8"))
            ids = _document_ids(document)
            for node in _descendants(document):
                if node.get("type") not in behavior_types:
                    continue
                with self.subTest(
                    path=path.relative_to(EXAMPLES_DIR).as_posix(), id=node.get("id")
                ):
                    attrs = cast(dict[str, object], node.get("attrs", {}))
                    target = attrs.get("[target]")
                    self.assertIsInstance(target, str, "a behavior needs a [target] reference")
                    self.assertIn(cast(str, target).strip('"'), ids - {node.get("id")})
                    self.assertNotIn("children", node, "a behavior does not own children")

    def test_every_addition_is_shown_in_its_scope_example(self) -> None:
        """Each Alias or Grouped leaf addition has a node named after it (plan W1 9.10)."""
        scope_of = _mapping_scopes()
        additions = _addition_terms()
        self.assertGreater(len(additions), 0)

        for term in additions:
            scope_path = scope_of.get(term)
            if scope_path is None:
                continue  # Not a taxonomy entry: out of v1 (plan Q9).
            example_path = EXAMPLES_DIR / scope_path.replace(".scope.md", ".example.json").replace(
                "scope.md", "scope.example.json"
            )
            with self.subTest(term=term, example=example_path.relative_to(EXAMPLES_DIR).as_posix()):
                document = json.loads(example_path.read_text(encoding="utf-8"))
                self.assertIn(_term_id(term), _document_ids(document))


ADDITION_SOURCES = (
    SCOPES_DIR / "terminology.md",
    SPEC_DIR / "survey" / "taxonomy_mapping_change.done.md",
    SPEC_DIR / "survey" / "ui_element_taxonomy_merge_proposal.done.md",
)
EXAMPLE_LEVELS = ("Alias", "Grouped leaf")
MARKDOWN_LINK_RE = re.compile(r"\[([^\]]*)\]\(([^)]*)\)")


def _table_cells(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def _plain(text: str) -> str:
    return MARKDOWN_LINK_RE.sub(r"\1", text).replace("**", "").replace("`", "").strip()


def _addition_terms() -> list[str]:
    """Terms of the Add rows whose level is Alias or Grouped leaf."""
    terms: list[str] = []
    for source in ADDITION_SOURCES:
        in_add = False
        header: list[str] | None = None
        for line in source.read_text(encoding="utf-8").splitlines():
            if line.startswith("## "):
                in_add = line.startswith("## 4. Add")
            if not in_add:
                continue
            if line.startswith("### "):
                header = None
                in_add = not line.startswith("### Not added")
                continue
            if not line.startswith("|"):
                continue
            cells = _table_cells(line)
            if header is None:
                header = cells
            elif not set(cells[0]) <= set("-: ") and "Level" in header:
                row = dict(zip(header, cells, strict=True))
                term = _plain(row.get("Add") or row.get("Term", ""))
                if _plain(row["Level"]).startswith(EXAMPLE_LEVELS):
                    terms.append(term)
    return terms


def _mapping_scopes() -> dict[str, str]:
    """Each taxonomy mapping entry and the scope file it links to."""
    scopes: dict[str, str] = {}
    mapping = (SCOPES_DIR / "taxonomy_mapping.md").read_text(encoding="utf-8")
    for line in mapping.splitlines():
        if not line.startswith("|"):
            continue
        cells = _table_cells(line)
        link = MARKDOWN_LINK_RE.search(cells[1]) if len(cells) > 1 else None
        if link and link.group(2).endswith("scope.md"):
            scopes[_plain(cells[0])] = link.group(2).split("#")[0]
    return scopes


def _term_id(term: str) -> str:
    """The camelCase id derived from a term, for example Highlighted text -> highlightedText."""
    words = re.findall(r"[A-Za-z0-9]+", term)
    return words[0].lower() + "".join(word.capitalize() for word in words[1:])


def _leaf_scope_paths() -> set[str]:
    return {
        path.relative_to(SCOPES_DIR).as_posix()
        for path in SCOPES_DIR.rglob("*.scope.md")
        if path.name != "template.scope.md"
    }


def _leaf_example_paths_as_scope_paths() -> set[str]:
    return {
        path.relative_to(EXAMPLES_DIR).as_posix().replace(".example.json", ".scope.md")
        for path in EXAMPLES_DIR.rglob("*.example.json")
        if path.name != "scope.example.json"
    }


def _document_types(node: object) -> set[str]:
    if not isinstance(node, dict):
        return set()

    document = cast(dict[str, object], node)
    node_type = document.get("type")
    types: set[str] = {node_type} if isinstance(node_type, str) else set()
    children = document.get("children", [])
    if isinstance(children, list):
        for child in cast(list[object], children):
            types.update(_document_types(child))
    return types


def _descendants(node: dict[str, object]) -> list[dict[str, object]]:
    found: list[dict[str, object]] = []
    for child in cast(list[object], node.get("children", [])):
        if isinstance(child, dict):
            child_node = cast(dict[str, object], child)
            found.append(child_node)
            found.extend(_descendants(child_node))
    return found


def _document_ids(document: dict[str, object]) -> set[str]:
    return {cast(str, node["id"]) for node in _descendants(document) if "id" in node}


if __name__ == "__main__":
    unittest.main()
