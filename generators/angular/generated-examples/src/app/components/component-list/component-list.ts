import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DocCategory, DocumentationItems } from '../../documentation/documentation-items';

@Component({
  selector: 'app-component-list',
  imports: [MatCardModule, RouterLink],
  templateUrl: './component-list.html',
  styleUrl: './component-list.scss',
})
export class ComponentList {
  private readonly docs = inject(DocumentationItems);
  protected readonly categories: readonly DocCategory[] = this.docs.getCategories();
}
