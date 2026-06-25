# OpenUI Specification

**Purpose:** Define the scope of the OpenUI specification as an implementation-independent contract for Web UI frameworks.

OpenUI is a technology-independent specification for a Web UI framework. It defines the required behavior, structure, terminology, and compliance rules for a compliant Web UI implementation, independent of any specific rendering technology, build tool, or framework. The canonical record is the machine-readable `openui.json` at the repository root; this README is the current prose entry point for the specification.

It serves application developers, designers and UX owners, framework maintainers, and generator/tooling authors, who all consume the same public contract.

## Spec folder structure

1. scopes folder: structured hierarchically, each scope is a folder or a markdown file, and each scope contains one or more objects.

- Application:
  - Application level bootstrap artifacts.
- Controls:
  - Native: Window resize, scroll bars, font size, color scheme
  - Dialog: A modal or non-modal dialog with a title, content, and actions.
- Pages:
  - "Dashboard": A predefined page layout for overview metrics and summary content; see the Angular Material [Dashboard Schematic](https://material.angular.dev/guide/schematics#dashboard-schematic) for a reference implementation pattern.
  - "Shell page": A page with no content with routing and navigation.
  - "Empty page": A page with no content and no routing or navigation.
- Views: A user facing view of bussiness objects.
  - Reports: read-only data including filtering, sorting, grouping, and pagination.
  - Forms: read-write data including validation, submission, and dirty state.

### Scope folder

Structured hierarchicaly, named in Pascal Case for folders and snake case for files of the object name, each 'level' is a scope and is structured in one of two ways:

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
- PascalCase virtual/spec names, e.g. "MyComponent". PascalCase names do not require a concrete tag-name mapping in this document.

Types are categorized to these groups:

- html tags
- Framework specific tags: for example Angular Material
  - Angular Material CDK directives: <table cdk\*\/>
  - Angular Material tags: mat-\*
- Other names: either native names in kebab-case or PascalCase virtual/spec names, e.g. "app-_", "my-_", "custom-\*"

### attributes - "attrs" field

Tag attributes as key-value pairs, or attribute with no value will appear as having null value.
Both key and value should align with the framework's attribute naming convention, or the html standard.

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

(* Attributes: key-value pairs, values are strings or null *)
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
- **Attributes field:** Key-value pairs where values are strings (for bindings, directives, properties) or null (for valueless attributes)
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
