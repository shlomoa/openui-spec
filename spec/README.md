# OpenUI Specification

**Purpose:** Define the scope of the OpenUI specification as an implementation-independent contract derived from OpenUI5 public metadata and library declarations.

OpenUI is a technology-independent specification for a Web UI framework. It defines the required behavior, structure, terminology, and compliance rules for a compliant Web UI implementation, independent of any specific rendering technology, build tool, or framework. The canonical record is the machine-readable `openui.json` (at the repository root); the section documents listed below are its synchronized prose view.

It serves application developers, designers and UX owners, framework maintainers, and generator/tooling authors, who all consume the same public contract.

## Spec structure

It has two manifests:
1. openui.json: the main manifest, which contains the complete spec.
  - Each scope is a key in the JSON object, and each scope has a value that is either:
    - an object with child scopes, or
    - an array of objects with no child scopes.
2. scopes:
  - application: application level bootstrap artifacts.
  - Controls: 
    - Native: Window resize, scroll bars, font size, color scheme
    - Dialog: A modal or non-modal dialog with a title, content, and actions.
  - Predefined pages:
    - "Dashboard" see [Dashboard Schematic] for more details.
    - "Shell page": A page with no content with routing and navigation.
    - "Empty page": A page with no content and no routing or navigation.
  - views: A user facing view of bussiness objects.
    - Reports: read-only data including filtering, sorting, grouping, and pagination.
    - Forms: read-write data including validation, submission, and dirty state.

## Spec format

## Naming conventions

the "id" field is a unique identifier for each element, and it must be a camelCase alphanumeric  string.

### types - "type" field

Types are tag names either:
- following the kebab-case naming convention, e.g. "my-component".
- Having an alias that maps a PascalCase name to a kebab-case tag name, e.g. "MyComponent" maps to "my-component".

Types are categorized to these groups:
- html tags
- Framework specific tags: for example Angular Material
  - Angular Material CDK directives: <table cdk*\/>
  - Angular Material tags: mat-* 
- Other names: either native names in kebab-case or included in a PascalCase mapping to kebab-case, e.g. "app-*", "my-*", "custom-*"

### attributes - "attrs" field

Tag attributes as key-value pairs, or attribute with no value will appear as having null value.
Both key and value should align with the framework's attribute naming convention, or the html standard.

### EBNF notation

```ebnf
(* OpenUI specification in EBNF notation *)

openui-document = ui-element ;

ui-element = "{" 
  id-field ","
  type-field ","
  [ attrs-field "," ]
  [ children-field [ "," ] ]
"}" ;

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
- **ID field:** Must be a camelCase alphanumeric string (starts with lowercase letter, can contain uppercase letters and digits)
- **Type field:** Can be HTML tag names, kebab-case names (e.g., `mat-date-range-input`), or PascalCase names (e.g., `MainPage`)
- **Attributes field:** Key-value pairs where values are strings (for bindings, directives, properties) or null (for valueless attributes)
- **Children field:** Array of UI elements forming a hierarchical tree structure
- **No loose properties:** All properties must be contained within the `attrs` object


## openui.json examples

### Example: Main page with a date range input
```json
{
  "id": "mainpage",
  "type": "MainPage",
  "attrs": {
    "size": "1960x1080",
    "text": "App navigation demo",
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
      ],
    }
  ]
}
```
## Scope folder

Structured hierarchicaly, named in snake case of the object name, each 'level' is a scope and is structured in one of two ways:
- If it has child objects:
  - scope.md
  - Every child scope will have the same structure (either .md file or a folder).
- If it has no child objects:
  - <object_name>.scope.md object-name will be a snake case version of the object name, e.g. "myObject" becomes "my_object.scope.md".


## How to read this spec

The specification defines **what** a compliant Web UI implementation must provide, without saying **how** it is implemented. For example:

### Example: Hierarchical structure of a page

### Example: Data bnding

### Example: User interaction model

## Sections - To be reviewed

| #   | Section                     | Purpose                                                      | File                               |
| --- | --------------------------- | ------------------------------------------------------------ | ---------------------------------- |
| 01  | Introduction                | Purpose, scope, non-goals, terminology                       | `01-introduction.md`               |
| 02  | Design Goals                | What the UI framework must enable                            | `02-design-goals.md`               |
| 03  | Design Principles           | Consistency, accessibility, responsiveness, composability    | `03-design-principles.md`          |
| 04  | Target Users                | App developers, designers, UX owners, framework maintainers  | `04-target-users.md`               |
| 05  | UI Concept Model            | Pages, layouts, regions, components, actions, forms, dialogs | `05-ui-concept-model.md`           |
| 06  | Application Structure       | Navigation, routing, shell, page hierarchy                   | `06-application-structure.md`      |
| 07  | Layout System               | Grid, spacing, breakpoints, responsive behavior              | `07-layout-system.md`              |
| 08  | Component Model             | Component categories, contracts, inputs/outputs, states      | `08-component-model.md`            |
| 09  | Interaction Model           | Events, actions, gestures, keyboard behavior                 | `09-interaction-model.md`          |
| 10  | State Model                 | Local state, page state, global UI state, persistence rules  | `10-state-model.md`                |
| 11  | Data Binding Model          | Read-only data, editable data, validation, async loading     | `11-data-binding-model.md`         |
| 12  | Form Model                  | Fields, validation, errors, submission, dirty state          | `12-form-model.md`                 |
| 13  | Navigation Model            | Routes, breadcrumbs, tabs, deep links, guards                | `13-navigation-model.md`           |
| 14  | Feedback Model              | Loading, success, warning, error, empty states               | `14-feedback-model.md`             |
| 15  | Accessibility Model         | Keyboard, focus, ARIA roles, contrast, screen readers        | `15-accessibility-model.md`        |
| 16  | Theming / Design Tokens     | Colors, typography, spacing, elevation, density              | `16-theming-design-tokens.md`      |
| 17  | Internationalization        | RTL/LTR, locale, formatting, translations                    | `17-internationalization.md`       |
| 18  | Security / Privacy UI Rules | Masking, confirmation, permissions, sensitive data           | `18-security-privacy-ui-rules.md`  |
| 19  | Performance Requirements    | Render latency, loading, virtualization, caching             | `19-performance-requirements.md`   |
| 20  | Extension Model             | Custom components, plugins, slots, hooks                     | `20-extension-model.md`            |
| 21  | Compliance Rules            | What every implementation must satisfy                       | `21-compliance-rules.md`           |
| 22  | Test & Acceptance Criteria  | Behavioral, visual, accessibility, responsive tests          | `22-test-acceptance-criteria.md`   |
| 23  | Reference Examples          | Abstract examples, not framework-specific code               | `23-reference-examples.md`         |
| 24  | Angular Material Generator  | Angular Material reference generator (executable consumer)   | `24-angular-material-generator.md` |
