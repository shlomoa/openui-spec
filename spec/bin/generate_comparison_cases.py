"""Generate the comparison cases of ``spec/conformance/comparison/``.

Each case is two OpenUI documents and the changelog a comparison of them reports. The
cases are generated, never edited by hand: this module is their source. The expected
changelogs below are written out from the output contract of
``spec/tooling/comparison.md``; they are not derived from the comparator, so a case
fails when the comparator and the contract disagree. The documents declare the current
spec version (``SCHEMA_VERSION``), so a version bump only needs a regeneration.

Usage: ``python -m spec.bin.generate_comparison_cases [--check]``. With ``--check`` no
file is written; the command fails when a case file is missing, stale or unexpected.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parents[2]
TARGET = REPO_ROOT / "spec" / "conformance" / "comparison"
VERSION_FILE = REPO_ROOT / "SCHEMA_VERSION"
OLD_VERSION = "0.1.0"  # a version other than the current one, for the root `version` case

Json = dict[str, Any]


def _doc(
    children: list[Json] | None = None,
    attrs: Json | None = None,
    version: str | None = None,
    type: str = "html",
) -> Json:
    document: Json = {"id": "root", "version": version, "type": type}
    if attrs is not None:
        document["attrs"] = attrs
    if children is not None:
        document["children"] = children
    return document


def _el(id: str, type: str, attrs: Json | None = None, children: list[Json] | None = None) -> Json:
    element: Json = {"id": id, "type": type}
    if attrs is not None:
        element["attrs"] = attrs
    if children is not None:
        element["children"] = children
    return element


def _changelog(
    remove: list[Json] | None = None,
    add: list[Json] | None = None,
    change: list[Json] | None = None,
) -> Json:
    return {"remove": remove or [], "add": add or [], "change": change or []}


def build_cases(version: str) -> dict[str, Json]:
    """Return the cases by name, for documents of spec version ``version``."""
    cases: dict[str, Json] = {}

    def case(name: str, description: str, reference: Json, new: Json, expected: Json) -> None:
        cases[name] = {
            "description": description,
            "reference": reference,
            "new": new,
            "expected": expected,
        }

    def doc(children=None, attrs=None, version=version, type="html"):
        return _doc(children, attrs, version, type)

    el, E = _el, _changelog

    orders = el("ordersTable", "Table", {"uses.pageSizes": ["10", "25"]})
    dlg = el("deleteDialog", "dialog", {"uses.open": "false"})
    case(
        "identical-documents",
        "Equal documents produce no entries.",
        doc([orders, dlg]),
        doc([orders, dlg]),
        E(),
    )
    case(
        "reordered-siblings",
        "Reordering the children of an identified list, at any depth, produces no entry.",
        doc([el("panel", "Tabs", None, [el("one", "tab"), el("two", "tab")]), dlg]),
        doc([dlg, el("panel", "Tabs", None, [el("two", "tab"), el("one", "tab")])]),
        E(),
    )
    case(
        "root-members-changed",
        "A different root `type` or `version` is a change at /type or /version.",
        doc([dlg], version=OLD_VERSION, type="html"),
        doc([dlg], version=version, type="Dialog"),
        E(
            change=[
                {"path": "/type", "reference": "html", "new": "Dialog"},
                {"path": "/version", "reference": OLD_VERSION, "new": version},
            ]
        ),
    )
    case(
        "root-attrs-added",
        (
            "An object member present only in the new document is added as one entry at the "
            "member path, with the whole value."
        ),
        doc([dlg]),
        doc([dlg], attrs={"uses.lang": '"he"'}),
        E(add=[{"path": "/attrs", "new": {"uses.lang": '"he"'}}]),
    )
    case(
        "root-attrs-removed",
        (
            "An object member present only in the reference is removed as one entry at the member"
            " path, with the whole value."
        ),
        doc([dlg], attrs={"uses.lang": '"he"'}),
        doc([dlg]),
        E(remove=[{"path": "/attrs", "reference": {"uses.lang": '"he"'}}]),
    )
    case(
        "attribute-added-removed-changed",
        (
            "Attributes are object members, so a removed, added or changed attribute is keyed by "
            "its attribute name."
        ),
        doc(
            [
                el(
                    "ordersTable",
                    "Table",
                    {"uses.rows": "orders", "uses.dense": "true", "uses.title": '"Old"'},
                )
            ]
        ),
        doc(
            [
                el(
                    "ordersTable",
                    "Table",
                    {"uses.rows": "orders", "uses.title": '"New"', "uses.pageSize": "10"},
                )
            ]
        ),
        E(
            remove=[{"path": "/children/ordersTable/attrs/uses.dense", "reference": "true"}],
            add=[{"path": "/children/ordersTable/attrs/uses.pageSize", "new": "10"}],
            change=[
                {
                    "path": "/children/ordersTable/attrs/uses.title",
                    "reference": '"Old"',
                    "new": '"New"',
                }
            ],
        ),
    )
    case(
        "attribute-value-to-null",
        "A scalar that becomes `null` is a change; `null` is a value, not an absence.",
        doc([el("ordersTable", "Table", {"uses.title": '"Orders"'})]),
        doc([el("ordersTable", "Table", {"uses.title": None})]),
        E(
            change=[
                {
                    "path": "/children/ordersTable/attrs/uses.title",
                    "reference": '"Orders"',
                    "new": None,
                }
            ]
        ),
    )
    case(
        "element-added",
        (
            "An element present only in the new identified list is added at /children/<id>, with "
            "the whole element."
        ),
        doc([dlg]),
        doc([dlg, orders]),
        E(add=[{"path": "/children/ordersTable", "new": orders}]),
    )
    case(
        "element-removed",
        (
            "An element present only in the reference identified list is removed at "
            "/children/<id>, with the whole element."
        ),
        doc([dlg, orders]),
        doc([dlg]),
        E(remove=[{"path": "/children/ordersTable", "reference": orders}]),
    )
    case(
        "element-with-subtree-added",
        (
            "An added element carries its whole subtree; its descendants produce no entries of "
            "their own."
        ),
        doc([]),
        doc([el("panel", "Tabs", {"uses.dense": "true"}, [el("one", "tab"), el("two", "tab")])]),
        E(
            add=[
                {
                    "path": "/children/panel",
                    "new": el(
                        "panel",
                        "Tabs",
                        {"uses.dense": "true"},
                        [el("one", "tab"), el("two", "tab")],
                    ),
                }
            ]
        ),
    )
    case(
        "element-type-changed",
        (
            "An element with the same id and another type is a change at /children/<id>/type, not"
            " a remove and an add."
        ),
        doc([el("choice", "Checkbox")]),
        doc([el("choice", "Radio")]),
        E(change=[{"path": "/children/choice/type", "reference": "Checkbox", "new": "Radio"}]),
    )
    case(
        "nested-element-changed",
        "Paths nest one id segment per identified list.",
        doc([el("panel", "Tabs", None, [el("one", "tab", {"uses.label": '"A"'})])]),
        doc([el("panel", "Tabs", None, [el("one", "tab", {"uses.label": '"B"'})])]),
        E(
            change=[
                {
                    "path": "/children/panel/children/one/attrs/uses.label",
                    "reference": '"A"',
                    "new": '"B"',
                }
            ]
        ),
    )
    case(
        "children-member-added",
        (
            "A leaf that gains a `children` member is added at /children with the whole list; the"
            " list is not id-keyed because the reference has none."
        ),
        doc([el("panel", "Tabs")]),
        doc([el("panel", "Tabs", None, [el("one", "tab")])]),
        E(add=[{"path": "/children/panel/children", "new": [el("one", "tab")]}]),
    )
    case(
        "empty-children-populated",
        "An empty list is an identified list, so an element added to `children: []` is id-keyed.",
        doc([el("panel", "Tabs", None, [])]),
        doc([el("panel", "Tabs", None, [el("one", "tab")])]),
        E(add=[{"path": "/children/panel/children/one", "new": el("one", "tab")}]),
    )
    case(
        "moved-to-another-parent",
        (
            "Moving an element to another parent is a remove at the old path plus an add at the "
            "new path, with the whole element in both."
        ),
        doc(
            [
                el("left", "Tabs", None, [el("one", "tab", {"uses.label": '"A"'})]),
                el("right", "Tabs", None, []),
            ]
        ),
        doc(
            [
                el("left", "Tabs", None, []),
                el("right", "Tabs", None, [el("one", "tab", {"uses.label": '"A"'})]),
            ]
        ),
        E(
            remove=[
                {
                    "path": "/children/left/children/one",
                    "reference": el("one", "tab", {"uses.label": '"A"'}),
                }
            ],
            add=[
                {
                    "path": "/children/right/children/one",
                    "new": el("one", "tab", {"uses.label": '"A"'}),
                }
            ],
        ),
    )
    case(
        "moved-and-changed",
        (
            "A moved element that also changes is still only a remove plus an add; the change is "
            "inside the added value."
        ),
        doc(
            [
                el("left", "Tabs", None, [el("one", "tab", {"uses.label": '"A"'})]),
                el("right", "Tabs", None, []),
            ]
        ),
        doc(
            [
                el("left", "Tabs", None, []),
                el("right", "Tabs", None, [el("one", "tab", {"uses.label": '"B"'})]),
            ]
        ),
        E(
            remove=[
                {
                    "path": "/children/left/children/one",
                    "reference": el("one", "tab", {"uses.label": '"A"'}),
                }
            ],
            add=[
                {
                    "path": "/children/right/children/one",
                    "new": el("one", "tab", {"uses.label": '"B"'}),
                }
            ],
        ),
    )
    case(
        "list-attribute-reordered",
        "A list attribute is an unidentified list; reordering its items produces no entry.",
        doc([el("ordersTable", "Table", {"uses.pageSizes": ["10", None, "25"]})]),
        doc([el("ordersTable", "Table", {"uses.pageSizes": ["25", "10", None]})]),
        E(),
    )
    case(
        "list-attribute-changed",
        (
            "A list attribute that differs, as a multiset, is one change at the attribute path "
            "with both whole lists in their original order."
        ),
        doc([el("ordersTable", "Table", {"uses.pageSizes": ["10", "25"]})]),
        doc([el("ordersTable", "Table", {"uses.pageSizes": ["50", "25", "10"]})]),
        E(
            change=[
                {
                    "path": "/children/ordersTable/attrs/uses.pageSizes",
                    "reference": ["10", "25"],
                    "new": ["50", "25", "10"],
                }
            ]
        ),
    )
    case(
        "list-attribute-duplicate-item",
        "Item multiplicity counts: a repeated item makes the lists differ.",
        doc([el("ordersTable", "Table", {"uses.pageSizes": ["10", "25"]})]),
        doc([el("ordersTable", "Table", {"uses.pageSizes": ["10", "10", "25"]})]),
        E(
            change=[
                {
                    "path": "/children/ordersTable/attrs/uses.pageSizes",
                    "reference": ["10", "25"],
                    "new": ["10", "10", "25"],
                }
            ]
        ),
    )
    case(
        "scalar-to-list-attribute",
        "A value that changes shape, scalar to list, is one change at the attribute path.",
        doc([el("ordersTable", "Table", {"uses.pageSizes": "10"})]),
        doc([el("ordersTable", "Table", {"uses.pageSizes": ["10"]})]),
        E(
            change=[
                {
                    "path": "/children/ordersTable/attrs/uses.pageSizes",
                    "reference": "10",
                    "new": ["10"],
                }
            ]
        ),
    )
    case(
        "list-attribute-emptied",
        (
            "A list attribute that becomes empty is one change at the attribute path, never an "
            "id-keyed removal."
        ),
        doc([el("ordersTable", "Table", {"uses.pageSizes": ["10"]})]),
        doc([el("ordersTable", "Table", {"uses.pageSizes": []})]),
        E(
            change=[
                {
                    "path": "/children/ordersTable/attrs/uses.pageSizes",
                    "reference": ["10"],
                    "new": [],
                }
            ]
        ),
    )
    dup_a = el("dup", "tab", {"uses.label": '"A"'})
    dup_b = el("dup", "tab", {"uses.label": '"B"'})
    case(
        "duplicate-ids-whole-list",
        (
            "A list with a repeated id is not identified: it is compared as a whole, and a "
            "difference is one change at the list path. (The document is invalid: ids are unique,"
            " `document/duplicate-id`.)"
        ),
        doc([dup_a, dup_b]),
        doc([dup_a, el("dup", "tab", {"uses.label": '"C"'})]),
        E(
            change=[
                {
                    "path": "/children",
                    "reference": [dup_a, dup_b],
                    "new": [dup_a, el("dup", "tab", {"uses.label": '"C"'})],
                }
            ]
        ),
    )
    case(
        "duplicate-ids-reordered",
        (
            "A whole-list comparison ignores order too, so reordering an unidentified list "
            "produces no entry."
        ),
        doc([dup_a, dup_b]),
        doc([dup_b, dup_a]),
        E(),
    )
    mixed = [el("one", "tab"), {"type": "tab"}]
    case(
        "mixed-children-whole-list",
        (
            "A list with an item that has no `id` is not identified, whatever the other items "
            "are: a difference is one change at the list path. (The document is invalid: "
            "`grammar/missing-property`.)"
        ),
        doc(mixed),
        doc([el("one", "tab"), {"type": "tab"}, el("two", "tab")]),
        E(
            change=[
                {
                    "path": "/children",
                    "reference": mixed,
                    "new": [el("one", "tab"), {"type": "tab"}, el("two", "tab")],
                }
            ]
        ),
    )
    case(
        "identified-to-unidentified",
        "When only one side is identified the comparison falls back to the whole list.",
        doc([el("one", "tab")]),
        doc([el("one", "tab"), el("one", "tab", {"uses.label": '"B"'})]),
        E(
            change=[
                {
                    "path": "/children",
                    "reference": [el("one", "tab")],
                    "new": [el("one", "tab"), el("one", "tab", {"uses.label": '"B"'})],
                }
            ]
        ),
    )
    case(
        "entry-order",
        (
            "Within each list, entries follow a depth-first walk: at each node the removals by "
            "key, then the additions by key, then the shared members by key; a node's own entries"
            " precede those of its members, so a list is not sorted by path."
        ),
        doc(
            [
                el("beta", "Tabs", None, [el("gone", "tab")]),
                el("alpha", "Tabs", {"uses.dense": "true"}),
            ]
        ),
        doc(
            [
                el("alpha", "Tabs", {"uses.dense": "false"}),
                el("beta", "Tabs", None, [el("two", "tab")]),
                el("zeta", "Tabs"),
            ]
        ),
        E(
            remove=[{"path": "/children/beta/children/gone", "reference": el("gone", "tab")}],
            add=[
                {"path": "/children/zeta", "new": el("zeta", "Tabs")},
                {"path": "/children/beta/children/two", "new": el("two", "tab")},
            ],
            change=[
                {"path": "/children/alpha/attrs/uses.dense", "reference": "true", "new": "false"}
            ],
        ),
    )

    return cases


def render(cases: dict[str, Json]) -> dict[str, str]:
    """Return the text of each case file, by file name."""
    return {
        f"{name}.json": json.dumps(case, indent=2, ensure_ascii=False) + "\n"
        for name, case in cases.items()
    }


def stale(files: dict[str, str], target: Path = TARGET) -> list[str]:
    """Return the problems between ``files`` and the case files in ``target``.

    A file is compared as JSON, so the formatting the repository's formatter gives it
    does not count.
    """
    problems = []
    present = {path.name for path in target.glob("*") if path.is_file()}
    for name in sorted(present - files.keys()):
        problems.append(f"unexpected case file {name}")
    for name, text in sorted(files.items()):
        path = target / name
        if name not in present:
            problems.append(f"missing case file {name}")
        elif json.loads(path.read_text(encoding="utf-8")) != json.loads(text):
            problems.append(f"stale case file {name}")
    return problems


def main(argv: list[str] | None = None) -> int:
    """Write the case files, or with ``--check`` report whether they are up to date."""
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--check", action="store_true", help="Fail if a case file is stale.")
    args = parser.parse_args(argv)

    files = render(build_cases(VERSION_FILE.read_text(encoding="utf-8").strip()))
    if args.check:
        problems = stale(files)
        for problem in problems:
            print(problem, file=sys.stderr)
        if problems:
            print(
                "Comparison cases are out of date; run "
                "python -m spec.bin.generate_comparison_cases",
                file=sys.stderr,
            )
        return 1 if problems else 0
    TARGET.mkdir(parents=True, exist_ok=True)
    for path in TARGET.glob("*"):
        if path.is_file() and path.name not in files:
            path.unlink()
    for name, text in files.items():
        (TARGET / name).write_text(text, encoding="utf-8")
    print(f"Wrote {len(files)} comparison cases to {TARGET.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
