"""Read the section grammar of a leaf scope from the ``ebnf`` block of README part 6.4.

Part 6.4 is the single definition of the machine-bearing lines of a leaf scope (Identity,
Attributes and Child model) and of the value types. ``SectionGrammar`` translates the block
with ``ebnf_regex`` and exposes the patterns the converter matches lines with. The converter
names the productions it reads; every literal and every line shape comes from the block.

Two kinds of symbol are not defined by the block, and are supplied to ``SectionGrammar``:

- the lexical productions that part 6.4 defines by reference to ``openui.schema.json``
  (``type_name`` and ``camel_case``) come from the schema, as the ``lexical`` argument;
- the character classes the block uses but leaves implicit (``BASIC_CLASSES``).
"""

from __future__ import annotations

import re
from collections.abc import Mapping
from pathlib import Path

from .ebnf_regex import Ebnf, EbnfError

# Part 6.4 uses these four classes without defining them; they are ASCII, as in the schema.
BASIC_CLASSES = {
    "lowercase_letter": "[a-z]",
    "letter": "[A-Za-z]",
    "digit": "[0-9]",
    "character": "[^\r\n]",
}
# `NL` is a line break. The converter matches one line at a time, so a line ends where the
# line break would be.
SPECIALS = {"line break": ""}

# A Uses line writes its key prefix and category as terminals, so they are named by their text.
USES_PREFIX = "uses."
USES_CATEGORY = "Uses"

_HEADING_RE = re.compile(r"^#{1,6}\s+(?P<title>.+?)\s*$")
_FENCE_OPEN = "```ebnf"
_FENCE_CLOSE = "```"
SECTION_GRAMMAR_HEADING = "6.4 Section grammar"

README_PATH = Path(__file__).resolve().parents[2] / "README.md"


def extract_section_grammar(readme_text: str) -> str:
    """Return the ``ebnf`` block under the heading "6.4 Section grammar" of the README."""
    lines = readme_text.splitlines()
    heading = [
        index
        for index, line in enumerate(lines)
        if (match := _HEADING_RE.match(line)) and match.group("title") == SECTION_GRAMMAR_HEADING
    ]
    if len(heading) != 1:
        raise EbnfError(f"the README has {len(heading)} headings '{SECTION_GRAMMAR_HEADING}'")
    block: list[str] = []
    inside = False
    for line in lines[heading[0] + 1 :]:
        if not inside and _HEADING_RE.match(line):
            break
        if not inside and line.strip() == _FENCE_OPEN:
            inside = True
        elif inside and line.strip() == _FENCE_CLOSE:
            return "\n".join(block)
        elif inside:
            block.append(line)
    raise EbnfError(f"'{SECTION_GRAMMAR_HEADING}' has no closed {_FENCE_OPEN} block")


class SectionGrammar:
    """The line patterns and value types of the leaf scope format, derived from part 6.4."""

    def __init__(self, block: str, *, lexical: Mapping[str, str]) -> None:
        self.block = block
        self.ebnf = Ebnf(block, tokens={**BASIC_CLASSES, **lexical}, specials=SPECIALS)
        ebnf = self.ebnf
        self.type_name = lexical["type_name"]

        self.identity_re = ebnf.compile(
            "identity_line",
            groups={"id_value": "id", "type_value": "type", "status_value": "status"},
        )
        self.uses_re = ebnf.compile(
            "uses_line",
            groups={
                f'"{USES_PREFIX}"': "prefix",
                "attr_name": "name",
                f'"{USES_CATEGORY}"': "category",
                "value_type": "type",
            },
        )
        self.output_re = ebnf.compile(
            "output_line",
            groups={
                "output_prefix": "prefix",
                "attr_name": "name",
                "output_category": "category",
                "description": "description",
            },
        )
        self.child_re = ebnf.compile(
            "child_line",
            groups={"child_id": "id", "child_type": "type", "multiplicity": "multiplicity"},
        )
        self.value_type_re = ebnf.compile("value_type")

        # The head of a Uses line (up to its value type) with any prefix and category of an
        # attribute line: it tells a line with the wrong prefix or value type from a line that
        # is no attribute line at all.
        prefixes = f"{ebnf.regex('output_prefix')}|{re.escape(USES_PREFIX)}"
        categories = f"{ebnf.regex('output_category')}|{re.escape(USES_CATEGORY)}"
        self.attribute_head_re = ebnf.compile(
            "uses_line",
            before="value_type",
            groups={
                f'"{USES_PREFIX}"': "prefix",
                "attr_name": "name",
                f'"{USES_CATEGORY}"': "category",
            },
            replace={f'"{USES_PREFIX}"': prefixes, f'"{USES_CATEGORY}"': categories},
        )
        # A description that starts like the value-type field of a Uses line declares a type.
        self.declared_type_re = re.compile(
            ebnf.regex("value_type") + ebnf.regex("uses_line", after="value_type")
        )
        self.reference_re = re.compile(ebnf.branch_with_tail("scalar_type", "type_name"))
        self._type_name_re = re.compile(self.type_name)

        self.identity_section = self._section_name("identity_section")
        self.attributes_section = self._section_name("attributes_section")
        self.child_model_section = self._section_name("child_model_section")

    @classmethod
    def from_readme(cls, path: Path | str, *, lexical: Mapping[str, str]) -> SectionGrammar:
        """Read the ``ebnf`` block of the README at ``path``."""
        text = Path(path).read_text(encoding="utf-8")
        return cls(extract_section_grammar(text), lexical=lexical)

    def reference_types(self, value_type: str) -> list[str]:
        """Return the element types a ``reference(...)`` value type names, if any."""
        names: list[str] = []
        for match in self.reference_re.finditer(value_type):
            names.extend(self._type_name_re.findall(match.group("tail")))
        return names

    def _section_name(self, production: str) -> str:
        heading = self.ebnf.terminal_text(production, 0)
        title = heading.lstrip("#").strip()
        if not title or not heading.startswith("##"):
            raise EbnfError(f"{production} does not start with a '## Title' terminal")
        return title
