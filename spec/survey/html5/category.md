# HTML Standard survey: categories

[Survey README](README.md) · [Taxonomy mapping](taxonomy_mapping.md)

The survey follows the HTML Standard's numbered chapters. Each chapter is a category, and each second-level section is a subcategory. Deeper sections and definitions inherit the category of their closest second-level section. This is an editorial research taxonomy, not HTML's normative content categories. The authoritative map is [CATEGORIES.md](inventory/CATEGORIES.md); counts come from the chapter inventory files.

## Categories

| Category                                                                                                 | Subcategories | Sections | Definition occurrences | Inventory file                                                                 |
| -------------------------------------------------------------------------------------------------------- | ------------: | -------: | ---------------------: | ------------------------------------------------------------------------------ |
| [Introduction](inventory/CATEGORIES.md#introduction)                                                     |            12 |       23 |                      3 | [01-introduction.md](inventory/inventory/01-introduction.md)                   |
| [Common infrastructure](inventory/CATEGORIES.md#common-infrastructure)                                   |             7 |       78 |                   1917 | [02-common-infrastructure.md](inventory/inventory/02-common-infrastructure.md) |
| [Documents and shared element semantics](inventory/CATEGORIES.md#documents-and-shared-element-semantics) |             2 |       41 |                    168 | [03-documents.md](inventory/inventory/03-documents.md)                         |
| [HTML elements](inventory/CATEGORIES.md#html-elements)                                                   |            16 |      418 |                   2230 | [04-elements.md](inventory/inventory/04-elements.md)                           |
| [Microdata](inventory/CATEGORIES.md#microdata)                                                           |             4 |       25 |                    146 | [05-microdata.md](inventory/inventory/05-microdata.md)                         |
| [User interaction](inventory/CATEGORIES.md#user-interaction)                                             |            12 |       61 |                    378 | [06-user-interaction.md](inventory/inventory/06-user-interaction.md)           |
| [Page loading and navigation](inventory/CATEGORIES.md#page-loading-and-navigation)                       |             9 |      154 |                    911 | [07-page-loading.md](inventory/inventory/07-page-loading.md)                   |
| [Web application APIs](inventory/CATEGORIES.md#web-application-apis)                                     |            12 |      106 |                    650 | [08-web-application-apis.md](inventory/inventory/08-web-application-apis.md)   |
| [Communication](inventory/CATEGORIES.md#communication)                                                   |             5 |       29 |                     83 | [09-communication.md](inventory/inventory/09-communication.md)                 |
| [Web workers](inventory/CATEGORIES.md#web-workers)                                                       |             3 |       33 |                     82 | [10-workers.md](inventory/inventory/10-workers.md)                             |
| [Worklets](inventory/CATEGORIES.md#worklets)                                                             |             3 |       15 |                     23 | [11-worklets.md](inventory/inventory/11-worklets.md)                           |
| [Web storage](inventory/CATEGORIES.md#web-storage)                                                       |             4 |       14 |                     25 | [12-storage.md](inventory/inventory/12-storage.md)                             |
| [HTML syntax](inventory/CATEGORIES.md#html-syntax)                                                       |             5 |      156 |                    330 | [13-html-syntax.md](inventory/inventory/13-html-syntax.md)                     |
| [XML syntax](inventory/CATEGORIES.md#xml-syntax)                                                         |             4 |        5 |                      8 | [14-xml-syntax.md](inventory/inventory/14-xml-syntax.md)                       |
| [Rendering](inventory/CATEGORIES.md#rendering)                                                           |             9 |       47 |                     49 | [15-rendering.md](inventory/inventory/15-rendering.md)                         |
| [Obsolete features — scope review](inventory/CATEGORIES.md#obsolete-features--scope-review)              |             3 |        8 |                    348 | [16-obsolete-scope-review.md](inventory/inventory/16-obsolete-scope-review.md) |
| [IANA considerations](inventory/CATEGORIES.md#iana-considerations)                                       |             8 |        9 |                      8 | [17-iana.md](inventory/inventory/17-iana.md)                                   |
| [Indexes and supporting material](inventory/CATEGORIES.md#indexes-and-supporting-material)               |             0 |       12 |                     68 | [18-support.md](inventory/inventory/18-support.md)                             |

Totals: 17 chapters plus supporting material, 118 second-level subcategories, 1,234 table-of-contents sections and 7,427 definition occurrences, from 60 multipage source files. See the [coverage checklist](inventory/COVERAGE.md).

## Subcategories

- **Introduction:** 1.1 Where does this specification fit?; 1.2 Is this HTML5?; 1.3 Background; 1.4 Audience; 1.5 Scope; 1.6 History; 1.7 Design notes; 1.8 HTML vs XML syntax; 1.9 Structure of this specification; 1.10 A quick introduction to HTML; 1.11 Conformance requirements for authors; 1.12 Suggested reading.
- **Common infrastructure:** 2.1 Terminology; 2.2 Policy-controlled features; 2.3 Common microsyntaxes; 2.4 URLs; 2.5 Fetching resources; 2.6 Common DOM interfaces; 2.7 Safe passing of structured data.
- **Documents and shared element semantics:** 3.1 Documents; 3.2 Elements.
- **HTML elements:** 4.1 The document element; 4.2 Document metadata; 4.3 Sections; 4.4 Grouping content; 4.5 Text-level semantics; 4.6 Links; 4.7 Edits; 4.8 Embedded content; 4.9 Tabular data; 4.10 Forms; 4.11 Interactive elements; 4.12 Scripting; 4.13 Custom elements; 4.14 Common idioms without dedicated elements; 4.15 Disabled elements; 4.16 Matching HTML elements using selectors and CSS.
- **Microdata:** 5.1 Introduction; 5.2 Encoding microdata; 5.3 Sample microdata vocabularies; 5.4 Converting HTML to other formats.
- **User interaction:** 6.1 The hidden attribute; 6.2 Page visibility; 6.3 Inert subtrees; 6.4 Tracking user activation; 6.5 Activation behavior of elements; 6.6 Focus; 6.7 Assigning keyboard shortcuts; 6.8 Editing; 6.9 Find-in-page; 6.10 Close requests and close watchers; 6.11 Drag and drop; 6.12 The popover attribute.
- **Page loading and navigation:** 7.1 Supporting concepts; 7.2 APIs related to navigation and session history; 7.3 Infrastructure for sequences of documents; 7.4 Navigation and session history; 7.5 Document lifecycle; 7.6 Speculative loading; 7.7 The &#96;X-Frame-Options&#96; header; 7.8 The &#96;Refresh&#96; header; 7.9 Browser user interface considerations.
- **Web application APIs:** 8.1 Scripting; 8.2 The WindowOrWorkerGlobalScope mixin; 8.3 Base64 utility methods; 8.4 Dynamic markup insertion; 8.5 DOM parsing and serialization APIs; 8.6 HTML sanitization; 8.7 Timers; 8.8 Microtask queuing; 8.9 User prompts; 8.10 System state and capabilities; 8.11 Images; 8.12 Animation frames.
- **Communication:** 9.1 The MessageEvent interface; 9.2 Server-sent events; 9.3 Cross-document messaging; 9.4 Channel messaging; 9.5 Broadcasting to other browsing contexts.
- **Web workers:** 10.1 Introduction; 10.2 Infrastructure; 10.3 APIs available to workers.
- **Worklets:** 11.1 Introduction; 11.2 Examples; 11.3 Infrastructure.
- **Web storage:** 12.1 Introduction; 12.2 The API; 12.3 Privacy; 12.4 Security.
- **HTML syntax:** 13.1 Writing HTML documents; 13.2 Parsing HTML documents; 13.3 Serializing HTML fragments; 13.4 Parsing HTML fragments; 13.5 Named character references.
- **XML syntax:** 14.1 Writing documents in the XML syntax; 14.2 Parsing XML documents; 14.3 Serializing XML fragments; 14.4 Parsing XML fragments.
- **Rendering:** 15.1 Introduction; 15.2 The CSS user agent style sheet and presentational hints; 15.3 Non-replaced elements; 15.4 Replaced elements; 15.5 Widgets; 15.6 Frames and framesets; 15.7 Interactive media; 15.8 Print media; 15.9 Unstyled XML documents.
- **Obsolete features — scope review:** 16.1 Obsolete but conforming features; 16.2 Non-conforming features; 16.3 Requirements for implementations.
- **IANA considerations:** 17.1 text/html; 17.2 multipart/x-mixed-replace; 17.3 application/xhtml+xml; 17.4 text/ping; 17.5 application/microdata+json; 17.6 application/speculationrules+json; 17.7 text/event-stream; 17.8 web+ scheme prefix.
