"""Regression coverage for the generic UI taxonomy HTML renderer."""

from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from spec.bin.render_taxonomy_html import (
    ELEMENT_SOURCE,
    ELEMENT_TARGET,
    PAGES,
    SOURCE,
    TARGET,
    render,
)


class RenderTaxonomyHtmlTest(unittest.TestCase):
    def test_repository_html_is_up_to_date(self) -> None:
        for source, target in PAGES:
            with self.subTest(page=target.name):
                self.assertEqual(target.read_text(encoding="utf-8"), render(source, target))

    def test_images_are_embedded_and_head_is_kept(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            base = Path(temporary)
            (base / "images").mkdir()
            (base / "images" / "dot.svg").write_text("<svg/>", encoding="utf-8")
            source = base / "page.md"
            source.write_text(
                "# Fixture page\n\n| Name | Example image |\n| --- | --- |\n"
                "| Dot | ![Dot example](images/dot.svg) |\n\n"
                "[a](../scopes/scope.md#glossary) [b](other.md) [c](https://example.com/x.md)\n",
                encoding="utf-8",
            )
            target = base / "page.html"
            target.write_text(
                "<html><head><title>Old</title><style>x{}</style></head><body>old</body></html>",
                encoding="utf-8",
            )

            page = render(source, target)

        self.assertIn("<title>Fixture page</title>", page)
        self.assertIn('<h1 id="fixture-page">Fixture page</h1>', page)
        self.assertIn("<style>x{}</style>", page)
        self.assertIn('src="data:image/svg+xml;base64,PHN2Zy8+" alt="Dot example"', page)
        self.assertNotIn('src="images/', page)
        self.assertNotIn(">old<", page)
        self.assertIn('href="../scopes/scope/#glossary"', page)
        self.assertIn('href="other/"', page)
        self.assertIn('href="https://example.com/x.md"', page)

    def test_fenced_code_is_kept_as_preformatted_source(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            base = Path(temporary)
            source = base / "page.md"
            source.write_text(
                "# Page\n\n```mermaid\nmindmap\n  root((A < B))\n```\n", encoding="utf-8"
            )
            target = base / "page.html"
            target.write_text("<html><head></head><body></body></html>", encoding="utf-8")

            page = render(source, target)

        self.assertIn(
            '<pre><code class="language-mermaid">mindmap\n  root((A &lt; B))\n</code></pre>', page
        )

    def test_sources_are_the_two_taxonomy_documents(self) -> None:
        self.assertEqual(SOURCE.name, "generic-ui-taxonomy.md")
        self.assertEqual(ELEMENT_SOURCE.name, "ui-element-taxonomy.md")
        self.assertEqual(ELEMENT_TARGET.name, "ui-element-taxonomy.html")
        self.assertEqual(PAGES, ((SOURCE, TARGET), (ELEMENT_SOURCE, ELEMENT_TARGET)))


if __name__ == "__main__":
    unittest.main()
