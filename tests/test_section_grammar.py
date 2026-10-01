import ast
import json
import re
import tempfile
import unittest
from pathlib import Path

from spec.bin.to_json import converter
from spec.bin.to_json.converter import GRAMMAR, LEXICAL, build_scope_tree, parse_leaf_scope
from spec.bin.to_json.ebnf_regex import Ebnf, EbnfError
from spec.bin.to_json.section_grammar import (
    README_PATH,
    SPECIALS,
    SectionGrammar,
    extract_section_grammar,
)

REPO_ROOT = Path(__file__).resolve().parents[1]
README = README_PATH.read_text(encoding="utf-8")
BLOCK = extract_section_grammar(README)

# The productions the converter reads: every line shape, the value types, and the sections.
ROOTS = ("identity_line", "uses_line", "output_line", "child_line", "value_type")

BAD_TYPE_NAMES = ("Foo-Bar-baz", "A-B-C", "a-B", "Foo-", "9x", "")
TYPE_NAMES = ("Dialog", "html", "ToolBar", "nav-item", "Foo-bar")

# Each production the converter uses, with lines it accepts and lines it rejects.
PRODUCTIONS: dict[str, tuple[tuple[str, ...], tuple[str, ...]]] = {
    "WS": ((" ", "\t", "  \t "), ("", " ", "\x0b", "\n", "x")),
    "NL": (("",), ("\n", " ")),
    "lowercase_letter": (("a", "m", "z"), ("A", "1", "-", "é", "ab", "")),
    "uppercase_letter": (("A", "M", "Z"), ("a", "1", "-", "É", "AB", "")),
    "letter": (("a", "z", "A", "Z"), ("1", "-", "é", "ab", "")),
    "digit": (("0", "5", "9"), ("a", "-", "٣", "10", "")),
    "character": (("a", "—", " "), ("\n", "\r", "ab")),
    "camel_case": (("dialog", "toolBar", "x1"), ("Dialog", "1x", "a-b", "")),
    "id_value": (("dialog", "toolBar"), ("Dialog", "a-b", "")),
    "child_id": (("actions", "tableRow"), ("Actions", "a b", "")),
    "attr_name": (("open", "sortBy"), ("Open", "a.b", "")),
    "type_name": (TYPE_NAMES, BAD_TYPE_NAMES),
    "type_value": (TYPE_NAMES, BAD_TYPE_NAMES),
    "child_type": (TYPE_NAMES, BAD_TYPE_NAMES),
    "status_value": (("draft", "review", "stable"), ("Draft", "done", "", "draft ")),
    "multiplicity": (
        ("1", "0..1", "0..n", "1..n"),
        ("", "0", "n", "2", "many", "0..2", "1..1", "0..", "1.n", " 1"),
    ),
    "enum_word": (
        ("a", "rtl", "a-b", "a1", "a-1-b"),
        ("", "A", "1a", "-a", "a b", "a|b", "a_b"),
    ),
    "scalar_type": (
        (
            "string",
            "boolean",
            "integer",
            "number",
            "url",
            "enum(a)",
            "enum(ltr|rtl|auto)",
            "reference",
            "reference(Route)",
            "reference(Route|NavItem|html)",
        ),
        (
            "",
            "String",
            "bool",
            "list",
            "list(string)",
            "enum",
            "enum()",
            "enum(A)",
            "enum(a|)",
            "enum(a||b)",
            "reference()",
            "reference(Route|)",
            "reference(Foo-Bar-baz)",
            "reference(a-B)",
            "foo(bar)",
        ),
    ),
    "value_type": (
        (
            "string",
            "enum(a|b-c)",
            "reference(Route|NavItem)",
            "list(string)",
            "list(enum(a|b))",
            "list(reference)",
            "list(reference(Route))",
        ),
        ("list", "list()", "list(list(string))", "list(list(enum(a)))", "list(string", "string)"),
    ),
    "description": (("", "x", "a — b · c", "  "), ("a\nb",)),
    "output_prefix": (("produces.", "behaves."), ("uses.", "produce.", "Produces.", "")),
    "output_category": (("Produces", "Behaves"), ("Uses", "produces", "")),
    "identity_line": (
        (
            "- id: dialog · type: Dialog · status: draft",
            "- id: dialog · type: html · status: review",
            "-\tid:\tdialog\t·\ttype:\tDialog\t·\tstatus:\tstable",
            "-  id:  dialog  ·  type:  Dialog  ·  status:  stable",
        ),
        (
            "",
            "id: dialog · type: Dialog · status: draft",
            "- id: dialog · status: draft",
            "- type: Dialog · id: dialog · status: draft",
            "- id: dialog · type: Dialog",
            "- id: Dialog · type: Dialog · status: draft",
            "- id: dialog · type: Foo-Bar-baz · status: draft",
            "- id: dialog · type: a-B · status: draft",
            "- id: dialog · type: Foo- · status: draft",
            "- id: dialog · type: Dialog · status: archived",
            "- id: dialog - type: Dialog - status: draft",
            "- id:dialog · type: Dialog · status: draft",
            "- id: dialog · type: Dialog · status: draft ",
            "- id: dialog · type: Dialog · status: draft\t",
            "- id: dialog · type: Dialog · status: draft",
            " - id: dialog · type: Dialog · status: draft",
        ),
    ),
    "uses_line": (
        (
            "- `uses.open` — Uses — boolean — whether the dialog is shown.",
            "- `uses.dir` — Uses — enum(ltr|rtl) — direction",
            "- `uses.to` — Uses — reference(Route|Page) — target",
            "- `uses.items` — Uses — list(reference(Route)) — items",
            "- `uses.x` — Uses — string — ",
            "-\t`uses.x`\t—\tUses\t—\turl\t—\tx",
        ),
        (
            "",
            "- `uses.open` — Uses — whether the dialog is shown.",
            "- `uses.open` — Uses — bool — whether",
            "- `uses.open` — Uses — list(list(string)) — nested",
            "- `uses.open` — Uses — string",
            "- `uses.open` — Produces — string — x",
            "- `produces.open` — Uses — string — x",
            "- `open` — Uses — string — x",
            "- `uses.Open` — Uses — string — x",
            "- `uses.` — Uses — string — x",
            "- uses.open — Uses — string — x",
            "- `uses.open`  Uses — string — x",
            "- `uses.open` - Uses - string - x",
            "- `uses.to` — Uses — reference(Foo-Bar-baz) — x",
        ),
    ),
    "output_line": (
        (
            "- `produces.close` — Produces — emitted on close.",
            "- `behaves.sort` — Behaves — sorts the rows.",
            "- `behaves.sort` — Behaves — ",
            "-\t`produces.close`\t—\tProduces\t—\tx",
            "- `produces.close` — Produces — string — described by a type word",
            "- `produces.close` — Behaves — a prefix and a category that differ",
        ),
        (
            "",
            "- `produces.close` — Produces",
            "- `produces.close` — Uses — emitted",
            "- `uses.close` — Produces — emitted",
            "- `close` — Produces — emitted",
            "- `produces.Close` — Produces — emitted",
            "- [close] — Produces — emitted",
            "- `produces.close` — produces — emitted",
            "- `produces.close` - Produces - emitted",
        ),
    ),
    "child_line": (
        (
            "- actions — footer — 0..1 — the actions region.",
            "- title — header — 1 — the title.",
            "- row — TableRow — 0..n — rows.",
            "- item — nav-item — 1..n — items.",
            "- row — TableRow — 0..n — ",
            "-\trow\t—\tTableRow\t—\t0..n\t—\tx",
        ),
        (
            "",
            "- actions — footer — many — invalid multiplicity",
            "- actions — footer — 2 — invalid multiplicity",
            "- actions — footer — 0..2 — invalid multiplicity",
            "- actions — footer — 0..n",
            "- actions — footer — 0..n —",
            "- Actions — footer — 0..n — x",
            "- actions — Foo-Bar-baz — 0..n — x",
            "- actions — Foo- — 0..n — x",
            "- actions — a-B — 0..n — x",
            "- actions footer 0..n x",
            "- actions - footer - 0..n - x",
            "actions — footer — 0..n — x",
        ),
    ),
}


class DerivedProductionsTest(unittest.TestCase):
    """Every production the converter reads accepts and rejects what part 6.4 states."""

    def test_the_cases_cover_every_production_the_converter_reads(self) -> None:
        # `camel_case` is the schema's token in the converter, but the block defines it too, so
        # its classes are read from the block as well
        own = Ebnf(BLOCK, tokens={"type_name": LEXICAL["type_name"]}, specials=SPECIALS)
        self.assertEqual(
            own.reachable(*ROOTS), set(PRODUCTIONS), "add a case for each production read"
        )
        self.assertLessEqual(GRAMMAR.ebnf.reachable(*ROOTS), set(PRODUCTIONS))

    def test_each_production_accepts_and_rejects_its_cases(self) -> None:
        for name, (accepted, rejected) in PRODUCTIONS.items():
            pattern = GRAMMAR.ebnf.compile(name)
            for text in accepted:
                with self.subTest(production=name, accepted=text):
                    self.assertTrue(pattern.fullmatch(text))
            for text in rejected:
                with self.subTest(production=name, rejected=text):
                    self.assertFalse(pattern.fullmatch(text))

    def test_the_section_names_are_the_headings_of_the_section_productions(self) -> None:
        self.assertEqual(
            (GRAMMAR.identity_section, GRAMMAR.attributes_section, GRAMMAR.child_model_section),
            ("Identity", "Attributes", "Child model"),
        )

    def test_a_scope_value_type_names_the_element_types_it_references(self) -> None:
        for value_type, names in (
            ("string", []),
            ("reference", []),
            ("reference(A)", ["A"]),
            ("reference(Route|NavItem|html)", ["Route", "NavItem", "html"]),
            ("list(reference(Route|Page))", ["Route", "Page"]),
            ("enum(reference|a)", []),
            ("list(enum(a|b))", []),
        ):
            with self.subTest(value_type=value_type):
                self.assertEqual(GRAMMAR.reference_types(value_type), names)

    def test_the_lexical_tokens_are_the_schemas(self) -> None:
        defs = json.loads((REPO_ROOT / "spec" / "openui.schema.json").read_text("utf-8"))["$defs"]
        schema = {
            "type_name": defs["typeName"]["pattern"],
            "camel_case": defs["element"]["properties"]["id"]["pattern"],
        }
        for name, pattern in schema.items():
            with self.subTest(token=name):
                self.assertEqual(
                    LEXICAL[name], f"(?:{pattern.removeprefix('^').removesuffix('$')})"
                )
                for production in {
                    "type_name": ("type_value", "child_type"),
                    "camel_case": ("id_value", "child_id", "attr_name"),
                }[name]:
                    for text in (*TYPE_NAMES, *BAD_TYPE_NAMES, "dialog", "toolBar", "Dialog", "x1"):
                        self.assertEqual(
                            bool(GRAMMAR.ebnf.compile(production).fullmatch(text)),
                            bool(re.fullmatch(pattern, text)),
                            (production, text),
                        )

    def test_the_block_defines_camel_case_as_the_schema_does(self) -> None:
        """The block's own definition agrees with the schema token that replaces it."""
        own = Ebnf(BLOCK, specials=SPECIALS).compile("camel_case")
        schema = re.compile(LEXICAL["camel_case"])
        for text in ("dialog", "toolBar", "x1", "a", "Dialog", "1x", "a-b", "a_b", "", "aÉ"):
            self.assertEqual(bool(own.fullmatch(text)), bool(schema.fullmatch(text)), text)


class ExtractSectionGrammarTest(unittest.TestCase):
    def test_the_block_is_the_ebnf_block_under_the_heading(self) -> None:
        self.assertTrue(BLOCK.lstrip().startswith("(* OpenUI leaf scope"))
        self.assertIn("identity_line", BLOCK)
        self.assertNotIn("```", BLOCK)
        heading = README.index("### 6.4 Section grammar")
        self.assertIn(BLOCK, README[heading : README.index("## Annex A", heading)])

    def test_a_missing_heading_or_block_is_an_error(self) -> None:
        with self.assertRaisesRegex(EbnfError, "0 headings"):
            extract_section_grammar("# Title\n")
        with self.assertRaisesRegex(EbnfError, "no closed"):
            extract_section_grammar("### 6.4 Section grammar\n\ntext\n\n### 6.5 Next\n")
        with self.assertRaisesRegex(EbnfError, "no closed"):
            extract_section_grammar("### 6.4 Section grammar\n\n```ebnf\na = x ;\n")
        with self.assertRaisesRegex(EbnfError, "2 headings"):
            extract_section_grammar("### 6.4 Section grammar\n### 6.4 Section grammar\n")


def _edited(old: str, new: str) -> SectionGrammar:
    """Return the grammar of a copy of the part 6.4 block with one edit."""
    assert BLOCK.count(old) == 1, old
    return SectionGrammar(BLOCK.replace(old, new), lexical=LEXICAL)


def _scope_text(*, status: str = "draft", attributes: str = "", children: str = "") -> str:
    text = f"# Edited\n\n## Identity\n\n- id: edited · type: Edited · status: {status}\n"
    if attributes:
        text += f"\n## Attributes\n\n{attributes}"
    if children:
        text += f"\n## Child model\n\n{children}"
    return text


def _parse(text: str, grammar: SectionGrammar) -> dict:
    with tempfile.TemporaryDirectory() as directory:
        path = Path(directory) / "edited.scope.md"
        path.write_text(text, encoding="utf-8")
        return parse_leaf_scope(path, scopes_dir=directory, grammar=grammar)


def _accepted(text: str, grammar: SectionGrammar) -> bool:
    try:
        _parse(text, grammar)
    except ValueError:
        return False
    return True


class DerivationFollowsTheBlockTest(unittest.TestCase):
    """The converter's language is the block's: an edited copy of the block changes it."""

    def test_the_default_grammar_is_the_block_of_the_readme(self) -> None:
        self.assertEqual(GRAMMAR.block, BLOCK)

    def test_an_added_value_type_is_accepted_only_by_the_edited_grammar(self) -> None:
        edited = _edited('"string" | "boolean"', '"string" | "date" | "boolean"')
        text = _scope_text(attributes="- `uses.when` — Uses — date — a day.\n")
        self.assertFalse(_accepted(text, GRAMMAR))
        self.assertEqual(_parse(text, edited)["children"][0]["attrs"], {"uses.when": "date"})
        # the edit reaches a list of the new type, and a reference or enum is unaffected
        self.assertTrue(edited.value_type_re.fullmatch("list(date)"))
        self.assertFalse(GRAMMAR.value_type_re.fullmatch("list(date)"))
        self.assertEqual(edited.reference_types("list(reference(A|B))"), ["A", "B"])

    def test_a_removed_value_type_is_rejected_by_the_edited_grammar(self) -> None:
        edited = _edited('"integer" | "number" | "url"', '"number" | "url"')
        text = _scope_text(attributes="- `uses.count` — Uses — integer — a count.\n")
        self.assertTrue(_accepted(text, GRAMMAR))
        with self.assertRaisesRegex(ValueError, "needs a valid value type"):
            _parse(text, edited)

    def test_a_changed_multiplicity_follows_the_block(self) -> None:
        edited = _edited('"0..n" | "1..n"', '"0..n" | "1..n" | "0..2"')
        text = _scope_text(children="- row — TableRow — 0..2 — two rows at most.\n")
        self.assertFalse(_accepted(text, GRAMMAR))
        self.assertEqual(
            _parse(text, edited)["children"][0]["children"],
            [{"id": "editedRow", "type": "TableRow"}],
        )
        dropped = _edited('"0..1" | "0..n"', '"0..n"')
        text = _scope_text(children="- row — TableRow — 0..1 — one row.\n")
        self.assertTrue(_accepted(text, GRAMMAR))
        self.assertFalse(_accepted(text, dropped))

    def test_a_changed_status_follows_the_block(self) -> None:
        edited = _edited('"draft" | "review" | "stable"', '"draft" | "review" | "archived"')
        self.assertTrue(_accepted(_scope_text(status="stable"), GRAMMAR))
        self.assertFalse(_accepted(_scope_text(status="stable"), edited))
        self.assertEqual(
            _parse(_scope_text(status="archived"), edited)["attrs"]["status"], "archived"
        )
        self.assertFalse(_accepted(_scope_text(status="archived"), GRAMMAR))

    def test_a_changed_separator_follows_the_block(self) -> None:
        edited = _edited(
            '"—" WS\n                            child_type',
            '"|" WS\n                            child_type',
        )
        self.assertTrue(_accepted(_scope_text(children="- row — TableRow — 0..n — x.\n"), GRAMMAR))
        self.assertFalse(_accepted(_scope_text(children="- row — TableRow — 0..n — x.\n"), edited))

    def test_a_changed_enum_word_follows_the_block(self) -> None:
        edited = _edited(
            'enum_word           = lowercase_letter { lowercase_letter | digit | "-" } ;',
            "enum_word           = lowercase_letter { lowercase_letter | digit } ;",
        )
        self.assertTrue(GRAMMAR.value_type_re.fullmatch("enum(a-b)"))
        self.assertFalse(edited.value_type_re.fullmatch("enum(a-b)"))
        self.assertTrue(edited.value_type_re.fullmatch("enum(ab)"))

    def test_a_changed_character_class_follows_the_block(self) -> None:
        no_zero = _edited('"0" | "1" | "2"', '"1" | "2"')
        self.assertTrue(GRAMMAR.value_type_re.fullmatch("enum(a0)"))
        self.assertFalse(no_zero.value_type_re.fullmatch("enum(a0)"))
        self.assertTrue(no_zero.value_type_re.fullmatch("enum(a1)"))
        no_z = _edited('| "y" | "z" ;\nuppercase_letter', '| "y" ;\nuppercase_letter')
        self.assertTrue(GRAMMAR.value_type_re.fullmatch("enum(z)"))
        self.assertFalse(no_z.value_type_re.fullmatch("enum(z)"))
        self.assertTrue(no_z.value_type_re.fullmatch("enum(y)"))
        text = _scope_text(attributes="- `uses.v` — Uses — enum(a0|z) — x.\n")
        self.assertTrue(_accepted(text, GRAMMAR))
        self.assertFalse(_accepted(text, no_zero))
        self.assertFalse(_accepted(text, no_z))

    def test_a_changed_character_special_is_an_error(self) -> None:
        with self.assertRaisesRegex(EbnfError, "has no pattern"):
            _edited("? any character except a line break ?", "? any printable character ?")

    def test_a_changed_output_prefix_and_category_follow_the_block(self) -> None:
        edited = _edited(
            'output_prefix       = "produces." | "behaves."',
            'output_prefix       = "produces." | "behaves." | "emits."',
        )
        # the key still has to be a key of a document: the schema owns the prefixes
        edited = SectionGrammar(
            edited.block.replace(
                'output_category     = "Produces" | "Behaves"',
                'output_category     = "Produces" | "Behaves" | "Emits"',
            ),
            lexical=LEXICAL,
        )
        self.assertTrue(edited.output_re.fullmatch("- `emits.done` — Emits — raised."))
        self.assertFalse(GRAMMAR.output_re.fullmatch("- `emits.done` — Emits — raised."))
        with self.assertRaisesRegex(ValueError, "malformed Attributes line"):
            _parse(_scope_text(attributes="- `emits.done` — Emits — raised.\n"), edited)

    def test_the_whole_tree_follows_the_edited_grammar(self) -> None:
        edited = _edited('"string" | "boolean"', '"string" | "date" | "boolean"')
        with tempfile.TemporaryDirectory() as directory:
            scopes = Path(directory)
            (scopes / "scope.md").write_text("# Scopes\n\nRoot.\n", encoding="utf-8")
            (scopes / "edited.scope.md").write_text(
                _scope_text(attributes="- `uses.when` — Uses — date — a day.\n"), encoding="utf-8"
            )
            with self.assertRaisesRegex(ValueError, "needs a valid value type"):
                build_scope_tree(scopes)
            tree = build_scope_tree(scopes, grammar=edited)
        self.assertEqual(tree["children"][0]["children"][0]["attrs"], {"uses.when": "date"})


class ConverterLanguageTest(unittest.TestCase):
    """What the converter accepts and rejects in a scope, line by line."""

    def test_the_type_names_a_document_cannot_use_are_rejected_everywhere(self) -> None:
        for name in ("Foo-Bar-baz", "A-B-C", "a-B", "Foo-"):
            with self.subTest(type=name):
                identity = f"# T\n\n## Identity\n\n- id: t · type: {name} · status: draft\n"
                self.assertFalse(_accepted(identity, GRAMMAR))
                self.assertFalse(
                    _accepted(_scope_text(children=f"- c — {name} — 1 — x.\n"), GRAMMAR)
                )
                self.assertFalse(
                    _accepted(
                        _scope_text(attributes=f"- `uses.r` — Uses — reference({name}) — x.\n"),
                        GRAMMAR,
                    )
                )

    def test_enum_reference_and_list_forms_are_accepted_and_list_of_list_is_not(self) -> None:
        for value_type, accepted in (
            ("enum(a|b)", True),
            ("reference(A|B)", True),
            ("reference", True),
            ("list(enum(a|b))", True),
            ("list(reference(A))", True),
            ("list(list(string))", False),
            ("list(list(reference))", False),
        ):
            with self.subTest(value_type=value_type):
                text = _scope_text(attributes=f"- `uses.v` — Uses — {value_type} — x.\n")
                self.assertEqual(_accepted(text, GRAMMAR), accepted)

    def test_a_bad_multiplicity_is_rejected(self) -> None:
        for multiplicity, accepted in (
            ("1", True),
            ("0..1", True),
            ("0..n", True),
            ("1..n", True),
            ("many", False),
            ("2", False),
            ("n..1", False),
        ):
            with self.subTest(multiplicity=multiplicity):
                text = _scope_text(children=f"- c — section — {multiplicity} — x.\n")
                self.assertEqual(_accepted(text, GRAMMAR), accepted)

    def test_an_attribute_line_names_the_rule_it_breaks(self) -> None:
        for line, message in (
            ("- `produces.x` — Uses — string — d.", "attribute produces.x must use Produces"),
            ("- `uses.x` — Produces — d.", "attribute uses.x must use Uses"),
            ("- `behaves.x` — Produces — d.", "attribute behaves.x must use Behaves"),
            ("- `produces.x` — Behaves — d.", "attribute produces.x must use Produces"),
            ("- `uses.x` — Uses — bool — d.", "attribute uses.x needs a valid value type"),
            ("- `uses.x` — Uses — d.", "attribute uses.x needs a valid value type"),
            ("- `behaves.x` — Behaves — url — d.", "Behaves attribute behaves.x declares no value"),
            ("- `x` — Uses — string — d.", "malformed Attributes line"),
            ("- `uses.X` — Uses — string — d.", "malformed Attributes line"),
            ("- uses.x — Uses — string — d.", "malformed Attributes line"),
            ("* `uses.x` — Uses — string — d.", None),
            ("`uses.x` — Uses — string — d.", None),
        ):
            with self.subTest(line=line):
                text = _scope_text(attributes=line + "\n")
                if message is None:
                    self.assertTrue(_accepted(text, GRAMMAR))  # prose, not a bullet
                else:
                    with self.assertRaisesRegex(ValueError, message):
                        _parse(text, GRAMMAR)

    def test_part_6_4_decides_what_the_old_patterns_left_open(self) -> None:
        """Where the converter's hand-written patterns and part 6.4 differed, 6.4 rules."""
        identity = "- id: t · type: T · status: draft"
        for line, accepted in (
            (identity, True),
            (identity + " ", False),  # 6.4 has no trailing white space on an identity line
            (identity.replace("id: t", "id:\u00a0t"), False),  # WS is a space or a tab
            (identity.replace("· type", "·\x0btype"), False),
        ):
            with self.subTest(identity=line):
                text = f"# T\n\n## Identity\n\n{line}\n"
                self.assertEqual(_accepted(text, GRAMMAR), accepted)
        for line in (
            "- `uses.x` — Uses — string — ",  # description is { character }: it can be empty
            "- `produces.x` — Produces — ",
        ):
            with self.subTest(line=line):
                self.assertTrue(_accepted(_scope_text(attributes=line + "\n"), GRAMMAR))


class UnknownGrammarFailsLoudlyTest(unittest.TestCase):
    """A block the translator does not understand is an error, never a looser pattern."""

    def test_unknown_notation_in_the_block_is_an_error(self) -> None:
        for old, new, message in (
            ('"boolean" |', '"boolean" , ', "unexpected character ','"),
            ('"url"', "/url/", "unexpected character '/'"),
            ('"url"', "'url'", "unexpected character"),
        ):
            with self.subTest(new=new), self.assertRaisesRegex(EbnfError, message):
                _edited(old, new)

    def test_an_undefined_or_unsupported_production_is_an_error(self) -> None:
        with self.assertRaisesRegex(EbnfError, "enum_word is not defined"):
            _edited(
                'enum_word           = lowercase_letter { lowercase_letter | digit | "-" } ;',
                "",
            )
        with self.assertRaisesRegex(EbnfError, "has no pattern"):
            _edited('"1" | "0..1"', "? one or zero ?")
        with self.assertRaisesRegex(EbnfError, "no pattern"):
            SectionGrammar(BLOCK, lexical=LEXICAL).ebnf.regex("prose_line")

    def test_a_block_that_drops_a_production_the_converter_reads_is_an_error(self) -> None:
        for name in ("identity_line", "uses_line", "output_line", "child_line", "value_type"):
            lines = [
                line
                for line in BLOCK.splitlines()
                if not line.startswith(name + " ") and not line.startswith(name + "=")
            ]
            with self.subTest(production=name), self.assertRaises(EbnfError):
                SectionGrammar("\n".join(lines), lexical=LEXICAL)


class ConverterHasNoHandWrittenGrammarTest(unittest.TestCase):
    def test_converter_compiles_only_heading_and_link_patterns_from_literals(self) -> None:
        source = (REPO_ROOT / "spec" / "bin" / "to_json" / "converter.py").read_text("utf-8")
        compiled: list[str] = []
        for node in ast.walk(ast.parse(source)):
            if (
                isinstance(node, ast.Assign)
                and isinstance(node.value, ast.Call)
                and ast.unparse(node.value.func) == "re.compile"
                and isinstance(node.value.args[0], (ast.Constant, ast.JoinedStr))
            ):
                compiled.extend(ast.unparse(target) for target in node.targets)
        self.assertEqual(sorted(compiled), ["HEADING_RE", "OBJECT_LINK_RE"])
        self.assertTrue(hasattr(converter, "GRAMMAR"))


if __name__ == "__main__":
    unittest.main()
