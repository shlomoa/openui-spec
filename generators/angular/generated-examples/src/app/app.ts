import { Component, HostListener, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

interface GeneratedExample {
  readonly title: string;
  readonly sourceConcept: string;
  readonly summary: string;
  readonly files: readonly string[];
  readonly output: string;
  readonly previewType: 'shell' | 'page' | 'form' | 'interaction';
}

const GENERATED_EXAMPLES: readonly GeneratedExample[] = [
  {
    title: 'Application shell',
    sourceConcept: 'Application Structure + Navigation Model',
    summary:
      'The generator creates a standalone Angular shell with Material navigation for top-level OpenUI5 application areas.',
    files: ['src/app/app.ts', 'src/app/app.html', 'src/app/app.routes.ts'],
    previewType: 'shell',
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
    previewType: 'page',
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
    previewType: 'form',
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
  {
    title: 'Generated interaction',
    sourceConcept: 'Interaction Model + Button press',
    summary:
      'Activation metadata becomes one handler path that preserves pointer and keyboard equivalence plus disabled-state gating.',
    files: ['src/app/actions/save-action.component.ts'],
    previewType: 'interaction',
    output: `@Component({
  selector: 'app-save-action',
  template: \`
    <button type="button" [disabled]="isSaving()" (click)="save()">
      Save order
    </button>
  \`
})
export class SaveActionComponent {
  protected readonly isSaving = signal(false);

  protected save(): void {
    if (this.isSaving()) {
      return;
    }

    this.isSaving.set(true);
  }
}`,
  },
];

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly examples = GENERATED_EXAMPLES;
  protected readonly selectedExampleIndex = signal(0);
  protected readonly selectedExample = computed(() => this.examples[this.selectedExampleIndex()]);
  protected readonly splitPercent = signal(36);
  protected readonly frameColumns = computed(() => `${this.splitPercent()}% 0.5rem 1fr`);

  private isResizing = false;
  private frameLeft = 0;
  private frameWidth = 1;

  protected selectExample(index: number): void {
    this.selectedExampleIndex.set(index);
  }

  protected selectPreviousExample(): void {
    this.selectedExampleIndex.update((index) =>
      index === 0 ? this.examples.length - 1 : index - 1,
    );
  }

  protected selectNextExample(): void {
    this.selectedExampleIndex.update((index) =>
      index === this.examples.length - 1 ? 0 : index + 1,
    );
  }

  protected resetSplit(): void {
    this.splitPercent.set(36);
  }

  protected startResize(event: PointerEvent): void {
    const frame = (event.currentTarget as HTMLElement).closest('.dashboard-frame');
    if (!(frame instanceof HTMLElement)) {
      return;
    }

    const bounds = frame.getBoundingClientRect();
    this.frameLeft = bounds.left;
    this.frameWidth = bounds.width;
    this.isResizing = true;
    event.preventDefault();
  }

  @HostListener('document:pointermove', ['$event'])
  protected resizeFrame(event: PointerEvent): void {
    if (!this.isResizing) {
      return;
    }

    const splitPercent = ((event.clientX - this.frameLeft) / this.frameWidth) * 100;
    this.splitPercent.set(Math.min(60, Math.max(24, splitPercent)));
  }

  @HostListener('document:pointerup')
  protected stopResize(): void {
    this.isResizing = false;
  }
}
