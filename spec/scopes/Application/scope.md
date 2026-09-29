# Application

Application defines the top-level bootstrap scope for an OpenUI application.

Application-level bootstrap artifacts are often framework-dependent. This scope
captures the implementation-independent concepts and assets that a compliant
application can describe before a target generator chooses a concrete framework
shape.

## Objects

- [Routing](routing.scope.md): How an application resolves navigation intents or
  locations to application content.
- [Route](route.scope.md): A location pattern mapped to application content or
  redirected to another route.
- [Navigation](navigation.scope.md): User-facing structures for moving between
  application routes, pages, views, and major work areas.
- [Navigation item](nav_item.scope.md): One labelled application route presented
  as a user-selectable destination.
- [Navigation group](nav_group.scope.md): A labelled group that organizes
  related navigation destinations.
- [Tool bars](tool_bars.scope.md): Application-level command surfaces for
  frequently used actions.
- [Tool bar row](tool_bar_row.scope.md): An ordered row of command actions
  within a tool bar.
- [Tool action](tool_action.scope.md): A labelled application command exposed
  from a tool bar.
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

The application document title belongs to the `index.html` `uses.title` attribute,
not to the Application folder scope or a toolbar. A concrete toolbar child uses
the `ToolBar` literal; `ToolBars` is catalog-scope metadata only.

Application objects follow the shared [scope folder and attribute category rules](../scope.md).
