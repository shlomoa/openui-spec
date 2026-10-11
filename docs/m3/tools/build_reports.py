"""Build the Material 3 reports of docs/m3 from the scraped data and the curated mapping.

Usage: python build_reports.py <material-web checkout>

Reads docs/m3/data/{glossary,components,curated_terms,curated_components}.json and writes
docs/m3/{m3-terminology,m3-components,SCRAP_INDEX}.md. The checkout is used only to check
that every image the reports cite exists at the pinned commit.
"""

import html
import json
import re
import sys
from collections import Counter
from pathlib import Path

M3 = Path(__file__).resolve().parents[1]
DATA = M3 / "data"
SCOPES = "../../spec/scopes/"
GLOSSARY = SCOPES + "scope.md#"
TAXONOMY = SCOPES + "taxonomy_mapping.md#"

# OpenUI vocabulary the curated mapping may reference: name -> link target.
LINK_GROUPS = {
    GLOSSARY: {
        "Button": "button",
        "Dialog": "dialog",
        "Table": "table",
        "Data grid": "data-grid",
        "Link": "link",
        "Element": "element",
        "Attribute": "attribute",
        "Trigger": "trigger",
    },
    TAXONOMY: {
        "command-activation": ["Icon button", "Toggle button"],
        "text-and-shortcut-entry": ["Text field"],
        "value-and-resource-selection": [
            "Checkbox",
            "Radio button",
            "Switch",
            "Dropdown",
            "List box",
            "Selection mode",
            "Slider",
            "Range slider",
            "Token collection",
            "Editable chip collection",
            "Step input",
        ],
        "temporal-entry": ["Date picker", "Time picker"],
        "document-and-numeric-display": ["Image", "Icon", "Separator", "Divider"],
        "collections-and-data-presentation": ["List", "Icon collection"],
        "feedback-and-assistance": [
            "Progress bar",
            "Spinner",
            "Loader",
            "Tag",
            "Progress mode",
            "Tooltip",
            "Alert",
            "Toast",
            "Snackbar",
        ],
        "command-menus": ["Menu", "Menu button", "Menu item"],
        "content-selection-and-position": ["Tab", "Tab Bar"],
        "application-navigation": ["Navigation bar", "Navigation Drawer", "Navigation Rail"],
        "grouping-surfaces": ["Card", "Tile", "Hero banner"],
        "workspace-surfaces": ["Toolbar", "Shell bar"],
        "overlays-and-sheets": ["Bottom Sheet", "Side Sheet", "Popover"],
        "forms": ["Form field"],
        "layout-and-structural-elements": ["Pane", "Rail", "Bar", "Scaffold", "Grid"],
        "layout-rules-and-relationships": ["Responsive Reflow", "Breakpoint"],
        "visual-appearance-and-presentation-rules": [
            "Color",
            "Typography",
            "Shape",
            "Elevation",
            "Shadow",
            "Theme",
            "Iconography",
            "Visual states",
            "Focus outline",
            "Spacing tokens",
        ],
        "interaction-states": ["Hover state", "Focus state", "Pressed state"],
        "behaviors": ["Text completion", "Exclusive selection coordination"],
    },
    SCOPES: {
        "Modal overlay": "Behaviors/modal_overlay.scope.md",
        "Input assistance": "Behaviors/input_assistance.scope.md",
        "Action controls": "Controls/action_controls.scope.md",
        "Choice controls": "Controls/choice_controls.scope.md",
        "Text inputs": "Controls/text_inputs.scope.md",
        "Range control": "Controls/range_control.scope.md",
        "Display primitives": "Controls/display_primitives.scope.md",
        "Status indicator": "Controls/status_indicator.scope.md",
        "Menu widgets": "Widgets/menu_widgets.scope.md",
        "Dialog scope": "Widgets/dialog.scope.md",
        "Tabs": "Containers/tabs.scope.md",
        "Presentation": "Presentation/scope.md",
        "Naming rule": "terminology.md#appendix-a-canonical-term-rule",
    },
}


def link_registry():
    registry = {}
    for base, group in LINK_GROUPS.items():
        if base == TAXONOMY:
            for anchor, names in group.items():
                registry.update({name: base + anchor for name in names})
        else:
            registry.update({name: base + target for name, target in group.items()})
    return registry


REGISTRY = link_registry()


def resolve(text):
    """Replace {{Name}} and {{Key|Label}} by Markdown links to the OpenUI spec."""

    def sub(match):
        key, _, label = match.group(1).partition("|")
        return f"[**{label or key}**]({REGISTRY[key]})"

    return re.sub(r"\{\{([^}]+)\}\}", sub, text)


def cell(text):
    return text.replace("|", "\\|").replace("\n", "<br>").strip()


def table(header, rows):
    lines = ["| " + " | ".join(header) + " |", "| " + " | ".join("---" for _ in header) + " |"]
    lines += ["| " + " | ".join(cell(c) for c in row) + " |" for row in rows]
    return "\n".join(lines)


def image_cell(path, images, repo, sha, checkout):
    if not path:
        return "—"
    if not (checkout / "docs" / "components" / "images" / path).is_file():
        raise SystemExit(f"image not found in the checkout: {path}")
    url = f"https://raw.githubusercontent.com/{repo}/{sha}/docs/components/images/{path}"
    alt = re.sub(r"\s+", " ", images.get(f"images/{path}", "Material Web example"))
    alt = html.escape(alt.strip('"'), quote=True)
    return f'<img src="{url}" alt="{alt}" width="160">'


def terminology(glossary, curated, comp, checkout):
    sha, repo = comp["commit"], comp["repo"]
    doc_by_stem = {d["doc"]: d for d in comp["docs"]}
    rows, counts = [], Counter()
    for number, term in enumerate(glossary["terms"], 1):
        name = term["term"]
        entry = curated["terms"][name]
        counts[entry["match"]] += 1
        sources = [f"[M3 glossary]({glossary['url']}#{term['anchor']})"]
        sources += [f"[{link['text']}]({link['href']})" for link in term["links"]]
        image = "—"
        if entry.get("image"):
            folder = entry["image"].split("/")[0]
            doc = doc_by_stem[{"chips": "chip", "textfield": "text-field"}.get(folder, folder)]
            images = {img["path"]: img["alt"] for img in doc["images"]}
            image = image_cell(entry["image"], images, repo, sha, checkout)
            sources.append(f"Image: [Material Web docs]({doc['docUrl']})")
        description = "<br>".join(term["description"]).replace("*", "\\*")
        for link in term["links"]:  # the link is in the Sources cell
            description = description.removesuffix(" " + link["text"])
        rows.append(
            [
                str(number),
                f"**{name}**",
                f"**{entry['match']}**<br>{resolve(entry['alias'])}",
                description,
                "<br>".join(sources),
                image,
            ]
        )
    return rows, counts


def front(title, lead):
    return f"# {title}\n\n{lead}\n"


TERM_HEADER = [
    "#",
    "Name (as in M3)",
    "Candidate alias (OpenUI)",
    "Detailed description",
    "Sources",
    "Image",
]


def write_terminology(glossary, curated, comp, checkout):
    rows, counts = terminology(glossary, curated, comp, checkout)
    legend = {
        "Exact": "the OpenUI term names the same concept",
        "Alias": "OpenUI has the concept; the M3 name is a variant or a synonym",
        "Narrower": "the M3 term is one case of a wider OpenUI term",
        "Broader": "the M3 term covers several OpenUI terms",
        "Related": "the concepts overlap but no OpenUI term matches",
        "Homonym": "the same word means something else in OpenUI",
        "Gap": "a concept OpenUI does not name",
        "Out of scope": "not UI vocabulary (documentation, product, platform)",
    }
    summary = table(
        ["Match", "Terms", "Meaning"],
        [[m, str(counts[m]), legend[m]] for m in legend if counts[m]],
    )
    text = front(
        "Material 3 glossary terms mapped to the OpenUI vocabulary",
        f"""All {len(glossary["terms"])} terms of the [Material 3 glossary]({glossary["url"]}),
scraped {glossary["scrapedAt"][:10]} (`{glossary["title"]}`), each with a candidate OpenUI alias.
This is a proposal for the owner: the OpenUI terms come from the
[glossary](../../spec/scopes/scope.md#glossary), the
[taxonomy mapping](../../spec/scopes/taxonomy_mapping.md) and the
[terminology changes](../../spec/scopes/terminology.md). No term is added or renamed here.

- **Name** is the heading as it appears in the M3 glossary.
- **Detailed description** is the M3 text, unchanged.
- **Sources** link to the term's own entry in the glossary (by its anchor) and to the
  "Learn more" links of that entry.
- **Image**: the glossary page has no images. Where a Material Web component documents the
  term, its example image is shown instead; the source is named in the cell.
- The scrape is indexed in [SCRAP_INDEX.md](SCRAP_INDEX.md).

## Match summary

{summary}

## Terms

{table(TERM_HEADER, rows)}
""",
    )
    (M3 / "m3-terminology.md").write_text(text, encoding="utf-8")


CROSS = [
    ("App bar", "Not built (roadmap: Top app bar, Bottom app bar)"),
    ("Banner", "Not built (roadmap)"),
    ("Button", "Documented: `button.md`"),
    ("Bottom sheet", "Not built (roadmap)"),
    ("Card", "Experimental: `labs/card` (elevated, filled, outlined)"),
    ("Checkbox", "Documented: `checkbox.md`"),
    ("Chip", "Documented: `chip.md`"),
    ("Data table", "Not built (roadmap)"),
    ("Date picker", "Not built (roadmap)"),
    ("Dialog", "Documented: `dialog.md`"),
    ("Divider", "Documented: `divider.md`"),
    ("Extended FAB", "Documented: `fab.md`"),
    ("Floating action button (FAB)", "Documented: `fab.md`"),
    ("Image list", "Not in Material Web, not on the roadmap"),
    ("List", "Documented: `list.md`"),
    ("Menu", "Documented: `menu.md`; select menu in `select.md`"),
    ("Navigation bar", "Experimental: `labs/navigationbar`, `labs/navigationtab`"),
    ("Navigation drawer", "Experimental: `labs/navigationdrawer`"),
    ("Navigation rail", "Not built (roadmap)"),
    ("Progress indicator", "Documented: `progress.md`"),
    ("Radio button", "Documented: `radio.md`"),
    ("Side sheet", "Not in Material Web, not on the roadmap"),
    ("Slider", "Documented: `slider.md`"),
    ("Snackbar", "Not built (roadmap)"),
    ("Switch", "Documented: `switch.md`"),
    ("Tab", "Documented: `tabs.md`"),
    ("Text field", "Documented: `text-field.md`"),
    ("Time picker", "Not built (roadmap)"),
    ("Toolbar", "Not in Material Web, not on the roadmap"),
    ("Tooltip", "Not built (roadmap)"),
]


def element_rows(doc, curated_elements, comp, checkout):
    sha, repo = comp["commit"], comp["repo"]
    images = {img["path"]: img["alt"] for img in doc["images"]}
    rows = []
    for item in curated_elements:
        sources = [f"[Docs: {item['name']}]({doc['docUrl']}#{item['anchor']})"]
        guideline = doc["guidelineLinks"].get(item.get("guideline", ""))
        design = doc["designArticles"]
        if design:
            sources.append(f"[M3 design article]({design[0]})")
        if guideline:
            sources.append(f"[M3 guidelines: {item['name']}]({guideline})")
        sources.append(f"[Catalog]({doc['catalogUrl']})")
        if doc["sourceTree"]:
            sources.append(f"[Source code]({doc['sourceTree']})")
        rows.append(
            [
                f"**{item['name']}**<br>`<{item['tag']}>`",
                f"**{item['match']}** · `{item['scope']}`<br>{resolve(item['alias'])}",
                item["description"],
                "<br>".join(sources),
                image_cell(item.get("image"), images, repo, sha, checkout),
            ]
        )
    return rows


def slug(title):
    return re.sub(r"[^a-z0-9 -]", "", title.lower()).replace(" ", "-")


def write_components(comp, curated, checkout):
    by_doc = {}
    for item in curated["components"]:
        by_doc.setdefault(item["doc"], []).append(item)
    header = [
        "Name (as in M3)",
        "Candidate alias (OpenUI scope or term)",
        "Detailed description",
        "Sources",
        "Image",
    ]
    matrix, sections = [], []
    for doc in comp["docs"]:
        items = by_doc.get(doc["doc"], [])
        if not items:
            raise SystemExit(f"no curated element for {doc['doc']}")
        scopes = sorted({i["scope"] for i in items})
        matrix.append(
            [
                f"[{doc['title']}](#{slug(doc['title'])})",
                ", ".join(f"`{i['tag']}`" for i in items),
                "<br>".join(f"`{s}`" for s in scopes),
            ]
        )
        sections.append(
            f"## {doc['title']}\n\n{doc['intro']} "
            f"([`{doc['doc']}.md`]({doc['docUrl']}))\n\n"
            + table(header, element_rows(doc, items, comp, checkout))
        )
    n_elements = sum(len(d["elements"]) for d in comp["docs"])
    cross = table(["Glossary term", "Material Web status"], [[t, s] for t, s in CROSS])
    text = front(
        "Material Web components mapped to the OpenUI scopes",
        f"""All {len(comp["docs"])} component pages of
[`docs/components`](https://github.com/{comp["repo"]}/tree/{comp["commit"]}/docs/components)
in [Material Web](https://github.com/{comp["repo"]}) (version {comp["packageVersion"]}, commit
[`{comp["commit"][:7]}`](https://github.com/{comp["repo"]}/commit/{comp["commit"]}),
{comp["commitDate"][:10]}), one row per custom element: {n_elements}
documented elements plus `md-elevation` and `md-icon`, whose pages have no API section. The
mapping is a proposal for the owner; the scopes are the folders of
[`spec/scopes`](../../spec/scopes/scope.md).

- **Name** is the component name of the M3 design article; the custom element is under it.
- **Candidate alias** gives the match, then the scope file (`Folder/Leaf`) and the OpenUI
  taxonomy entry or term. Gaps between the Material Web API and the OpenUI attributes are
  named where they exist.
- **Detailed description** is written from the Material Web page and its API tables.
- **Sources** link to the page section, the M3 design article and guidelines, the catalog and
  the source code, all at the pinned commit where GitHub is the host.
- **Image** is an example image from the Material Web docs at the pinned commit. "—" means
  the docs have no image for that element (the assist, input and suggestion chips, the menu
  item and the select option).
- The scrape is indexed in [SCRAP_INDEX.md](SCRAP_INDEX.md).

Material Web is in maintenance mode (its README and roadmap say so), so the set will not grow
here. See [Glossary components versus Material Web](#glossary-components-versus-material-web).

## Coverage

{table(["Component page", "Elements", "OpenUI scope files"], matrix)}

{chr(10).join(sections)}

## Glossary components versus Material Web

The glossary names {len(CROSS)} components. This is what Material Web has for each, from
`docs/components`, `labs/` and `docs/roadmap.md` ("New components … not built yet").

{cross}
""",
    )
    (M3 / "m3-components.md").write_text(text, encoding="utf-8")


def props_line(props):
    parts = []
    for p in props:
        name = p["attribute"] or p["name"]
        default = f"={p['default']}" if p["default"] and p["default"] != "undefined" else ""
        parts.append(f"`{name}`{default}")
    return ", ".join(parts)


def write_index(glossary, comp, curated_terms):
    terms = glossary["terms"]
    colors = sum(t["term"].startswith("Color: ") for t in terms)
    tokens = sum(t["term"].startswith("Design tokens: ") for t in terms)
    learn = sum(any(link["text"].startswith("Learn more") for link in t["links"]) for t in terms)
    lines = [
        "# Material 3 scrap index",
        "",
        "A lookup of what was scraped from the Material 3 sources, to answer questions without",
        "reading the sites again. The machine-readable data is in [`data/`](data/); the reports",
        "are [m3-terminology.md](m3-terminology.md) and [m3-components.md](m3-components.md).",
        "",
        "## Sources and snapshots",
        "",
        table(
            ["Source", "Snapshot", "Scraped with", "Data"],
            [
                [
                    f"[M3 glossary]({glossary['url']})",
                    f"{glossary['scrapedAt'][:10]}, page title `{glossary['title']}`",
                    "`tools/scrape_glossary.js` (headless Chromium; the page is rendered by"
                    " JavaScript)",
                    "[`data/glossary.json`](data/glossary.json)",
                ],
                [
                    f"[Material Web `docs/components`](https://github.com/{comp['repo']}/tree/"
                    f"{comp['commit']}/docs/components)",
                    f"commit `{comp['commit']}`, {comp['commitDate'][:10]}, package version "
                    f"{comp['packageVersion']}",
                    "`git clone --depth 1`, then `tools/parse_components.py`",
                    "[`data/components.json`](data/components.json)",
                ],
            ],
        ),
        "",
        "Curated mappings (hand-written): [`data/curated_terms.json`](data/curated_terms.json) and",
        "[`data/curated_components.json`](data/curated_components.json). The reports are built by",
        "`tools/build_reports.py`; see [README.md](README.md#refresh) for the commands.",
        "",
        "Not scraped: the pages the glossary links to under `m3.material.io` (the design",
        "articles), the Material Web `docs/theming` and `labs/` folders, and the rest of",
        "m3.material.io.",
        "The design-article URLs are recorded, not their content.",
        "",
        "## Facts about the sources",
        "",
        f"- The glossary has {len(terms)} terms in one flat A–Z list. Compound terms use "
        f"a prefix: `Color: …` ({colors} terms) and `Design tokens: …` ({tokens}). It has no "
        f"images. {learn} terms carry a 'Learn more' link to a page outside the glossary.",
        "- Each glossary term has a stable anchor (a UUID); `…/glossary#<uuid>` scrolls to it. "
        "The UUID is in `glossary.json` as `anchor`.",
        f"- Material Web is `@material/web` {comp['packageVersion']}, built on Lit. Its README "
        "and roadmap say it is **in maintenance mode pending new maintainers**: no new "
        "components are planned.",
        f"- `docs/components` has {len(comp['docs'])} pages, "
        f"{sum(len(d['elements']) for d in comp['docs'])} documented custom elements and 2 more "
        "(`md-elevation`, `md-icon`) whose pages have no API section. Pages are written for "
        "the Material Web catalog, so they carry catalog-only comments that the parser removes.",
        "- Components not built, per the roadmap: Autocomplete, Badge, Banner, Bottom app bar, "
        "Bottom sheet, Card, Data table, Date picker, Navigation bar, Navigation drawer, "
        "Navigation rail, Search, Segmented button, Snackbar, Time picker, Top app bar, Tooltip. "
        "Of these, Card, Navigation bar and drawer, Navigation tab, Badge and Segmented button "
        "exist as experimental code under `labs/` without a docs page.",
        "- Every Material Web page follows one outline: intro, Types, Usage, Accessibility, "
        "Theming (CSS tokens `--md-<component>-…` that default to `--md-sys-…` system tokens), API "
        "(Properties, Methods, Events).",
        "- Accessibility rules repeated across pages: give icon-only controls an `aria-label`; "
        "checkboxes, radios and switches are not labelled by `<label>` and need `aria-label`; "
        "disabled buttons and chips leave the tab order unless `soft-disabled`; group radios in "
        "`role=radiogroup`.",
        "",
        "## Glossary index",
        "",
        "Alphabetical as in the source. 'Match' is the proposal of "
        "[m3-terminology.md](m3-terminology.md).",
        "",
    ]
    rows = []
    for term in sorted(glossary["terms"], key=lambda t: t["term"].lower()):
        first = term["description"][0].split("\n")[0]
        for link in term["links"]:
            first = first.removesuffix(" " + link["text"])
        if len(first) > 150:
            first = first[:147].rsplit(" ", 1)[0] + "…"
        rows.append(
            [
                f"**{term['term']}**",
                curated_terms["terms"][term["term"]]["match"],
                first,
                f"[`{term['anchor'][:8]}`]({glossary['url']}#{term['anchor']})",
            ]
        )
    lines.append(table(["Term", "Match", "Gist", "Anchor"], rows))
    lines += ["", "## Component index", ""]
    for doc in comp["docs"]:
        lines += [f"### {doc['title']} (`{doc['doc']}.md`)", "", doc["intro"], ""]
        facts = [
            f"- Page: [{doc['doc']}.md]({doc['docUrl']}); [catalog]({doc['catalogUrl']})",
            "- Design article: "
            + (
                ", ".join(f"[{u.split('m3.material.io/')[1]}]({u})" for u in doc["designArticles"])
                or "none"
            ),
            "- Source code: "
            + (
                f"[{doc['sourceTree'].split('/main/')[1]}]({doc['sourceTree']})"
                if doc["sourceTree"]
                else "none"
            ),
            "- Outline: " + ", ".join(h["text"] for h in doc["headings"] if h["level"] == 2),
        ]
        if doc["slots"]:
            facts.append("- Slots used in examples: " + ", ".join(f"`{s}`" for s in doc["slots"]))
        if not doc["elements"]:
            facts.append(
                "- Elements: "
                + ", ".join(f"`{t}`" for t in doc["usedTags"][:1])
                + " (no API section)"
            )
        if doc["tokens"]:
            facts.append(
                f"- CSS tokens ({len(doc['tokens'])}): "
                + ", ".join(f"`{t}`" for t in doc["tokens"])
            )
        if doc["accessibility"]:
            facts.append("- Accessibility: " + doc["accessibility"][:600])
        facts.append(
            f"- Images ({len(doc['images'])}): "
            + ", ".join(f"`{i['path']}`" for i in doc["images"])
        )
        lines += facts + [""]
        for el in doc["elements"]:
            lines += [f"#### `<{el['tag']}>` ({el['class']})", ""]
            lines.append(f"- Properties ({len(el['properties'])}): {props_line(el['properties'])}")
            if el["methods"]:
                lines.append("- Methods: " + ", ".join(f"`{m['name']}()`" for m in el["methods"]))
            if el["events"]:
                lines.append("- Events: " + ", ".join(f"`{e['name']}`" for e in el["events"]))
            lines.append("")
    (M3 / "SCRAP_INDEX.md").write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def main():
    checkout = Path(sys.argv[1])
    glossary = json.loads((DATA / "glossary.json").read_text(encoding="utf-8"))
    comp = json.loads((DATA / "components.json").read_text(encoding="utf-8"))
    curated_terms = json.loads((DATA / "curated_terms.json").read_text(encoding="utf-8"))
    curated_components = json.loads((DATA / "curated_components.json").read_text(encoding="utf-8"))
    missing = {t["term"] for t in glossary["terms"]} - set(curated_terms["terms"])
    extra = set(curated_terms["terms"]) - {t["term"] for t in glossary["terms"]}
    if missing or extra:
        raise SystemExit(f"curated terms differ from the glossary: {missing=} {extra=}")
    write_terminology(glossary, curated_terms, comp, checkout)
    write_components(comp, curated_components, checkout)
    write_index(glossary, comp, curated_terms)
    print("reports written to", M3)


if __name__ == "__main__":
    main()
