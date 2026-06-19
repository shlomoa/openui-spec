import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

interface GeneratedExample {
  readonly title: string;
  readonly sourceConcept: string;
  readonly summary: string;
  readonly files: readonly string[];
  readonly output: string;
}

const GENERATED_EXAMPLES: readonly GeneratedExample[] = [
  {
    title: 'Application shell',
    sourceConcept: 'Application Structure + Navigation Model',
    summary:
      'The generator creates a standalone Angular shell with Material navigation for top-level OpenUI5 application areas.',
    files: ['src/app/app.ts', 'src/app/app.html', 'src/app/app.routes.ts'],
    output: `@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatButtonModule, RouterOutlet],
  template: \`
    <mat-toolbar color="primary">Sales Workspace</mat-toolbar>
    <nav aria-label="Primary">
      <a mat-button routerLink="/orders">Orders</a>
      <a mat-button routerLink="/customers">Customers</a>
    </nav>
    <router-outlet />
  \`
})
export class AppComponent {}`,
  },
  {
    title: 'Generated page',
    sourceConcept: 'Page + Layout System',
    summary:
      'Page definitions become routed standalone components with Material cards and responsive layout regions.',
    files: ['src/app/pages/orders/orders.page.ts', 'src/app/pages/orders/orders.page.html'],
    output: `@Component({
  selector: 'app-orders-page',
  imports: [MatCardModule, MatTableModule],
  template: \`
    <mat-card>
      <mat-card-title>Orders</mat-card-title>
      <table mat-table [dataSource]="orders"></table>
    </mat-card>
  \`
})
export class OrdersPage {
  protected readonly orders = signal<OrderSummary[]>([]);
}`,
  },
  {
    title: 'Generated form',
    sourceConcept: 'Form Model + Interaction Model',
    summary:
      'Form fields and validation rules are emitted as typed reactive forms with Material controls and actions.',
    files: ['src/app/pages/orders/order-form.component.ts'],
    output: `readonly form = this.formBuilder.nonNullable.group({
  customerName: ['', [Validators.required]],
  requestedDate: ['', [Validators.required]],
  priority: ['standard']
});

save(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
}`,
  },
];

@Component({
  selector: 'app-root',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly examples = GENERATED_EXAMPLES;
}
