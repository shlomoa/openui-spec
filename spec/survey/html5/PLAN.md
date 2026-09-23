# HTML Standard survey plan

Source: [HTML Living Standard](https://html.spec.whatwg.org/multipage/).

1. **Define the scope and baseline**

   - **1.1** Record the survey date and the specification's commit snapshot.
   - **1.2** Include specification pages, sections, elements, attributes, interfaces, members, events, named concepts, and algorithms.
   - **1.3** Record external specifications as dependencies; do not recursively survey them.

2. **Build the source inventory**

   - **2.1** Enumerate pages and sections from the full table of contents.
   - **2.2** Cross-check objects against the specification's indexes.
   - **2.3** Maintain a coverage checklist recording each source's category and research status.
   - **2.4** Record exclusions and unresolved classifications explicitly.

3. **Establish categories and subcategories**

   - **3.1** Start with the specification's major subject areas.
   - **3.2** Subdivide large areas—for example, elements into metadata, document structure, text, links, media, tables, forms, and scripting.
   - **3.3** Assign each object one primary category.
   - **3.4** Use cross-references for objects relevant to additional categories.
   - **3.5** Keep survey categories distinct from HTML's formally defined content categories.

4. **Define abstract object names**

   - **4.1** Preserve the exact HTML identifier in the first field.
   - **4.2** Assign a consistent, technology-neutral concept name in the second field.
   - **4.3** Qualify ambiguous identifiers by their owner, such as `HTMLInputElement.value`.
   - **4.4** Treat abstract names as survey interpretations, not official WHATWG terminology.
   - **4.5** Maintain a shared naming glossary.

5. **Research and write category files**

   - **5.1** Create one Markdown file per category or subcategory.
   - **5.2** Begin each file with its scope, parent category, baseline, and research status.
   - **5.3** Include a table of objects belonging directly to that category.
   - **5.4** Include a separate table for each immediate subcategory, linking to its authoritative file.
   - **5.5** Keep full object descriptions in their owning files to avoid duplicated definitions.
   - **5.6** Use exactly these four columns in every object and subcategory table:

   | Object name in HTML5 | Abstract object name | Object description | Links to the sources |
   |---|---|---|---|
   | Exact identifier or official section name | Consistent conceptual name | Concise meaning, purpose, important constraints, and status | Direct specification links with section anchors |

   Retain "HTML5" in the requested column heading, while explaining that the research baseline is the HTML Living Standard.

6. **Validate the survey**

   - **6.1** Reconcile category files against the source inventory and indexes.
   - **6.2** Ensure every inventoried item is classified or has a documented reason for exclusion.
   - **6.3** Check that all tables contain exactly four fields.
   - **6.4** Verify source links, local links, and section anchors.
   - **6.5** Review abstract names for consistency and descriptions for fidelity.
   - **6.6** Flag unresolved interpretations rather than inventing classifications.

7. **Deliver the documentation**

   - **7.1** An entry-point README explaining scope, navigation, and methodology.
   - **7.2** Category and subcategory Markdown files.
   - **7.3** A shared abstract-name glossary.
   - **7.4** A coverage checklist and unresolved-items record.
   - **7.5** Baseline and update instructions for future specification changes.

**Completion criterion:** every in-scope inventory item has a documented classification, a sourced description, and a consistent abstract name; all remaining gaps are explicitly recorded.
