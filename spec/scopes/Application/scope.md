# Application

Application defines the top-level bootstrap scope for an OpenUI application.

Application-level bootstrap artifacts are often framework-dependent. This scope
captures the implementation-independent concepts and assets that a compliant
application can describe before a target generator chooses a concrete framework
shape.

## Objects

- [Routing](routing.scope.md): Application-level route definitions and route
  resolution behavior.
- [Navigation](navigation.scope.md): User-facing navigation structures that
  expose routes, pages, and views.
- [Tool bars](tool_bars.scope.md): Application-level command surfaces and
  action placement.
- [favicon.ico](favicon.scope.md): The application icon asset used for browser
  and shell identity.
- [index.html](index_html.scope.md): The application host document and static
  bootstrap metadata.

## Boundaries

The Application scope describes what bootstrap concepts and assets exist. It
does not require a specific workspace format, command-line tool, bundler,
router, component model, or generated file layout.

Application objects follow the shared [scope folder and attribute category rules](../scope.md).
