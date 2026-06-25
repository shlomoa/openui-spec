# OpenUI Specification

**Purpose:** Define the scope of the OpenUI specification as an implementation-independent contract for Web UI frameworks.

OpenUI is a technology-independent specification for a Web UI framework. It defines the required behavior, structure, terminology, and compliance rules for a compliant Web UI implementation, independent of any specific rendering technology, build tool, or framework. The canonical record is the machine-readable `openui.json` at the repository root; this README is the current prose entry point for the specification.

It serves application developers, designers and UX owners, framework maintainers, and generator/tooling authors, who all consume the same public contract.

## Spec folder structure

1. scopes folder: structured hierarchically, each scope is a folder or a markdown file, and each scope contains one or more objects.

- Application:
  - Application level bootstrap artifacts are mostly framework dependent.
  - Non-framework specifics include abstract notions like Routing, Navigation, Tool bars and actual assets like favicon.ico & index.html files.
    - See the [Create a workspace and initial application](https://angular.dev/tools/cli/setup-local#create-a-workspace-and-initial-application) for Angular Material reference implementation.
    - See the source code of the `ng new` command in the [Angular CLI repository](https://github.com/angular/angular-cli/tree/main/packages/angular/cli/src/commands/new)
- Controls:
  - Native: Scroll bars, font size type and family, color schemes, etc.
    - Provided in html, css, and js files.
    - Usually standard and handled by the framework and the browser.
- Behaviors: A set of behaviors that can be applied to pages, views, and widgets.
  - Drag and drop: A behavior that allows users to drag and drop elements within a page or view.
  - Resizable: A behavior that allows users to resize elements within a page or view.
  - Collapsible: A behavior that allows users to collapse and expand elements within a page or view.
- Pages:
  - "Dashboard": A predefined page layout for overview metrics and summary content; see the Angular Material [Dashboard Schematic](https://material.angular.dev/guide/schematics#dashboard-schematic) for a reference implementation pattern.
  - "Shell page": A page with no content with routing and navigation.
  - "Empty page": A page with no content and no routing or navigation.
- Views: A user facing view of business objects.
  - Reports: read-only data including filtering, sorting, grouping, and pagination.
  - Forms: read-write data including validation, submission, and dirty state.
- Containers: A layout container that arranges its children in a specific layout.
  - Grid: A grid layout that arranges its children in rows and columns.
  - Expandable panels: A collapsible panel that can be expanded or collapsed to show or hide content.
  - Tabs: A tabbed interface that allows users to switch between different views or content.
- Widgets: A reusable component that can be used in multiple pages or views.
  - Common widgets include:
    - Charts: A visual representation of data, including bar charts, line charts, pie charts, etc.
    - Tables: A tabular representation of data, including sorting, filtering, and pagination.
    - Lists: A list of items, including sorting, filtering, and pagination.
  - More complex widgets may include:
    - Date/Time pickers: A calendar-based date and time selection component.
    - Stepper: A component that guides users through a multi-step process.
    - Dialog: A modal or non-modal dialog with a title, content, and actions.

### Scope folder

Structured hierarchically, named in Pascal Case for folders and snake case for files of the object name, each 'level' is a scope and is structured in one of two ways:

- If it has child objects:
  - scope.md
  - Every child scope will have the same structure (either .md file or a folder).
- If it has no child objects:
  - <object_name>.scope.md object-name will be a snake case version of the object name, e.g. "myObject" becomes "my_object.scope.md".

---

## Spec format

### Canonical root document

The repository root `openui.json` MUST use these exact top-level root values:

- `"id": "root"`
- `"type": "html"`
- `"version": "0.0.1"`

### Naming conventions

the "id" field is a unique identifier for each element, and it must be a camelCase alphanumeric string.

### types - "type" field

Types are names that are either:

- following the kebab-case naming convention, e.g. "my-component".
- PascalCase virtual/spec names, e.g. "MyComponent". PascalCase names do not require a concrete tag name in this document.

Types are categorized to these groups:

- html tags
- Framework specific tags: for example Angular Material
  - Angular Material CDK directives: <table cdk\*\/>
  - Angular Material tags: mat-\*
- Other names: either native names in kebab-case or PascalCase virtual/spec names, e.g. "app-_", "my-_", "custom-\*"

### attributes - "attrs" field

`attrs` contains all non-hierarchical object configuration as key-value pairs.
An attribute with no value appears as having `null` value. Attribute keys and
values should align with the selected framework's attribute naming convention or
with the HTML standard when targeting native HTML.

Each object in the scopes may declare one or more attribute categories:

- **Uses:** input attributes. These provide data, configuration, state, or
  references consumed by the object.
- **Produces:** output attributes. These expose events, emitted values,
  notifications, or callbacks produced by the object.
- **Behaves:** behavior attributes. These describe actions or side effects, such
  as setting another attribute value, running a callback on a button click, or
  invoking target-framework logic. Behaviors generalize the notion of outputs:
  they use output-style binding syntax but describe what the object does rather
  than only what it emits.

The category is represented by the attribute key syntax, not by adding loose
properties outside `attrs`.

For a framework-specific target such as Angular Material:

- `[var1]` represents an input binding named `var1`.
- `(var2)` represents an output binding named `var2`.
- behavior bindings use the same parenthesized form as outputs, because a
  behavior is handled as output-triggered target logic.

Attribute values are strings or `null`. String values may be literals, binding
expressions, JavaScript code snippets, or function calls, depending on the target
framework. The OpenUI specification treats those values as target-language
expressions; generators may validate or transform them for a specific framework,
but the base JSON format does not execute them.

### EBNF notation

```ebnf
(* OpenUI specification in EBNF notation *)

openui-document = "{"
  [ version-field "," ]
  id-field ","
  type-field ","
  [ attrs-field "," ]
  [ children-field [ "," ] ]
"}" ;

ui-element = "{"
  id-field ","
  type-field ","
  [ attrs-field "," ]
  [ children-field [ "," ] ]
"}" ;

version-field = '"version"' ":" version-value ;
version-value = '"' version-string '"' ;
version-string = digit+ "." digit+ "." digit+ ;

id-field = '"id"' ":" id-value ;
type-field = '"type"' ":" type-value ;
attrs-field = '"attrs"' ":" "{" [ attribute-list ] "}" ;
children-field = '"children"' ":" "[" [ ui-element-list ] "]" ;

(* ID: camelCase alphanumeric string *)
id-value = '"' lowercase-letter { id-char } '"' ;
id-char = lowercase-letter | uppercase-letter | digit ;
lowercase-letter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" ;
uppercase-letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" ;

(* Type: html tags, kebab-case, or PascalCase *)
type-value = '"' type-name '"' ;
type-name = html-tag | kebab-case-name | pascal-case-name ;
html-tag = "div" | "span" | "input" | "button" | "table" | ? other standard html elements ? ;
kebab-case-name = lowercase-letter { lowercase-letter | digit | "-" } ;
pascal-case-name = uppercase-letter { letter | digit } [ "-" lowercase-letter { lowercase-letter | digit } ] ;
uppercase-letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" ;
letter = lowercase-letter | uppercase-letter ;

(* Attributes: key-value pairs. Attribute key syntax identifies input,
   output, or behavior categories. Values are strings or null. *)
attribute-list = attribute-pair { "," attribute-pair } [ "," ] ;
attribute-pair = attr-key ":" attr-value ;
attr-key = '"' characters '"' ;
attr-value = string | null ;

ui-element-list = ui-element { "," ui-element } [ "," ] ;

string = '"' characters '"' ;
null = "null" ;

characters = { character } ;
character = ? any unicode character except quotes and backslash ? | escaped-character ;
escaped-character = "\" ( '"' | "\" | "/" | "b" | "f" | "n" | "r" | "t" | "u" hex hex hex hex ) ;
hex = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "b" | "c" | "d" | "e" | "f" | "A" | "B" | "C" | "D" | "E" | "F" ;
digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
```

### Syntax rules

- **Version field (top-level only):** Optional semantic version string (e.g., "1.0.0") identifying the spec version
- **ID field:** Must be a camelCase alphanumeric string (starts with lowercase letter, can contain uppercase letters and digits)
- **Type field:** Can be HTML tag names, kebab-case names (e.g., `mat-date-range-input`), or PascalCase names (e.g., `MainPage`)
- **Attributes field:** Key-value pairs where values are strings or null. Attribute key syntax identifies input, output, and behavior categories; all such categories must stay inside the `attrs` object.
- **Children field:** Array of UI elements forming a hierarchical tree structure
- **No loose properties:** All properties must be contained within the `attrs` object

## app.json examples

### Example: Main page with a date range input

```json
{
  "id": "mainpage",
  "version": "1.0.0",
  "type": "MainPage",
  "attrs": {
    "size": "1960x1080",
    "text": "App navigation demo"
  },
  "children": [
    {
      "id": "dateRangeInput",
      "type": "mat-date-range-input",
      "attrs": {
        "[formGroup]": "\"campaignTwo\"",
        "[rangePicker]": "\"campaignTwoPicker\"",
        "[comparisonStart]": "\"campaignOne.value.start\"",
        "[comparisonEnd]": "\"campaignOne.value.end\""
      },
      "children": [
        {
          "id": "startDateInput",
          "type": "input",
          "attrs": {
            "matStartDate": null,
            "placeholder": "\"Start date\"",
            "formControlName": "\"start\""
          }
        },
        {
          "id": "endDateInput",
          "type": "input",
          "attrs": {
            "matEndDate": null,
            "placeholder": "\"End date\"",
            "formControlName": "\"end\""
          }
        }
      ]
    }
  ]
}
```

---

## How to read this spec

The specification defines **what** a compliant Web UI implementation must provide, without saying **how** it is implemented. For example:

<!--
### Example: Hierarchical structure of a page

### Example: Data binding

### Example: User interaction model
-->
