import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExamplePreview } from '../../documentation/documentation-items';

interface PreviewOrder {
  readonly order: string;
  readonly customer: string;
  readonly status: string;
}

const PREVIEW_ORDERS: readonly PreviewOrder[] = [
  { order: '1000123', customer: 'Contoso Retail', status: 'Open' },
  { order: '1000124', customer: 'Northwind Traders', status: 'In review' },
];

const PREVIEW_CUSTOMERS: readonly string[] = [
  'Contoso Retail',
  'Northwind Traders',
  'Fabrikam Logistics',
  'Adventure Works',
  'Wide World Importers',
];

const VIRTUAL_ORDERS: readonly PreviewOrder[] = Array.from({ length: 200 }, (_, index) => ({
  order: `100${(1000 + index).toString()}`,
  customer: PREVIEW_CUSTOMERS[index % PREVIEW_CUSTOMERS.length],
  status: index % 2 === 0 ? 'Open' : 'In review',
}));

/**
 * Renders a live Angular Material preview for a documented example. The preview
 * intentionally uses Material components so the sample reflects the generator's
 * expected output style.
 */
@Component({
  selector: 'app-example-preview',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    ScrollingModule,
  ],
  templateUrl: './example-preview.html',
  styleUrl: './example-preview.scss',
})
export class ExamplePreviewComponent {
  @Input({ required: true }) preview!: ExamplePreview;

  protected readonly orders = PREVIEW_ORDERS;
  protected readonly boundOrders = PREVIEW_ORDERS;
  protected readonly virtualOrders = VIRTUAL_ORDERS;
  protected readonly basicColumns = ['order', 'customer'];
  protected readonly statusColumns = ['order', 'status'];
  // Rendered through interpolation so the markup is encoded and shown literally.
  protected readonly untrustedText = '<script>alert(1)</script>';
}
