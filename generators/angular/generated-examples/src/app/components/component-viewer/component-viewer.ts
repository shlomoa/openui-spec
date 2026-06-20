import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DocComponent, DocumentationItems } from '../../documentation/documentation-items';

interface ComponentTab {
  readonly path: string;
  readonly label: string;
}

const COMPONENT_TABS: readonly ComponentTab[] = [
  { path: 'api', label: 'API' },
  { path: 'examples', label: 'Examples' },
  { path: 'styling', label: 'Styling' },
];

@Component({
  selector: 'app-component-viewer',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './component-viewer.html',
  styleUrl: './component-viewer.scss',
})
export class ComponentViewer {
  private readonly route = inject(ActivatedRoute);
  private readonly docs = inject(DocumentationItems);

  protected readonly tabs = COMPONENT_TABS;

  private readonly componentId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: this.route.snapshot.paramMap.get('id') ?? null },
  );

  protected readonly component = computed<DocComponent | undefined>(() => {
    const id = this.componentId();
    return id ? this.docs.getComponentById(id) : undefined;
  });
}
