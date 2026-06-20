import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
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
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
  ],
  templateUrl: './example-preview.html',
  styleUrl: './example-preview.scss',
})
export class ExamplePreviewComponent {
  @Input({ required: true }) preview!: ExamplePreview;

  protected readonly orders = PREVIEW_ORDERS;
  protected readonly basicColumns = ['order', 'customer'];
  protected readonly statusColumns = ['order', 'status'];
}
