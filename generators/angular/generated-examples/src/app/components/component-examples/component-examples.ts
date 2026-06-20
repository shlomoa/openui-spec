import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DocComponent, DocumentationItems } from '../../documentation/documentation-items';
import { ExamplePreviewComponent } from './example-preview';

@Component({
  selector: 'app-component-examples',
  imports: [ExamplePreviewComponent],
  templateUrl: './component-examples.html',
  styleUrl: './component-examples.scss',
})
export class ComponentExamples {
  private readonly route = inject(ActivatedRoute);
  private readonly docs = inject(DocumentationItems);

  private readonly componentId = toSignal(
    this.route.parent!.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: this.route.parent?.snapshot.paramMap.get('id') ?? null },
  );

  protected readonly component = computed<DocComponent | undefined>(() => {
    const id = this.componentId();
    return id ? this.docs.getComponentById(id) : undefined;
  });
}
