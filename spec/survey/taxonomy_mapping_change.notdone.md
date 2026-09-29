# Taxonomy mapping change: not done

Content of [`taxonomy_mapping_change.done.md`](taxonomy_mapping_change.done.md#summary) that is not applied yet.

## Scope Purposes (new content)

A13 and A14 are applied to the taxonomy mapping, but the Purposes of their scopes do not list them yet:

| #   | Add       | Spec object                                               | Level | Section: subcategory                               | Evidence                                                                                                                                                                                                                                                              | Source URL                                                             |
| --- | --------- | --------------------------------------------------------- | ----- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| A13 | Tree      | [List](../scopes/Widgets/list.scope.md#purpose)           | Alias | Output elements: Collections and data presentation | [OpenUI5 List](openui5/taxonomy_mapping.md#widgetslistscopemd) (`sap.m.StandardTreeItem`, `sap.m.CustomTreeItem`); [OpenUI5 Navigation widgets](openui5/taxonomy_mapping.md#widgetsnavigation_widgetsscopemd) (`sap.m.Tree`, built on the list base `sap.m.ListBase`) | [WAI-ARIA 1.2: tree](https://www.w3.org/TR/wai-aria-1.2/#tree)         |
| A14 | Tree grid | [Data grid](../scopes/Widgets/data_grid.scope.md#purpose) | Alias | Output elements: Collections and data presentation | [OpenUI5 Data grid](openui5/taxonomy_mapping.md#widgetsdata_gridscopemd) (`sap.ui.table.TreeTable`)                                                                                                                                                                   | [WAI-ARIA 1.2: treegrid](https://www.w3.org/TR/wai-aria-1.2/#treegrid) |

- **Tree** (A13): add to the [List](../scopes/Widgets/list.scope.md#purpose) Purpose.
- **Tree grid** (A14): add to the [Data grid](../scopes/Widgets/data_grid.scope.md#purpose) Purpose.

## Deferred

- **Per-framework names** (for example Qt `QComboBox` for Dropdown): they belong in the alias
  table (W1 step 9.9) and the cross-source matrix (W0 task 5), not in the mapping.
- **Qt "Enhance" rows** (71): they ask for richer contracts of existing scopes, not a
  different mapping. They go to W0 task 6 and W6 task 25.
