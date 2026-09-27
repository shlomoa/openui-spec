"""Regression coverage for the Markdown internal link checker (spec/bin/check_links.py)."""

from __future__ import annotations

import contextlib
import io
import tempfile
import unittest
from pathlib import Path

from spec.bin.check_links import check_file, github_slug, main, tracked_markdown

TARGET = """# Target title

## Repository validation

## Repository validation

### `*.scope.md` and _emphasis_ with [a link](x.md)

<a id="Custom-Anchor"></a>

```markdown
## Not a heading
```
"""

PASSING_SOURCE = """# Source

- [file](target.md) and [anchor](target.md#repository-validation)
- [duplicate heading](target.md#repository-validation-1)
- [formatted heading](docs/../target.md#scopemd-and-emphasis-with-a-link)
- [html anchor](target.md#custom-anchor) and [self](#source)
- [directory](docs) ![image](docs/image.png "Title") [space](docs/a%20b.md)
- [external](https://example.com/missing.md) [mail](mailto:a@b.c) [host](//x/y)
- `[code span](missing.md)`

[reference]: <target.md#target-title>

```text
[fenced](missing.md)
```
"""

FAILING_SOURCE = """# Source

[missing file](missing.md)
[missing anchor](target.md#not-a-heading)
[missing self anchor](#nowhere)
[ref]: gone/
"""


def _quiet(argv: list[str]) -> int:
    """Run ``main`` without printing its console output."""
    with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
        return main(argv)


class CheckLinksTest(unittest.TestCase):
    def setUp(self) -> None:
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        (self.root / "docs").mkdir()
        (self.root / "docs" / "image.png").write_bytes(b"")
        (self.root / "docs" / "a b.md").write_text("# A\n", encoding="utf-8")
        (self.root / "target.md").write_text(TARGET, encoding="utf-8")

    def _check(self, text: str) -> list[str]:
        source = self.root / "source.md"
        source.write_text(text, encoding="utf-8")
        prefix = f"{source.as_posix()}:"
        return [error.removeprefix(prefix) for error in check_file(source, self.root)]

    def test_github_slug(self) -> None:
        self.assertEqual(
            github_slug("Spec artifacts: grammar vs. catalog"), "spec-artifacts-grammar-vs-catalog"
        )
        self.assertEqual(
            github_slug("Leaf scope source format (`*.scope.md`)"),
            "leaf-scope-source-format-scopemd",
        )
        self.assertEqual(github_slug("W1 — Terminology"), "w1--terminology")
        self.assertEqual(github_slug("`to_json` converter"), "to_json-converter")

    def test_passing_fixture_has_no_broken_links(self) -> None:
        self.assertEqual(self._check(PASSING_SOURCE), [])

    def test_failing_fixture_reports_each_broken_link(self) -> None:
        self.assertEqual(
            self._check(FAILING_SOURCE),
            [
                "3: broken link 'missing.md' (target does not exist)",
                "4: broken link 'target.md#not-a-heading' "
                "(anchor #not-a-heading not found in target.md)",
                "5: broken link '#nowhere' (anchor #nowhere not found in source.md)",
                "6: broken link 'gone/' (target does not exist)",
            ],
        )

    def test_main_exit_codes(self) -> None:
        good = self.root / "good.md"
        bad = self.root / "bad.md"
        good.write_text("[ok](target.md)\n", encoding="utf-8")
        bad.write_text("[broken](missing.md)\n", encoding="utf-8")

        self.assertEqual(_quiet([str(good)]), 0)
        self.assertEqual(_quiet([str(good), str(bad)]), 1)

    def test_repository_markdown_has_no_broken_internal_links(self) -> None:
        files = tracked_markdown()

        self.assertTrue(files)
        self.assertFalse(any("spec/survey/" in path.as_posix() for path in files))
        self.assertEqual([error for path in files for error in check_file(path)], [])


if __name__ == "__main__":
    unittest.main()
