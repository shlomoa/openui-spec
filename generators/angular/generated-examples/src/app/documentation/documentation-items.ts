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
  | 'table-basic'
  | 'table-status'
  | 'form-order'
  | 'form-filter';

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
            'Bindings may target scalar properties or compositional collections depending on the metadata kind.',
            'Async model updates must preserve declared property and aggregation types.',
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
