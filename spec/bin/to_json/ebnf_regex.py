"""Translate the EBNF notation of the README section grammar (part 6.4) into regular expressions.

The notation is exactly what part 6.4 writes, and nothing more:

- ``name = expression ;`` defines a production;
- ``"text"`` is a terminal (``\\t``, ``\\"`` and ``\\\\`` are the only escapes);
- juxtaposition is a sequence and ``|`` an alternative;
- ``[ x ]`` is optional, ``{ x }`` is zero or more, ``( x )`` is a group;
- ``(* ... *)`` is a comment (it does not nest and ends at the first ``*)``);
- ``? text ?`` is a special sequence: prose that stands for a pattern the caller supplies.

Anything else is an ``EbnfError``: an unknown character, a production that is defined twice,
an undefined or recursive production, a special the caller did not supply. The translator never
guesses, so it cannot produce a pattern that is looser than the grammar it reads.
"""

from __future__ import annotations

import re
from collections.abc import Mapping
from dataclasses import dataclass


class EbnfError(ValueError):
    """The grammar uses notation or a production that the translator does not understand."""


@dataclass(frozen=True)
class Terminal:
    text: str

    @property
    def key(self) -> str:
        """The symbol key a caller uses to capture or replace this terminal: its quoted text."""
        return f'"{self.text}"'


@dataclass(frozen=True)
class Ref:
    name: str


@dataclass(frozen=True)
class Special:
    text: str


@dataclass(frozen=True)
class Seq:
    items: tuple[Node, ...]


@dataclass(frozen=True)
class Alt:
    options: tuple[Node, ...]


@dataclass(frozen=True)
class Opt:
    body: Node


@dataclass(frozen=True)
class Rep:
    body: Node


Node = Terminal | Ref | Special | Seq | Alt | Opt | Rep

_ESCAPES = {"t": "\t", '"': '"', "\\": "\\"}
_PUNCTUATION = "=;|[]{}()"
_NAME_RE = re.compile(r"[A-Za-z_][A-Za-z0-9_]*")


@dataclass(frozen=True)
class _Token:
    kind: str  # "name", "string", "special" or one of the punctuation characters
    value: str
    line: int


def _tokenize(text: str) -> list[_Token]:
    tokens: list[_Token] = []
    position = 0
    line = 1

    def fail(message: str) -> EbnfError:
        return EbnfError(f"EBNF line {line}: {message}")

    while position < len(text):
        char = text[position]
        if char == "\n":
            line += 1
            position += 1
        elif char.isspace():
            position += 1
        elif text.startswith("(*", position):
            end = text.find("*)", position + 2)
            if end < 0:
                raise fail("unterminated comment")
            line += text.count("\n", position, end)
            position = end + 2
        elif char == '"':
            value, position = _read_string(text, position, fail)
            tokens.append(_Token("string", value, line))
        elif char == "?":
            end = text.find("?", position + 1)
            if end < 0:
                raise fail("unterminated special sequence")
            body = text[position + 1 : end]
            tokens.append(_Token("special", " ".join(body.split()), line))
            line += body.count("\n")
            position = end + 1
        elif char in _PUNCTUATION:
            tokens.append(_Token(char, char, line))
            position += 1
        else:
            match = _NAME_RE.match(text, position)
            if not match:
                raise fail(f"unexpected character {char!r}")
            tokens.append(_Token("name", match.group(), line))
            position = match.end()
    return tokens


def _read_string(text: str, start: int, fail) -> tuple[str, int]:
    chars: list[str] = []
    position = start + 1
    while position < len(text):
        char = text[position]
        if char == '"':
            return "".join(chars), position + 1
        if char == "\n":
            break
        if char == "\\":
            escaped = text[position + 1 : position + 2]
            if escaped not in _ESCAPES:
                raise fail(f"unsupported escape \\{escaped} in a terminal")
            chars.append(_ESCAPES[escaped])
            position += 2
            continue
        chars.append(char)
        position += 1
    raise fail("unterminated terminal")


class _Parser:
    def __init__(self, tokens: list[_Token]) -> None:
        self._tokens = tokens
        self._index = 0

    def parse(self) -> dict[str, Node]:
        rules: dict[str, Node] = {}
        while self._index < len(self._tokens):
            name = self._expect("name", "a production name")
            self._expect("=", f"'=' after {name.value}")
            if name.value in rules:
                raise self._error(name, f"production {name.value} is defined twice")
            rules[name.value] = self._alternatives()
            self._expect(";", f"';' at the end of {name.value}")
        return rules

    def _peek(self) -> _Token | None:
        return self._tokens[self._index] if self._index < len(self._tokens) else None

    def _error(self, token: _Token | None, message: str) -> EbnfError:
        line = token.line if token else self._tokens[-1].line if self._tokens else 1
        return EbnfError(f"EBNF line {line}: {message}")

    def _expect(self, kind: str, what: str) -> _Token:
        token = self._peek()
        if token is None or token.kind != kind:
            found = repr(token.value) if token else "the end of the grammar"
            raise self._error(token, f"expected {what}, found {found}")
        self._index += 1
        return token

    def _alternatives(self) -> Node:
        options = [self._sequence()]
        while (token := self._peek()) is not None and token.kind == "|":
            self._index += 1
            options.append(self._sequence())
        return options[0] if len(options) == 1 else Alt(tuple(options))

    def _sequence(self) -> Node:
        items: list[Node] = []
        while (token := self._peek()) is not None and token.kind not in ("|", ";", "]", "}", ")"):
            items.append(self._term())
        if not items:
            raise self._error(self._peek(), "empty sequence")
        return items[0] if len(items) == 1 else Seq(tuple(items))

    def _term(self) -> Node:
        token = self._tokens[self._index]
        self._index += 1
        if token.kind == "name":
            return Ref(token.value)
        if token.kind == "string":
            return Terminal(token.value)
        if token.kind == "special":
            return Special(token.value)
        closers = {"[": ("]", Opt), "{": ("}", Rep), "(": (")", None)}
        if token.kind in closers:
            closer, wrapper = closers[token.kind]
            body = self._alternatives()
            self._expect(closer, f"{closer!r} to close {token.kind!r}")
            return wrapper(body) if wrapper else body
        raise self._error(token, f"unexpected {token.value!r}")


def parse_ebnf(text: str) -> dict[str, Node]:
    """Parse the productions of ``text``; raise ``EbnfError`` on notation it does not know."""
    return _Parser(_tokenize(text)).parse()


def _mentions(node: Node, name: str) -> bool:
    if isinstance(node, Ref):
        return node.name == name
    if isinstance(node, Seq):
        return any(_mentions(item, name) for item in node.items)
    if isinstance(node, Alt):
        return any(_mentions(option, name) for option in node.options)
    if isinstance(node, (Opt, Rep)):
        return _mentions(node.body, name)
    return False


class Ebnf:
    """The productions of one grammar, and the regular expression each one stands for.

    ``tokens`` replaces a nonterminal by a pattern (the lexical productions the grammar defines
    by reference elsewhere, and the character classes it leaves implicit). ``specials`` gives
    the pattern of each ``? ... ?`` sequence, by its text.
    """

    def __init__(
        self,
        text: str,
        *,
        tokens: Mapping[str, str] | None = None,
        specials: Mapping[str, str] | None = None,
    ) -> None:
        self.rules = parse_ebnf(text)
        self.tokens = dict(tokens or {})
        self.specials = {" ".join(key.split()): value for key, value in (specials or {}).items()}

    def regex(
        self,
        name: str,
        *,
        groups: Mapping[str, str] | None = None,
        replace: Mapping[str, str] | None = None,
        before: str | None = None,
        after: str | None = None,
    ) -> str:
        """Return the pattern of production ``name``, without anchors.

        ``groups`` wraps a symbol in a named group: a nonterminal by its name, a terminal by its
        quoted text (``'"uses."'``). A captured symbol MUST occur exactly once. ``replace`` swaps
        a symbol for another pattern. ``before`` and ``after`` keep the items of a production
        that is one sequence before, or after, the item that is the nonterminal given.
        """
        rule = self._rule(name)
        if before is not None or after is not None:
            rule = self._slice(name, rule, before, after)
        emitter = _Emitter(self, dict(groups or {}), dict(replace or {}))
        pattern = emitter.emit(rule, (name,))
        for symbol, group in emitter.groups.items():
            if emitter.captured.get(symbol, 0) != 1:
                raise EbnfError(
                    f"{name}: capture {group!r} needs {symbol} exactly once, "
                    f"found {emitter.captured.get(symbol, 0)}"
                )
        for symbol in emitter.replace:
            if symbol not in emitter.replaced:
                raise EbnfError(f"{name}: {symbol} to replace does not occur")
        return pattern

    def compile(self, name: str, **options) -> re.Pattern[str]:
        """Return ``regex(name, ...)`` compiled; use ``fullmatch`` to match a whole line."""
        return re.compile(self.regex(name, **options))

    def branch_with_tail(self, name: str, mentioning: str) -> str:
        """Return the pattern of the one alternative of ``name`` that mentions ``mentioning``.

        The alternative is a sequence that starts with a terminal. The pattern has the named
        groups ``lead`` (that terminal) and ``tail`` (the rest), so a caller reads the symbols
        of the tail without confusing them with the lead.
        """
        rule = self._rule(name)
        options = rule.options if isinstance(rule, Alt) else (rule,)
        found = [option for option in options if _mentions(option, mentioning)]
        if len(found) != 1:
            raise EbnfError(f"{name}: expected one alternative mentioning {mentioning}")
        branch = found[0]
        if not (
            isinstance(branch, Seq)
            and isinstance(branch.items[0], Terminal)
            and len(branch.items) > 1
        ):
            raise EbnfError(f"{name}: the alternative mentioning {mentioning} has no lead")
        emitter = _Emitter(self, {}, {})
        lead = emitter.emit(branch.items[0], (name,))
        tail = emitter.emit(Seq(branch.items[1:]), (name,))
        return f"(?P<lead>{lead})(?P<tail>{tail})"

    def terminal_text(self, name: str, index: int) -> str:
        """Return the text of terminal number ``index`` among the items of sequence ``name``."""
        rule = self._rule(name)
        items = rule.items if isinstance(rule, Seq) else (rule,)
        item = items[index]
        if not isinstance(item, Terminal):
            raise EbnfError(f"{name}: item {index} is not a terminal")
        return item.text

    def _rule(self, name: str) -> Node:
        if name not in self.rules:
            raise EbnfError(f"production {name} is not defined")
        return self.rules[name]

    @staticmethod
    def _slice(name: str, rule: Node, before: str | None, after: str | None) -> Node:
        if not isinstance(rule, Seq):
            raise EbnfError(f"{name}: before/after need a production that is one sequence")
        symbol = before if before is not None else after
        positions = [
            index
            for index, item in enumerate(rule.items)
            if isinstance(item, Ref) and item.name == symbol
        ]
        if len(positions) != 1:
            raise EbnfError(f"{name}: expected {symbol} once as an item, found {len(positions)}")
        items = rule.items[: positions[0]] if before is not None else rule.items[positions[0] + 1 :]
        if not items:
            raise EbnfError(f"{name}: nothing is left {'before' if before else 'after'} {symbol}")
        return Seq(items)


class _Emitter:
    def __init__(self, ebnf: Ebnf, groups: dict[str, str], replace: dict[str, str]) -> None:
        self.ebnf = ebnf
        self.groups = groups
        self.replace = replace
        self.captured: dict[str, int] = {}
        self.replaced: set[str] = set()

    def emit(self, node: Node, stack: tuple[str, ...]) -> str:
        if isinstance(node, Terminal):
            return self._symbol(node.key, lambda: re.escape(node.text))
        if isinstance(node, Ref):
            return self._symbol(node.name, lambda: self._expand(node.name, stack))
        if isinstance(node, Special):
            if node.text not in self.ebnf.specials:
                raise EbnfError(f"special sequence ? {node.text} ? has no pattern")
            return self.ebnf.specials[node.text]
        if isinstance(node, Seq):
            return "".join(self.emit(item, stack) for item in node.items)
        if isinstance(node, Alt):
            return "(?:" + "|".join(self.emit(option, stack) for option in node.options) + ")"
        if isinstance(node, Opt):
            return f"(?:{self.emit(node.body, stack)})?"
        return f"(?:{self.emit(node.body, stack)})*"

    def _expand(self, name: str, stack: tuple[str, ...]) -> str:
        if name in self.ebnf.tokens:
            return self.ebnf.tokens[name]
        if name not in self.ebnf.rules:
            raise EbnfError(f"production {name} is not defined")
        if name in stack:
            raise EbnfError(f"production {name} is recursive: {' -> '.join((*stack, name))}")
        return self.emit(self.ebnf.rules[name], (*stack, name))

    def _symbol(self, key: str, expand) -> str:
        if key in self.replace:
            self.replaced.add(key)
            pattern = f"(?:{self.replace[key]})"
        else:
            pattern = expand()
        if key in self.groups:
            self.captured[key] = self.captured.get(key, 0) + 1
            return f"(?P<{self.groups[key]}>{pattern})"
        return pattern
