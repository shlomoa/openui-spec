# Scopes

The `scopes` folder is the hierarchical source for OpenUI scope objects. Each top-level folder is a scope, and each child object is either another scope folder or a snake_case `*.scope.md` leaf file.

## Top-level scopes

- [Application](Application/scope.md): application-level bootstrap artifacts and implementation-independent concepts such as routing, navigation, tool bars, `favicon.ico`, and `index.html`.
- [Controls](Controls/scope.md): browser, framework, or runtime-provided native controls and presentation capabilities.
- [Behaviors](Behaviors/scope.md): reusable behaviors that can be applied to pages, views, containers, and widgets.
- [Pages](Pages/scope.md): predefined page-level layouts and page shells.
- [Views](Views/scope.md): user-facing views of business objects and workflows.
- [Containers](Containers/scope.md): layout containers that arrange child content.
- [Widgets](Widgets/scope.md): reusable components such as charts, tables, lists, date/time pickers, steppers, and dialogs.

## Folder and file convention

A scope with child objects is represented as a folder containing:

- `scope.md` for the parent scope description.
- child scope folders or snake_case `*.scope.md` leaf files.

A leaf object with no child objects is represented as:

- `<object_name>.scope.md`, where `<object_name>` is the snake_case object name.

Top-level scope folder names use Pascal Case. Leaf filenames use snake_case.

## Object serialization rules

Scope objects follow the JSON shape defined in `../README.md`:

- `id` is a camelCase alphanumeric identifier.
- `type` is an HTML tag, kebab-case name, or PascalCase virtual/spec name.
- `attrs` contains all non-hierarchical configuration.
- `children` contains nested UI elements.
- No loose object properties are allowed outside `attrs` except the structural fields defined by the spec.

## Attribute categories

Scope object attributes are represented through `attrs` key syntax:

- **Uses:** input attributes. These provide data, configuration, state, or references consumed by the object.
- **Produces:** output attributes. These expose events, emitted values, notifications, or callbacks produced by the object.
- **Behaves:** behavior attributes. These describe actions or side effects, such as setting another attribute value, running a callback, or invoking target-framework logic.

For Angular Material examples, `[name]` represents a Uses/input binding and `(name)` represents a Produces/output or Behaves/action binding. The base OpenUI scope model records those keys as strings and does not execute their values.
