# Views — OpenUI5 survey

Scope: [`scopes/Views/scope.md`](../../../scopes/Views/scope.md). Full survey
of the Views category against the pinned OpenUI5 commit — 5 matched
classes, all under Form; Report has no OpenUI5 class match.

## Form

| UI5 object | Abstract object | Description | Sources |
| --- | --- | --- | --- |
| `sap.ui.layout.form.Form` | [Form](../../../scopes/Views/form.scope.md) | Structural control that arranges labels and fields into groups and rows via nested `FormContainer`/`FormElement` children; it delegates the actual rendering to a pluggable `FormLayout` so the same structure can adapt responsively. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.layout/src/sap/ui/layout/form/Form.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.layout.form.Form) |
| `sap.ui.layout.form.FormContainer` | [Form](../../../scopes/Views/form.scope.md) | Represents one group (section) within a `Form`, holding a collection of `FormElement` rows; its visual rendering is likewise handled by the layout assigned to the parent `Form` rather than by the container itself. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.layout/src/sap/ui/layout/form/FormContainer.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.layout.form.FormContainer) |
| `sap.ui.layout.form.FormElement` | [Form](../../../scopes/Views/form.scope.md) | Represents a single row inside a `FormContainer`, pairing one label with one or more associated field controls that belong together. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.layout/src/sap/ui/layout/form/FormElement.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.layout.form.FormElement) |
| `sap.ui.layout.form.SemanticFormElement` | [Form](../../../scopes/Views/form.scope.md) | Specialized `FormElement` for grouping semantically related fields (e.g. parts of an address), rendering them as one condensed, delimiter-joined string in display mode and as separate fields in edit mode; intended for use with `ColumnLayout`. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.layout/src/sap/ui/layout/form/SemanticFormElement.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.layout.form.SemanticFormElement) |
| `sap.ui.layout.form.SimpleForm` | [Form](../../../scopes/Views/form.scope.md) | Convenience control that builds a full `Form`/`FormContainer`/`FormElement` structure implicitly from a flat list of children: a `Title` or `Toolbar` starts a new group and each `Label` starts a new row, hiding the underlying API's complexity for straightforward forms. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.layout/src/sap/ui/layout/form/SimpleForm.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.layout.form.SimpleForm) |
