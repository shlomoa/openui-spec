# Application

Application defines the top-level bootstrap scope for an OpenUI application.

Application-level bootstrap artifacts are often framework-dependent. This scope
captures the implementation-independent concepts and assets that a compliant
application can describe before a target generator chooses a concrete framework
shape.

## Objects

- [Routing](routing.scope.md): Application-level route definitions and route
  resolution behavior.
- [Route](route.scope.md): A location pattern resolving to content or a redirect.
- [Navigation](navigation.scope.md): User-facing navigation structures that
  expose routes, pages, and views.
- [Navigation item](nav_item.scope.md): A labelled route destination.
- [Navigation group](nav_group.scope.md): A labelled hierarchical grouping of
  navigation entries.
- [Tool bars](tool_bars.scope.md): Application-level command surfaces and
  action placement.
- [Tool bar row](tool_bar_row.scope.md): An ordered collection of toolbar actions.
- [Tool action](tool_action.scope.md): A labelled command available from a toolbar.
- [favicon.ico](favicon.scope.md): The application icon asset used for browser
  and shell identity.
- [index.html](index_html.scope.md): The application host document and static
  bootstrap metadata.

## Boundaries

The Application scope describes what bootstrap concepts and assets exist. It
does not require a specific workspace format, command-line tool, bundler,
router, component model, or generated file layout.

## Ownership and placement

`Route` is the sole owner of a route path, its resolved page/content target, title,
redirect, and access requirement. `NavItem` is the sole owner of the user-facing
navigation label and icon. Pages remain content-only and do not duplicate route,
navigation, or access attributes. Access values express application policy;
authentication and authorization mechanisms remain implementation details.

An application defines each routing or navigation model once. It may place a
`Routing` or `Navigation` child directly under the Application root, or under its
single `ShellPage` when the shell presents it, but it MUST NOT define the same
model in both places. The two placements use the same contracts; neither creates
a second source of route paths, navigation labels, icons, or access requirements.

The application document title belongs to the `index.html` `[title]` attribute,
not to the Application folder scope or a toolbar. A concrete toolbar child uses
the `ToolBar` literal; `ToolBars` is catalog-scope metadata only.

Application objects follow the shared [scope folder and attribute category rules](../scope.md).
