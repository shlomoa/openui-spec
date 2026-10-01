import re
import unittest

from spec.bin.to_json.ebnf_regex import Ebnf, EbnfError, parse_ebnf


def _accepts(grammar: Ebnf, name: str, text: str, **options) -> bool:
    return bool(grammar.compile(name, **options).fullmatch(text))


class EbnfNotationTest(unittest.TestCase):
    """Each construct of the notation of part 6.4 translates to the language it states."""

    def test_a_terminal_matches_its_text_only(self) -> None:
        grammar = Ebnf('a = "x.y" ;')
        self.assertTrue(_accepts(grammar, "a", "x.y"))
        self.assertFalse(_accepts(grammar, "a", "xzy"))

    def test_a_terminal_reads_the_tab_and_quote_escapes(self) -> None:
        grammar = Ebnf(r'a = "\t" "\"" "\\" ;')
        self.assertTrue(_accepts(grammar, "a", '\t"\\'))

    def test_a_sequence_is_juxtaposition(self) -> None:
        grammar = Ebnf('a = "x" "y" "z" ;')
        self.assertTrue(_accepts(grammar, "a", "xyz"))
        self.assertFalse(_accepts(grammar, "a", "xz"))

    def test_an_alternative_accepts_each_option_whole(self) -> None:
        grammar = Ebnf('a = "1" | "0..1" | "1..n" ;')
        for text in ("1", "0..1", "1..n"):
            self.assertTrue(_accepts(grammar, "a", text), text)
        for text in ("", "0", "..", "1..", "0..n", "11"):
            self.assertFalse(_accepts(grammar, "a", text), text)

    def test_an_option_is_optional(self) -> None:
        grammar = Ebnf('a = "x" [ "y" ] ;')
        self.assertTrue(_accepts(grammar, "a", "x"))
        self.assertTrue(_accepts(grammar, "a", "xy"))
        self.assertFalse(_accepts(grammar, "a", "xyy"))

    def test_a_repetition_is_zero_or_more(self) -> None:
        grammar = Ebnf('a = "x" { "y" } ;')
        for text in ("x", "xy", "xyyy"):
            self.assertTrue(_accepts(grammar, "a", text), text)
        self.assertFalse(_accepts(grammar, "a", "xz"))

    def test_a_group_binds_an_alternative_inside_a_sequence(self) -> None:
        grammar = Ebnf('a = "x" ( "y" | "z" ) "w" ;')
        self.assertTrue(_accepts(grammar, "a", "xyw"))
        self.assertTrue(_accepts(grammar, "a", "xzw"))
        self.assertFalse(_accepts(grammar, "a", "xw"))
        self.assertFalse(_accepts(grammar, "a", "xyzw"))

    def test_a_nonterminal_expands_to_its_production(self) -> None:
        grammar = Ebnf('a = b { "|" b } ; b = "p" | "q" ;')
        self.assertTrue(_accepts(grammar, "a", "p|q|p"))
        self.assertFalse(_accepts(grammar, "a", "p|"))

    def test_a_comment_is_skipped_and_ends_at_the_first_close(self) -> None:
        grammar = Ebnf(
            '(* head (*.md) with "quotes" *)\n'
            'a = "x" ; (* trailing *)\n'
            'b = "y" (* inside *) "z" ;\n'
        )
        self.assertTrue(_accepts(grammar, "a", "x"))
        self.assertTrue(_accepts(grammar, "b", "yz"))

    def test_a_special_takes_the_pattern_the_caller_supplies(self) -> None:
        text = 'a = "x" ? line break ? ;'
        grammar = Ebnf(text, specials={"line   break": ""})
        self.assertTrue(_accepts(grammar, "a", "x"))
        with self.assertRaisesRegex(EbnfError, "line break"):
            Ebnf(text).regex("a")

    def test_a_token_replaces_a_production_and_defines_an_undefined_one(self) -> None:
        grammar = Ebnf('a = b c ; b = "x" ;', tokens={"b": "[0-9]", "c": "[a-z]"})
        self.assertTrue(_accepts(grammar, "a", "7q"))
        self.assertFalse(_accepts(grammar, "a", "xq"))


class EbnfFailsLoudlyTest(unittest.TestCase):
    """What the translator does not understand is an error, never a looser pattern."""

    def test_unknown_notation_is_an_error(self) -> None:
        for text, message in (
            ('a = "x" , "y" ;', "unexpected character ','"),
            ("a = 'x' ;", "unexpected character"),
            ('a = "x" ', "';'"),
            ('a = "x" ;;', "production name"),
            ('a = "x" ] ;', "';'"),
            ('a = ( "x" ;', "to close"),
            ('a = [ "x" ;', "to close"),
            ('a = "x" | ;', "empty sequence"),
            ("a = ;", "empty sequence"),
            ('a = "x" ; a = "y" ;', "defined twice"),
            ('a = "x', "unterminated terminal"),
            (r'a = "\n" ;', "unsupported escape"),
            ('a = "x" ? never closed ;', "unterminated special"),
            ('(* never closed a = "x" ;', "unterminated comment"),
            ('a "x" ;', "'='"),
            ("a = /re/ ;", "unexpected character '/'"),
        ):
            with self.subTest(text=text), self.assertRaisesRegex(EbnfError, message):
                parse_ebnf(text)

    def test_an_error_names_the_line(self) -> None:
        with self.assertRaisesRegex(EbnfError, "line 3"):
            parse_ebnf('a = "x" ;\nb = "y" ;\nc = "z" , ;')

    def test_an_undefined_or_recursive_production_is_an_error(self) -> None:
        with self.assertRaisesRegex(EbnfError, "missing is not defined"):
            Ebnf("a = missing ;").regex("a")
        with self.assertRaisesRegex(EbnfError, "production nope is not defined"):
            Ebnf('a = "x" ;').regex("nope")
        with self.assertRaisesRegex(EbnfError, "recursive"):
            Ebnf('a = "(" a ")" | "x" ;').regex("a")

    def test_an_undefined_production_in_an_unused_rule_is_not_reached(self) -> None:
        grammar = Ebnf('a = "x" ; b = missing ;')
        self.assertTrue(_accepts(grammar, "a", "x"))


class EbnfCapturesTest(unittest.TestCase):
    GRAMMAR = Ebnf('line = "-" name ":" kind ; name = "n" ; kind = "k" | "l" ;')

    def test_a_nonterminal_and_a_terminal_can_be_captured(self) -> None:
        match = self.GRAMMAR.compile("line", groups={"kind": "kind", '"-"': "bullet"}).fullmatch(
            "-n:l"
        )
        self.assertEqual(match.groupdict(), {"kind": "l", "bullet": "-"})

    def test_a_capture_must_occur_exactly_once(self) -> None:
        grammar = Ebnf('line = k k "x" ; k = "k" ;')
        with self.assertRaisesRegex(EbnfError, "exactly once, found 2"):
            grammar.regex("line", groups={"k": "k"})
        with self.assertRaisesRegex(EbnfError, "exactly once, found 0"):
            grammar.regex("line", groups={"nowhere": "g"})

    def test_a_symbol_can_be_replaced_and_must_occur(self) -> None:
        pattern = self.GRAMMAR.compile("line", replace={"kind": "[a-z]"})
        self.assertTrue(pattern.fullmatch("-n:z"))
        with self.assertRaisesRegex(EbnfError, "to replace does not occur"):
            self.GRAMMAR.regex("line", replace={"nowhere": "x"})

    def test_a_terminal_can_be_replaced(self) -> None:
        pattern = self.GRAMMAR.compile("line", replace={'"-"': "[-+]"})
        self.assertTrue(pattern.fullmatch("+n:k"))

    def test_before_and_after_keep_one_side_of_an_item(self) -> None:
        head = self.GRAMMAR.compile("line", before="kind")
        self.assertTrue(head.match("-n:"))
        self.assertFalse(head.match("-n"))
        tail = Ebnf('a = "x" b "y" "z" ; b = "b" ;').compile("a", after="b")
        self.assertTrue(tail.fullmatch("yz"))

    def test_before_and_after_need_one_sequence_and_one_item(self) -> None:
        with self.assertRaisesRegex(EbnfError, "one sequence"):
            Ebnf('a = "x" | "y" ;').regex("a", before="x")
        with self.assertRaisesRegex(EbnfError, "found 0"):
            self.GRAMMAR.regex("line", before="absent")
        with self.assertRaisesRegex(EbnfError, "nothing is left"):
            Ebnf('a = b "x" ; b = "b" ;').regex("a", before="b")

    def test_a_branch_with_a_tail_separates_the_lead_from_the_tail(self) -> None:
        grammar = Ebnf('v = "s" | "ref" [ "(" t { "," t } ")" ] | "e(" w ")" ; t = "T" ; w = "w" ;')
        pattern = re.compile(grammar.branch_with_tail("v", "t"))
        match = pattern.fullmatch("ref(T,T)")
        self.assertEqual((match.group("lead"), match.group("tail")), ("ref", "(T,T)"))
        self.assertEqual(pattern.fullmatch("ref").group("tail"), "")
        with self.assertRaisesRegex(EbnfError, "one alternative mentioning"):
            grammar.branch_with_tail("v", "absent")
        with self.assertRaisesRegex(EbnfError, "no lead"):
            Ebnf('v = "a" | t t ; t = "T" ;').branch_with_tail("v", "t")

    def test_terminal_text_reads_a_terminal_of_a_sequence(self) -> None:
        self.assertEqual(self.GRAMMAR.terminal_text("line", 0), "-")
        with self.assertRaisesRegex(EbnfError, "not a terminal"):
            self.GRAMMAR.terminal_text("line", 1)


if __name__ == "__main__":
    unittest.main()
