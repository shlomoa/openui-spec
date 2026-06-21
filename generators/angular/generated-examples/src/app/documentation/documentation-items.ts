import { Injectable } from '@angular/core';

/**
 * Preview discriminator used by the examples tab to render a live Angular
 * Material preview that reflects the generator's expected output for a concept.
 */
export type ExamplePreview =
  | 'shell-side'
  | 'shell-toolbar'
  | 'page-card'
  | 'page-split'
  | 'page-responsive'
  | 'table-basic'
  | 'table-status'
  | 'form-order'
  | 'form-filter'
  | 'state-public'
  | 'state-derived'
  | 'binding-property'
  | 'binding-aggregation'
  | 'action-enabled'
  | 'action-disabled'
  | 'component-properties'
  | 'component-aggregation'
  | 'component-events'
  | 'navigation-stack'
  | 'navigation-overlay'
  | 'navigation-routing'
  | 'feedback-busy'
  | 'feedback-message'
  | 'feedback-empty'
  | 'a11y-labelled'
  | 'a11y-popup'
  | 'a11y-direction';

/** A single runnable example shown on a component's "Examples" tab. */
export interface DocExample {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly preview: ExamplePreview;
  readonly code: string;
}

/**
 * API reference for a component. The content is derived from the specification
 * documents that are published to Read the Docs (the `spec/*.md` sources).
 */
export interface DocApi {
  readonly specSection: string;
  readonly specPath: string;
  readonly purpose: string;
  readonly derivedFrom: readonly string[];
  readonly points: readonly string[];
  readonly jsonMapping: string;
}

/** Styling guidance and the relevant generated styles for a component. */
export interface DocStyling {
  readonly notes: readonly string[];
  readonly code: string;
}

/** A single documented component (mirrors a Material docs component page). */
export interface DocComponent {
  readonly id: string;
  readonly name: string;
  readonly summary: string;
  readonly api: DocApi;
  readonly examples: readonly DocExample[];
  readonly styling: DocStyling;
}

/** A group of related components (mirrors the Material docs category list). */
export interface DocCategory {
  readonly id: string;
  readonly name: string;
  readonly summary: string;
  readonly items: readonly DocComponent[];
}

const CATEGORIES: readonly DocCategory[] = [
  {
    id: 'application-structure',
    name: 'Application structure',
    summary: 'Shell and page primitives the generator emits for application composition.',
    items: [
      {
        id: 'shell',
        name: 'Application shell',
        summary:
          'A standalone Angular shell with Material navigation for top-level OpenUI5 application areas.',
        api: {
          specSection: '06. Application Structure',
          specPath: 'spec/06-application-structure.md',
          purpose: 'Describe the required structure of applications built on the framework.',
          derivedFrom: ['library-catalog-root', 'library-component-catalog'],
          points: [
            'Applications compose pages, dialogs, forms, lists, and navigation containers from library-published components.',
            'The framework must support a navigable shell-level structure and page hierarchy built from public components.',
            'Library dependencies must be explicit so application structure can be resolved without reading component internals.',
          ],
          jsonMapping: 'specification.sections[5] in /openui.json',
        },
        examples: [
          {
            id: 'shell-side-navigation',
            title: 'Side navigation shell',
            description:
              'A primary toolbar with a persistent side navigation drives top-level routing into a router outlet.',
            preview: 'shell-side',
            code: `@Component({
  selector: 'app-root',
  imports: [MatListModule, MatSidenavModule, MatToolbarModule, RouterLink, RouterOutlet],
  template: \`
    <mat-toolbar color="primary">Sales Workspace</mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened>
        <a mat-list-item routerLink="/orders">Orders</a>
        <a mat-list-item routerLink="/customers">Customers</a>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  \`
})
export class AppComponent {}`,
          },
          {
            id: 'shell-toolbar-actions',
            title: 'Toolbar actions shell',
            description:
              'Shell-level actions are emitted as toolbar buttons so global commands stay discoverable.',
            preview: 'shell-toolbar',
            code: `@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterOutlet],
  template: \`
    <mat-toolbar color="primary">
      <span>Sales Workspace</span>
      <span class="spacer"></span>
      <button mat-icon-button aria-label="Search"><mat-icon>search</mat-icon></button>
      <button mat-flat-button color="accent">New order</button>
    </mat-toolbar>
    <router-outlet />
  \`
})
export class AppComponent {}`,
          },
        ],
        styling: {
          notes: [
            'The shell consumes Angular Material system variables (--mat-sys-*) so it inherits the configured theme.',
            'A flexible spacer keeps shell actions aligned to the trailing edge of the toolbar.',
          ],
          code: `:host {
  display: block;
  min-height: 100vh;
}

.spacer {
  flex: 1 1 auto;
}

mat-sidenav {
  width: 16rem;
}`,
        },
      },
      {
        id: 'page',
        name: 'Page layout',
        summary:
          'Routed standalone page components built from Material cards and responsive layout regions.',
        api: {
          specSection: '07. Layout System',
          specPath: 'spec/07-layout-system.md',
          purpose: 'Describe the abstract layout and composition requirements.',
          derivedFrom: ['aggregation-model', 'renderer-dnd-model'],
          points: [
            'Layout is expressed as ordered or named composition regions exposed through aggregations.',
            'Responsive behavior must preserve component composition semantics when layout density, theme, or viewport changes.',
            'Container components may expose drag-and-drop semantics only when declared in metadata.',
          ],
          jsonMapping: 'specification.sections[6] in /openui.json',
        },
        examples: [
          {
            id: 'page-card',
            title: 'Card page',
            description: 'A single composition region rendered as a Material card with a heading.',
            preview: 'page-card',
            code: `@Component({
  selector: 'app-orders-page',
  imports: [MatCardModule],
  template: \`
    <mat-card>
      <mat-card-title>Orders</mat-card-title>
      <mat-card-content>Routed page content</mat-card-content>
    </mat-card>
  \`
})
export class OrdersPage {}`,
          },
          {
            id: 'page-split',
            title: 'Split layout page',
            description:
              'Two named composition regions become a responsive grid that collapses on small viewports.',
            preview: 'page-split',
            code: `@Component({
  selector: 'app-orders-page',
  imports: [MatCardModule],
  template: \`
    <div class="page-grid">
      <mat-card>
        <mat-card-title>Order list</mat-card-title>
      </mat-card>
      <mat-card>
        <mat-card-title>Details</mat-card-title>
      </mat-card>
    </div>
  \`,
  styles: \`
    .page-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
  \`
})
export class OrdersPage {}`,
          },
          {
            id: 'page-responsive',
            title: 'Responsive grid page',
            description:
              'An ordered region keeps the same children while the column count adapts across breakpoints, so reflow preserves composition order.',
            preview: 'page-responsive',
            code: `@Component({
  selector: 'app-catalog-page',
  imports: [MatCardModule],
  template: \`
    <div class="catalog-grid">
      @for (item of items(); track item.id) {
        <mat-card>
          <mat-card-title>{{ item.name }}</mat-card-title>
        </mat-card>
      }
    </div>
  \`,
  styles: \`
    .catalog-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 1023px) {
      .catalog-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 599px) {
      .catalog-grid {
        grid-template-columns: 1fr;
      }
    }
  \`
})
export class CatalogPage {
  readonly items = input<CatalogItem[]>([]);
}`,
          },
        ],
        styling: {
          notes: [
            'Layout regions use CSS grid so composition order survives responsive reflow.',
            'A single-column fallback preserves composition semantics on narrow viewports.',
          ],
          code: `.page-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

@media (max-width: 700px) {
  .page-grid {
    grid-template-columns: 1fr;
  }
}`,
        },
      },
    ],
  },
  {
    id: 'data-and-forms',
    name: 'Data & forms',
    summary: 'Components for presenting bound data and capturing user input.',
    items: [
      {
        id: 'table',
        name: 'Data table',
        summary: 'Bound collections become Material tables that preserve declared property types.',
        api: {
          specSection: '11. Data Binding Model',
          specPath: 'spec/11-data-binding-model.md',
          purpose: 'Describe how component state binds to external models.',
          derivedFrom: ['property-model', 'aggregation-model'],
          points: [
            'Bindable properties and aggregations are part of the component contract and must be explicitly declared.',
            'Aggregation bindings connect a model collection to an owned aggregation by repeating a template for each entry.',
            'Async model updates must preserve the declared property and aggregation types.',
          ],
          jsonMapping: 'specification.sections[10] in /openui.json',
        },
        examples: [
          {
            id: 'table-basic',
            title: 'Basic data table',
            description: 'A bound collection is emitted as a Material table with typed columns.',
            preview: 'table-basic',
            code: `@Component({
  selector: 'app-orders-table',
  imports: [MatTableModule],
  template: \`
    <table mat-table [dataSource]="orders">
      <ng-container matColumnDef="order">
        <th mat-header-cell *matHeaderCellDef>Order</th>
        <td mat-cell *matCellDef="let row">{{ row.order }}</td>
      </ng-container>
      <ng-container matColumnDef="customer">
        <th mat-header-cell *matHeaderCellDef>Customer</th>
        <td mat-cell *matCellDef="let row">{{ row.customer }}</td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns"></tr>
    </table>
  \`
})
export class OrdersTable {
  protected readonly columns = ['order', 'customer'];
  protected readonly orders = signal<OrderSummary[]>([]);
}`,
          },
          {
            id: 'table-status',
            title: 'Status table with chips',
            description:
              'Enumerated status properties render as Material chips inside a bound table column.',
            preview: 'table-status',
            code: `<ng-container matColumnDef="status">
  <th mat-header-cell *matHeaderCellDef>Status</th>
  <td mat-cell *matCellDef="let row">
    <mat-chip>{{ row.status }}</mat-chip>
  </td>
</ng-container>`,
          },
        ],
        styling: {
          notes: [
            'Tables stretch to the available width so bound columns share horizontal space evenly.',
            'Status chips inherit Material color roles to keep enumerated values legible.',
          ],
          code: `table[mat-table] {
  width: 100%;
}

td.mat-mdc-cell mat-chip {
  font-weight: 600;
}`,
        },
      },
      {
        id: 'form',
        name: 'Form',
        summary:
          'Form fields and validation rules become typed reactive forms with Material controls and actions.',
        api: {
          specSection: '12. Form Model',
          specPath: 'spec/12-form-model.md',
          purpose: 'Describe form-oriented components and semantics.',
          derivedFrom: [
            'library-interface-catalog',
            'association-model',
            'reference-component-button',
          ],
          points: [
            'Form-compatible components may advertise dedicated interfaces such as form-content contracts.',
            'Form semantics require explicit label and description relationships through associations or equivalent metadata.',
            'Validation and submission behavior must be representable through public properties, events, and feedback components.',
          ],
          jsonMapping: 'specification.sections[11] in /openui.json',
        },
        examples: [
          {
            id: 'form-order',
            title: 'Order form',
            description:
              'Required fields and a select are emitted as a typed non-nullable reactive form with a save action.',
            preview: 'form-order',
            code: `@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: \`
    <form [formGroup]="form">
      <mat-form-field appearance="outline">
        <mat-label>Customer name</mat-label>
        <input matInput formControlName="customerName" />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Priority</mat-label>
        <mat-select formControlName="priority">
          <mat-option value="standard">Standard</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-raised-button color="primary" type="button" (click)="save()">Save</button>
    </form>
  \`
})
export class OrderFormComponent {
  readonly form = this.formBuilder.nonNullable.group({
    customerName: ['', [Validators.required]],
    requestedDate: ['', [Validators.required]],
    priority: ['standard']
  });

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }
}`,
          },
          {
            id: 'form-filter',
            title: 'Filter form',
            description:
              'A compact inline form emits search and select controls for filtering bound collections.',
            preview: 'form-filter',
            code: `@Component({
  selector: 'app-order-filter',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: \`
    <form [formGroup]="filter" class="filter-row">
      <mat-form-field appearance="outline">
        <mat-label>Search</mat-label>
        <input matInput formControlName="query" />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Status</mat-label>
        <mat-select formControlName="status">
          <mat-option value="open">Open</mat-option>
          <mat-option value="closed">Closed</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-stroked-button type="button" (click)="apply()">Apply</button>
    </form>
  \`
})
export class OrderFilterComponent {
  readonly filter = this.formBuilder.nonNullable.group({
    query: [''],
    status: ['open']
  });

  apply(): void {}
}`,
          },
        ],
        styling: {
          notes: [
            'Outlined form fields stretch to fill their column for consistent label alignment.',
            'Filter forms use a wrapping flex row so controls reflow gracefully on small screens.',
          ],
          code: `mat-form-field {
  width: 100%;
}

.filter-row {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}`,
        },
      },
      {
        id: 'state',
        name: 'Component state',
        summary:
          'Public typed state becomes Angular Material signal inputs with defaults, while hidden and derived state stay compatible with the declared contract.',
        api: {
          specSection: '10. State Model',
          specPath: 'spec/10-state-model.md',
          purpose: 'Describe state held or exposed by components.',
          derivedFrom: ['property-model', 'visibility-default-model'],
          points: [
            'Component state is represented by typed properties with explicit default values.',
            'Only public state participates in the external component contract; hidden state stays out of generated APIs.',
            'Derived state must remain type-compatible with the declared property it reflects.',
          ],
          jsonMapping: 'specification.sections[9] in /openui.json',
        },
        examples: [
          {
            id: 'state-public-defaults',
            title: 'Public state with defaults',
            description:
              'Public typed properties are emitted as Angular signal inputs with their declared defaults and drive a Material button.',
            preview: 'state-public',
            code: `@Component({
  selector: 'app-submit-button',
  imports: [MatButtonModule],
  template: \`
    @if (visible()) {
      <button mat-raised-button color="primary" [disabled]="!enabled()">
        {{ text() }}
      </button>
    }
  \`
})
export class SubmitButtonComponent {
  readonly text = input('Submit order');
  readonly enabled = input(true);
  readonly visible = input(true);
  readonly type = input<ButtonType>('Default');
}`,
          },
          {
            id: 'state-derived-validation',
            title: 'Derived validation state',
            description:
              'Derived state is computed from public inputs and still returns the declared value-state enum, surfaced through a Material form field.',
            preview: 'state-derived',
            code: `@Component({
  selector: 'app-amount-input',
  imports: [MatFormFieldModule, MatInputModule],
  template: \`
    <mat-form-field appearance="outline">
      <mat-label>Amount</mat-label>
      <input matInput [value]="value()" readonly />
      @if (effectiveValueState() === 'Error') {
        <mat-error>Value is required</mat-error>
      }
    </mat-form-field>
  \`
})
export class AmountInputComponent {
  readonly value = input('');
  readonly required = input(true);
  readonly valueState = input<ValueState>('None');

  protected readonly effectiveValueState = computed<ValueState>(() =>
    this.required() && this.value() === '' ? 'Error' : this.valueState(),
  );
}`,
          },
        ],
        styling: {
          notes: [
            'Public state maps to Material control inputs such as disabled so visual state stays in sync with the contract.',
            'Hidden state never reaches the template, and derived state reuses Material feedback (mat-error) instead of bespoke styling.',
          ],
          code: `button[mat-raised-button][disabled] {
  opacity: 0.6;
}

mat-form-field {
  width: 100%;
}`,
        },
      },
      {
        id: 'binding',
        name: 'Data binding',
        summary:
          'Bindable properties become single-value bindings and bindable aggregations become template-driven list bindings, while async updates preserve the declared types.',
        api: {
          specSection: '11. Data Binding Model',
          specPath: 'spec/11-data-binding-model.md',
          purpose: 'Describe how component state binds to external models.',
          derivedFrom: ['property-model', 'aggregation-model'],
          points: [
            'Only metadata members explicitly declared bindable participate in the public data binding contract.',
            'Property bindings connect one model value to a typed scalar property; aggregation bindings expand a model collection through a template.',
            'Every binding resolves a path against a default or named model, and async updates must keep bound values type-compatible.',
          ],
          jsonMapping: 'specification.sections[10] in /openui.json',
        },
        examples: [
          {
            id: 'binding-property',
            title: 'Scalar property binding',
            description:
              'A bindable scalar property is connected to a single model path, so the bound value stays compatible with the declared string type.',
            preview: 'binding-property',
            code: `@Component({
  selector: 'app-customer-name',
  imports: [MatFormFieldModule, MatInputModule],
  template: \`
    <mat-form-field appearance="outline">
      <mat-label>Customer name</mat-label>
      <input matInput [value]="value()" readonly />
    </mat-form-field>
  \`
})
export class CustomerNameComponent {
  // Bound to the "/customer/name" path of the orders model.
  readonly value = input('');
}`,
          },
          {
            id: 'binding-aggregation',
            title: 'Aggregation list binding',
            description:
              'A bindable aggregation is bound to a model collection and a template is repeated per entry, preserving the child type and 0..n multiplicity.',
            preview: 'binding-aggregation',
            code: `@Component({
  selector: 'app-orders-list',
  imports: [MatListModule],
  template: \`
    <mat-list aria-label="Bound orders">
      @for (order of items(); track order.id) {
        <mat-list-item>{{ order.title }}</mat-list-item>
      }
    </mat-list>
  \`
})
export class OrdersListComponent {
  // Bound to the "/orders" collection of the orders model.
  readonly items = input<readonly OrderItem[]>([]);
}`,
          },
        ],
        styling: {
          notes: [
            'Property bindings reuse Material form fields so the bound scalar value is presented with the standard input styling.',
            'List bindings render through mat-list so each templated entry keeps consistent Material spacing and dividers.',
          ],
          code: `mat-form-field {
  width: 100%;
}

mat-list[aria-label='Bound orders'] mat-list-item {
  font-variant-numeric: tabular-nums;
}`,
        },
      },
    ],
  },
  {
    id: 'interaction',
    name: 'Interaction',
    summary: 'Activation semantics the generator emits for user-triggered action controls.',
    items: [
      {
        id: 'action',
        name: 'Action button',
        summary:
          'A semantic activation event becomes one Material button handler that keeps pointer and keyboard paths equivalent and honors the enabled gate.',
        api: {
          specSection: '09. Interaction Model',
          specPath: 'spec/09-interaction-model.md',
          purpose: 'Describe how user interaction is represented in the specification.',
          derivedFrom: ['event-model', 'reference-component-button'],
          points: [
            'User-triggered behavior is modeled as named events with stable semantics, such as press for activation.',
            'A single activation event normalizes pointer, touch, keyboard, and assistive-technology activation.',
            'Disabled controls suppress public interaction events, so the handler is gated by enabled state.',
          ],
          jsonMapping: 'specification.sections[8] in /openui.json',
        },
        examples: [
          {
            id: 'action-enabled',
            title: 'Enabled activation handler',
            description:
              'The public activation event maps to one click handler so pointer, touch, and keyboard activation reach the same code path.',
            preview: 'action-enabled',
            code: `@Component({
  selector: 'app-save-action',
  imports: [MatButtonModule],
  template: \`
    <button mat-raised-button color="primary" type="button" (click)="save()">
      Save order
    </button>
  \`
})
export class SaveActionComponent {
  save(): void {
    // Handles the public activation event regardless of input source.
  }
}`,
          },
          {
            id: 'action-disabled',
            title: 'Enabled-state gating',
            description:
              'Binding the disabled input to an enabled-state signal suppresses activation while work is in flight, matching the spec enabled gate.',
            preview: 'action-disabled',
            code: `@Component({
  selector: 'app-save-action',
  imports: [MatButtonModule],
  template: \`
    <button
      mat-raised-button
      color="primary"
      type="button"
      [disabled]="isSaving()"
      (click)="save()"
    >
      Save order
    </button>
  \`
})
export class SaveActionComponent {
  protected readonly isSaving = signal(false);

  async save(): Promise<void> {
    if (this.isSaving()) {
      return;
    }

    this.isSaving.set(true);
    try {
      await this.submitOrder();
    } finally {
      this.isSaving.set(false);
    }
  }
}`,
          },
        ],
        styling: {
          notes: [
            'Raised Material buttons reuse the primary color role so activation controls stay visually prominent.',
            'Disabled buttons rely on Material state styling so the gated state is perceivable without custom CSS.',
          ],
          code: `button[mat-raised-button] {
  min-width: 8rem;
}`,
        },
      },
    ],
  },
  {
    id: 'component-model',
    name: 'Component model',
    summary:
      'The normative component contract: typed properties, owned aggregations, non-owning associations, and events.',
    items: [
      {
        id: 'component-contract',
        name: 'Component contract',
        summary:
          'A reusable component whose public metadata declares typed property inputs, an owned content aggregation, semantic associations, and event outputs.',
        api: {
          specSection: '08. Component Model',
          specPath: 'spec/08-component-model.md',
          purpose: 'Define the normative component contract.',
          derivedFrom: [
            'library-component-catalog',
            'property-model',
            'aggregation-model',
            'association-model',
            'event-model',
          ],
          points: [
            'Each component exposes a stable identity, owning library, supported interfaces, and public metadata.',
            'Properties are typed configuration inputs with an optional default value, visibility, and bindable flag.',
            'Aggregations declare parent-owned child content with a child type and a multiplicity of 0..1 or 0..n.',
            'Associations are non-owning references such as ariaLabelledBy used for semantic links rather than ownership.',
            'Events are named notifications that deliver typed parameters to listeners as the component reports state changes.',
          ],
          jsonMapping: 'specification.sections[7] in /openui.json',
        },
        examples: [
          {
            id: 'component-properties',
            title: 'Typed property inputs',
            description:
              'A component declares typed property inputs with default values; Angular surfaces them as required and optional @Input signals.',
            preview: 'component-properties',
            code: `@Component({
  selector: 'app-status-card',
  imports: [MatButtonModule, MatCardModule],
  template: \`
    <mat-card>
      <mat-card-title>{{ heading() }}</mat-card-title>
      <mat-card-content>
        <button mat-flat-button color="primary" [disabled]="!enabled()">Confirm</button>
      </mat-card-content>
    </mat-card>
  \`
})
export class StatusCard {
  // property text: string = "Status"
  readonly heading = input<string>('Status');
  // property enabled: boolean = true
  readonly enabled = input<boolean>(true);
}`,
          },
          {
            id: 'component-aggregation',
            title: 'Owned content aggregation',
            description:
              'A parent component owns its child content through a 0..n aggregation, projected with Angular content children.',
            preview: 'component-aggregation',
            code: `@Component({
  selector: 'app-panel',
  imports: [MatCardModule],
  template: \`
    <mat-card>
      <mat-card-title><ng-content select="[panelHeader]" /></mat-card-title>
      <mat-card-content>
        <!-- aggregation content: 0..n owned children -->
        <ng-content />
      </mat-card-content>
    </mat-card>
  \`
})
export class Panel {}`,
          },
          {
            id: 'component-events',
            title: 'Event outputs and associations',
            description:
              'A component emits typed events as outputs and references labelling controls through non-owning associations.',
            preview: 'component-events',
            code: `@Component({
  selector: 'app-search-input',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: \`
    <mat-form-field appearance="outline">
      <mat-label>Search</mat-label>
      <input matInput [attr.aria-describedby]="describedBy()"
             [formControl]="value" (input)="liveChange.emit(value.value)" />
    </mat-form-field>
  \`
})
export class SearchInput {
  // property value: string (bindable)
  readonly value = new FormControl('', { nonNullable: true });
  // association ariaDescribedBy: non-owning reference
  readonly describedBy = input<string>();
  // event liveChange: emits typed parameter
  readonly liveChange = output<string>();
}`,
          },
        ],
        styling: {
          notes: [
            'Component previews reuse Angular Material surfaces (mat-card) so generated components inherit the configured theme.',
            'The metadata contract list uses Material system roles so typed inputs, outputs, and associations stay legible.',
          ],
          code: `.component-preview mat-card {
  margin-bottom: 1rem;
}

.component-contract {
  display: grid;
  gap: 0.5rem;
  margin: 0;
}

.component-contract div {
  display: flex;
  gap: 0.5rem;
}

.component-contract dt {
  color: var(--mat-sys-primary);
  font-weight: 600;
}`,
        },
      },
    ],
  },
  {
    id: 'navigation',
    name: 'Navigation',
    summary:
      'Navigable containers, overlays, and route-aware targets the generator emits for navigation flows.',
    items: [
      {
        id: 'navigation-container',
        name: 'Navigation container',
        summary:
          'A navigable page container exposes its pages and active page as public state, reports transitions through events, and maps deep-linkable routes to targets.',
        api: {
          specSection: '13. Navigation Model',
          specPath: 'spec/13-navigation-model.md',
          purpose: 'Describe the navigation structures the framework must support.',
          derivedFrom: ['library-component-catalog'],
          points: [
            'Navigable page containers own an ordered set of pages and expose the active page as public state.',
            'Navigation transitions are reported through public events such as navigate and afterNavigate.',
            'Dialogs and popovers are overlays whose open and close state is part of the public contract.',
            'Route-aware components map URL patterns to targets so application state is deep-linkable.',
          ],
          jsonMapping: 'specification.sections[12] in /openui.json',
        },
        examples: [
          {
            id: 'navigation-stack',
            title: 'Navigable page stack',
            description:
              'A navigable container owns its pages and exposes the active page as public state; navigation and back map to Angular Router navigation.',
            preview: 'navigation-stack',
            code: `@Component({
  selector: 'app-orders-nav',
  imports: [MatButtonModule, RouterOutlet],
  template: \`
    <nav aria-label="Order navigation">
      <button mat-button type="button" [disabled]="!canGoBack()" (click)="back()">
        Back
      </button>
      <span>{{ currentPage() }}</span>
    </nav>
    <router-outlet />
  \`
})
export class OrdersNavComponent {
  // aggregation pages: 0..n owned navigable pages
  readonly pages = input<readonly string[]>(['orders', 'order-detail']);
  // currentPage association: active page as public state
  readonly currentPage = input('orders');

  protected canGoBack(): boolean {
    return this.pages().indexOf(this.currentPage()) > 0;
  }

  back(): void {
    // emits the navigate event toward the previous page
  }
}`,
          },
          {
            id: 'navigation-overlay',
            title: 'Dialog overlay',
            description:
              'A dialog is a transient overlay whose visibility is public open state; opening and dismissal surface as afterOpen and afterClose events.',
            preview: 'navigation-overlay',
            code: `@Component({
  selector: 'app-confirm-dialog',
  imports: [MatButtonModule, MatDialogModule],
  template: \`
    <h2 mat-dialog-title>Confirm order</h2>
    <mat-dialog-content>Submit this order for processing?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button type="button" (click)="close('cancel')">Cancel</button>
      <button mat-flat-button color="primary" (click)="close('confirm')">Confirm</button>
    </mat-dialog-actions>
  \`
})
export class ConfirmDialogComponent {
  private readonly ref = inject(MatDialogRef<ConfirmDialogComponent>);

  // afterClose event reports the dismissal origin as a typed parameter
  close(origin: 'cancel' | 'confirm'): void {
    this.ref.close(origin);
  }
}`,
          },
          {
            id: 'navigation-routing',
            title: 'Route-aware deep-linking',
            description:
              'Route-aware containers map URL patterns to targets so a navigation state such as an order id stays deep-linkable and catalog-discoverable.',
            preview: 'navigation-routing',
            code: `export const routes: Routes = [
  // route orders -> target ordersPage
  { path: 'orders', component: OrdersPage },
  // route orders/{orderId} -> target orderPage (deep-linkable)
  { path: 'orders/:orderId', component: OrderPage },
];`,
          },
        ],
        styling: {
          notes: [
            'Navigation chrome reuses Material buttons and toolbar roles so the active page and back affordance stay perceivable.',
            'Overlays rely on Material dialog surfaces, and route patterns are rendered as plain monospace text rather than bespoke styling.',
          ],
          code: `.navigation-preview nav {
  align-items: center;
  display: flex;
  gap: 0.75rem;
}

.navigation-routing-preview code {
  font-family: var(--mat-sys-body-large-font, monospace);
}`,
        },
      },
    ],
  },
  {
    id: 'feedback',
    name: 'Feedback',
    summary:
      'User-visible feedback patterns the generator emits: busy state, severity messages, and empty states.',
    items: [
      {
        id: 'feedback',
        name: 'Status feedback',
        summary:
          'Busy state, severity-typed messages, and empty states map to public component state and live-region semantics instead of hidden renderer behavior.',
        api: {
          specSection: '14. Feedback Model',
          specPath: 'spec/14-feedback-model.md',
          purpose: 'Define how user-visible feedback is modeled.',
          derivedFrom: ['library-component-catalog', 'event-model'],
          points: [
            'Busy and loading feedback is modeled as public component state, such as a busy property and a busy-indicator delay.',
            'Message feedback declares a semantic severity (information, success, warning, or error) with live-region politeness.',
            'Empty-state feedback is a public, addressable view that communicates absent data and offers a recovery action.',
          ],
          jsonMapping: 'specification.sections[13] in /openui.json',
        },
        examples: [
          {
            id: 'feedback-busy',
            title: 'Busy-state feedback',
            description:
              'The public busy state drives a loading affordance while work is in flight, so applications toggle state instead of injecting renderer spinners.',
            preview: 'feedback-busy',
            code: `@Component({
  selector: 'app-orders-view',
  imports: [MatProgressBarModule],
  template: \`
    @if (busy()) {
      <mat-progress-bar mode="indeterminate" aria-label="Loading orders" />
    }
  \`
})
export class OrdersViewComponent {
  // property busy: boolean = false (bindable)
  protected readonly busy = signal(false);
}`,
          },
          {
            id: 'feedback-message',
            title: 'Severity message and live region',
            description:
              'A severity-typed message announces an action outcome through a polite live region so assistive technology conveys the result.',
            preview: 'feedback-message',
            code: `@Component({
  selector: 'app-save-status',
  imports: [MatButtonModule, MatSnackBarModule],
  template: \`
    <button mat-raised-button color="primary" type="button" (click)="save()">
      Save order
    </button>
  \`
})
export class SaveStatusComponent {
  constructor(private readonly snackBar: MatSnackBar) {}

  save(): void {
    // severity: success -> polite live-region announcement
    this.snackBar.open('Order saved', undefined, { politeness: 'polite' });
  }
}`,
          },
          {
            id: 'feedback-empty',
            title: 'Empty state with recovery action',
            description:
              'When a data region has no content, the public empty-state view communicates the absence of data and offers a recovery action.',
            preview: 'feedback-empty',
            code: `@Component({
  selector: 'app-orders-view',
  imports: [MatButtonModule],
  template: \`
    @if (orders().length === 0) {
      <div class="empty-state" role="status">
        <p>No orders found.</p>
        <button mat-stroked-button type="button" (click)="createOrder()">
          Create order
        </button>
      </div>
    }
  \`
})
export class OrdersEmptyComponent {
  protected readonly orders = signal<readonly Order[]>([]);

  createOrder(): void {
    // Recovery action that lets the user proceed from the empty state.
  }
}`,
          },
        ],
        styling: {
          notes: [
            'The busy indicator reuses the Material progress bar so loading feedback inherits the configured theme.',
            'Severity messages and the empty state use Material system color roles so outcome meaning stays perceivable.',
          ],
          code: `.feedback-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.empty-state {
  display: grid;
  gap: 0.75rem;
  justify-items: center;
  padding: 2rem 1rem;
}`,
        },
      },
    ],
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    summary:
      'Accessible naming, role and popup semantics, and text direction the generator emits as part of the public contract.',
    items: [
      {
        id: 'accessible-field',
        name: 'Accessible field',
        summary:
          'A control computes its accessible name and description from non-owning associations, declares role and popup semantics as typed state, and exposes a typed text direction.',
        api: {
          specSection: '15. Accessibility Model',
          specPath: 'spec/15-accessibility-model.md',
          purpose: 'Capture accessibility requirements visible in the public contract.',
          derivedFrom: ['association-model', 'reference-component-button', 'renderer-dnd-model'],
          points: [
            'ariaLabelledBy and ariaDescribedBy are non-owning associations that supply the accessible name and description from other controls.',
            'Roles and popup semantics such as ariaHasPopup are declared as typed public state rather than inferred from renderer markup.',
            'Text direction is a declarable public property with LTR, RTL, and Inherit values for bidirectional content.',
            'Keyboard activation and focus order are part of the public, compliance-relevant interaction contract.',
          ],
          jsonMapping: 'specification.sections[14] in /openui.json',
        },
        examples: [
          {
            id: 'a11y-labelled',
            title: 'Accessible name and description associations',
            description:
              'The labelling and describing associations map to aria-labelledby and aria-describedby so the accessible name and description come from other controls.',
            preview: 'a11y-labelled',
            code: `@Component({
  selector: 'app-customer-name',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: \`
    <mat-form-field appearance="outline">
      <mat-label id="customer-name-label">Customer name</mat-label>
      <input
        matInput
        [formControl]="customerName"
        [attr.aria-labelledby]="'customer-name-label'"
        [attr.aria-describedby]="'customer-name-hint'"
      />
      <mat-hint id="customer-name-hint">Use the registered legal name.</mat-hint>
    </mat-form-field>
  \`
})
export class CustomerNameComponent {
  protected readonly customerName = new FormControl('', { nonNullable: true });
}`,
          },
          {
            id: 'a11y-popup',
            title: 'Role and popup semantics',
            description:
              'A button declares its role and ariaHasPopup semantics as typed state so assistive technology announces that activation opens a menu.',
            preview: 'a11y-popup',
            code: `@Component({
  selector: 'app-order-actions',
  imports: [MatButtonModule, MatMenuModule],
  template: \`
    <button
      mat-raised-button
      color="primary"
      type="button"
      [matMenuTriggerFor]="menu"
      aria-haspopup="menu"
    >
      Order actions
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item type="button">Duplicate</button>
      <button mat-menu-item type="button">Cancel order</button>
    </mat-menu>
  \`
})
export class OrderActionsComponent {}`,
          },
          {
            id: 'a11y-direction',
            title: 'Typed text direction',
            description:
              'The textDirection property maps to the dir attribute so bidirectional content renders deterministically, while Inherit follows the surrounding context.',
            preview: 'a11y-direction',
            code: `@Component({
  selector: 'app-order-reference',
  template: \`
    <p [attr.dir]="textDirection()">{{ text() }}</p>
  \`
})
export class OrderReferenceComponent {
  // property text: string
  readonly text = input<string>('מספר הזמנה 1000123');
  // property textDirection: 'ltr' | 'rtl' | 'auto' (Inherit)
  readonly textDirection = input<'ltr' | 'rtl' | 'auto'>('rtl');
}`,
          },
        ],
        styling: {
          notes: [
            'Material form fields expose mat-label and mat-hint so the accessible name and description stay visible and linked.',
            'The dir attribute drives bidirectional layout so right-to-left content mirrors without custom CSS.',
          ],
          code: `.a11y-preview [dir='rtl'] {
  text-align: right;
}`,
        },
      },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class DocumentationItems {
  getCategories(): readonly DocCategory[] {
    return CATEGORIES;
  }

  getAllComponents(): readonly DocComponent[] {
    return CATEGORIES.flatMap((category) => category.items);
  }

  getComponentById(id: string): DocComponent | undefined {
    return this.getAllComponents().find((component) => component.id === id);
  }
}
