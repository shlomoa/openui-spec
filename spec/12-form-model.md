# 12. Form Model

**Purpose:** Describe form-oriented components and semantics.

## Specification

- Form-compatible components may advertise dedicated interfaces such as form-content contracts.
- Form semantics require explicit label and description relationships through associations or equivalent metadata.
- Validation and submission behavior must be representable through public properties, events, and feedback components.
- Forms group related fields into containers and label-and-field elements so that structure, not visual position, defines which label describes which field.
- A field's validity is expressed through a public value state such as `None`, `Error`, `Warning`, `Success`, or `Information`, together with an optional value-state text.
- Editability and enablement are public properties that gate user input and submission; read-only or disabled forms must not invoke submission handlers.
- Submission and reset are modeled as public events and action controls rather than implicit page reloads or renderer-specific form posts.

## Non-goals

- The form model does not define a specific layout grid, column count, or responsive breakpoint strategy; field arrangement is governed by the layout system.
- The form model does not standardize validation rule engines, error message wording, or server-side validation protocols.
- The form model does not replace the accessibility model; it relies on label associations and value states that the accessibility section maps to ARIA semantics.
- The form model does not require every input component to be form-aware; only components that advertise the form-content interface participate as fields.

## Tags

- `form-content-interface` — components opt into form placement by advertising a form-content interface contract rather than being forced into forms by type.
- `label-association` — form fields reference their labels through non-owning associations instead of owning the label text.
- `form-grouping` — forms organize fields into containers and label-and-field elements that define which label describes which field.
- `validation-value-state` — field validity is published through a value state and optional value-state text rather than renderer-specific styling.
- `submission-contract` — submission and reset are exposed as public events and action controls that applications handle explicitly.
- `editable-enabled-gating` — editable and enabled properties gate user input and submission so read-only or disabled forms do not run submission handlers.

## Formal definitions

- **Form** — a composite component that groups related input fields into labeled containers for coordinated data entry and submission.
- **Form container** — an owned grouping inside a form that collects related form elements under an optional group title.
- **Form element** — a label-and-field pairing inside a form container that associates one label with one or more form-content fields.
- **Form-content interface** — a published interface contract a component advertises to declare that it can be placed as a field inside a form.
- **Label association** — a non-owning association between a label and the form-content field it describes, expressing the describing relationship without ownership.
- **Value state** — the public validation status of a field, such as `None`, `Error`, `Warning`, `Success`, or `Information`, with an optional value-state text.
- **Submission event** — a public event a form or action control emits to request validation and submission of the current field values.

## Usage and implementation guidance

- Place only components that advertise the form-content interface as form fields, and treat the interface as the opt-in contract for form participation.
- Associate each field with a label through associations so the describing relationship is resolvable from public metadata rather than visual proximity.
- Express validation results through the field's value state and value-state text instead of renderer-specific styling, and feed those states to the feedback and accessibility layers.
- Model submission and reset as public events and action controls, and gate them on the editable and enabled state so read-only or disabled forms never invoke handlers.
- Preserve form structure, form-content interfaces, label associations, value-state metadata, and submission events in `/openui.json` so generators and tests can reconstruct the full form contract.

## Examples

### Example 1 — form structure and form-content interface

```json
{
  "component": "sap.ui.layout.form.Form",
  "metadata": {
    "aggregations": {
      "formContainers": {
        "type": "sap.ui.layout.form.FormContainer",
        "multiple": true
      }
    }
  },
  "formContainers": [
    {
      "title": "Customer",
      "formElements": [
        {
          "label": "Customer name",
          "fields": [
            {
              "component": "sap.m.Input",
              "interfaces": ["sap.ui.core.IFormContent"]
            }
          ]
        },
        {
          "label": "Priority",
          "fields": [
            {
              "component": "sap.m.Select",
              "interfaces": ["sap.ui.core.IFormContent"]
            }
          ]
        }
      ]
    }
  ]
}
```

A form owns its structure through `formContainers` and `formElements`: each container groups related elements under a title, and each element pairs a label with one or more fields. Only components that advertise the form-content interface (`sap.ui.core.IFormContent`) are placed as fields.

### Example 2 — label association and value state

```json
{
  "component": "sap.m.Input",
  "metadata": {
    "properties": {
      "value": { "type": "string", "defaultValue": "", "bindable": true },
      "required": { "type": "boolean", "defaultValue": false },
      "editable": { "type": "boolean", "defaultValue": true },
      "valueState": {
        "type": "sap.ui.core.ValueState",
        "defaultValue": "None"
      },
      "valueStateText": { "type": "string", "defaultValue": "" }
    },
    "associations": {
      "ariaLabelledBy": { "type": "sap.ui.core.Control", "multiple": true },
      "ariaDescribedBy": { "type": "sap.ui.core.Control", "multiple": true }
    }
  },
  "validation": {
    "valueState": "Error",
    "valueStateText": "Customer name is required."
  }
}
```

A field reports validation through its public `valueState` and `valueStateText` rather than renderer-specific styling, and references its label and description through non-owning `ariaLabelledBy` and `ariaDescribedBy` associations.

### Example 3 — submission and reset event contract

```json
{
  "component": "sample.library.OrderForm",
  "metadata": {
    "properties": {
      "editable": { "type": "boolean", "defaultValue": true }
    },
    "events": {
      "submit": {
        "description": "Fired when an editable form requests validation and submission of its fields.",
        "enabledRequired": true,
        "parameters": {}
      },
      "reset": {
        "description": "Fired when the form is asked to restore its fields to their initial values.",
        "parameters": {}
      }
    }
  }
}
```

Submission and reset are public events. The `submit` event requires the editable state, so a read-only form does not invoke submission handlers even when an action control is activated.

### Example 4 — generator output typed reactive form

```typescript
@Component({
  selector: "sample-order-form",
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  template: `
    <form [formGroup]="form">
      <mat-form-field appearance="outline">
        <mat-label>Customer name</mat-label>
        <input matInput formControlName="customerName" />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Requested date</mat-label>
        <input matInput type="date" formControlName="requestedDate" />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Priority</mat-label>
        <mat-select formControlName="priority">
          <mat-option value="standard">Standard</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-raised-button color="primary" type="button" (click)="save()">
        Save
      </button>
    </form>
  `,
})
export class OrderFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly form = this.formBuilder.nonNullable.group({
    customerName: ["", [Validators.required]],
    requestedDate: ["", [Validators.required]],
    priority: ["standard"],
  });

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // The form is valid: submit the typed value to the application handler.
    this.submitOrder(this.form.getRawValue());
  }

  private submitOrder(_order: {
    customerName: string;
    requestedDate: string;
    priority: string;
  }): void {}
}
```

A generator maps the specification's form structure to the host framework's form primitives: form-content fields become typed non-nullable reactive controls, required validation becomes validators, and the submission event becomes a `save` handler that validates before submitting.
