import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { DocumentationItems } from '../../documentation/documentation-items';

describe('Component documentation routing', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('lists components on the /components landing page', async () => {
    const expectedCount = TestBed.inject(DocumentationItems).getAllComponents().length;
    const harness = await RouterTestingHarness.create('/components');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelectorAll('.component-card').length).toBe(expectedCount);
    expect(root.textContent).toContain('Application shell');
  });

  it('renders API, Examples, and Styling tabs for a component', async () => {
    const harness = await RouterTestingHarness.create('/components/shell');
    const root = harness.routeNativeElement as HTMLElement;
    const tabs = Array.from(root.querySelectorAll('a[mat-tab-link]')).map((tab) =>
      tab.textContent?.trim(),
    );
    expect(tabs).toEqual(['API', 'Examples', 'Styling']);
    expect(root.querySelector('h1')?.textContent).toContain('Application shell');
  });

  it('shows the API tab content sourced from the spec by default', async () => {
    const harness = await RouterTestingHarness.create('/components/shell');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('.api-source')?.textContent).toContain(
      'spec/06-application-structure.md',
    );
  });

  it('renders more than one runnable example on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/shell/examples');
    const root = harness.routeNativeElement as HTMLElement;
    const examples = root.querySelectorAll('.example');
    expect(examples.length).toBeGreaterThan(1);
    expect(root.querySelectorAll('app-example-preview').length).toBe(examples.length);
  });

  it('renders application structure previews on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/shell/examples');
    const root = harness.routeNativeElement as HTMLElement;

    expect(root.querySelector('.application-preview')).toBeTruthy();
    expect(root.textContent).toContain('sample.library');
    expect(root.textContent).toContain('currentPage');
    expect(root.textContent).toContain('masterPages');
    expect(root.textContent).toContain('order-detail');
  });

  it('renders UI concept model previews on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/ui-concept-model/examples');
    const root = harness.routeNativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain('UI concept model');
    expect(root.querySelector('.ui-concept-preview')).toBeTruthy();
    expect(root.textContent).toContain('Control: Page');
    expect(root.textContent).toContain('Element: FormElement');
    expect(root.textContent).toContain('aggregation: Control [0..n]');
    expect(root.textContent).toContain('Dialog control');
    expect(root.textContent).toContain('ariaLabelledBy: non-owning Control [0..n]');
  });

  it('renders layout density and drag-and-drop previews on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/page/examples');
    const root = harness.routeNativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain('Page layout');
    expect(root.textContent).toContain('Density and spacing page');
    expect(root.textContent).toContain('density: compact');
    expect(root.querySelectorAll('.density-page mat-form-field').length).toBe(2);
    expect(root.querySelector('.density-page mat-chip-set')).toBeTruthy();
    expect(root.textContent).toContain('Drag-and-drop region page');
    expect(root.textContent).toContain('columns region');
    expect(root.querySelectorAll('.board-preview mat-card').length).toBe(3);
  });

  it('renders styling guidance on the Styling tab', async () => {
    const harness = await RouterTestingHarness.create('/components/form/styling');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('.styling-notes')?.children.length).toBeGreaterThan(0);
    expect(root.querySelector('pre code')?.textContent).toContain('mat-form-field');
  });

  it('sources the component-model API tab from the component model spec', async () => {
    const harness = await RouterTestingHarness.create('/components/component-contract');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('Component contract');
    expect(root.querySelector('.api-source')?.textContent).toContain('spec/08-component-model.md');
  });

  it('renders component contract previews on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/component-contract/examples');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('.component-preview')).toBeTruthy();
    expect(root.textContent).toContain('renderer: CardRenderer');
    expect(root.textContent).toContain('dnd: draggable + droppable');
  });

  it('renders extension point previews on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/extension-point/examples');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('Extension point');
    expect(root.querySelector('.extension-preview')).toBeTruthy();
    expect(root.textContent).toContain('workspace.cards');
    expect(root.textContent).toContain('drag-drop-extension');
  });

  it('renders the navigable container preview on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/navigation-container/examples');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('Navigation container');
    expect(root.querySelector('.navigation-preview')).toBeTruthy();
    expect(root.textContent).toContain('currentPage: orders');
  });

  it('sources the data-binding API tab from the data binding model spec', async () => {
    const harness = await RouterTestingHarness.create('/components/binding');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('Data binding');
    expect(root.querySelector('.api-source')?.textContent).toContain(
      'spec/11-data-binding-model.md',
    );
  });

  it('renders property and aggregation binding previews on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/binding/examples');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('.binding-preview')).toBeTruthy();
    expect(root.textContent).toContain('path: /customer/name');
    expect(root.textContent).toContain('kind: aggregation');
  });

  it('renders state model public defaults and derived state previews without hidden state API', async () => {
    const harness = await RouterTestingHarness.create('/components/state/examples');
    const root = harness.routeNativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain('Component state');
    expect(root.querySelectorAll('.state-preview').length).toBe(2);
    expect(root.textContent).toContain('text: "Submit order"');
    expect(root.textContent).toContain('enabled: true');
    expect(root.textContent).toContain('type: Default');
    expect(root.textContent).toContain('effectiveValueState: Error');
    expect(root.textContent).not.toContain('_lastMeasuredWidth');
  });

  it('renders interaction enabled and disabled activation previews on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/action/examples');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('Action button');
    expect(root.querySelectorAll('.action-preview').length).toBe(2);
    expect(root.textContent).toContain('Pointer, touch, and keyboard activation');
    expect(root.textContent).toContain('enabled gate suppresses activation');
  });

  it('sources the accessibility API tab from the accessibility model spec', async () => {
    const harness = await RouterTestingHarness.create('/components/accessible-field');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('Accessible field');
    expect(root.querySelector('.api-source')?.textContent).toContain(
      'spec/15-accessibility-model.md',
    );
  });

  it('renders the accessible naming associations on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/accessible-field/examples');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('.a11y-preview')).toBeTruthy();
    expect(root.querySelector('[aria-labelledby="customer-name-label"]')).toBeTruthy();
    expect(root.querySelector('[aria-haspopup="menu"]')).toBeTruthy();
    expect(root.querySelector('[dir="rtl"]')).toBeTruthy();
  });

  it('sources the performance API tab from the performance requirements spec', async () => {
    const harness = await RouterTestingHarness.create('/components/performance-budgets');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('Performance budgets');
    expect(root.querySelector('.api-source')?.textContent).toContain(
      'spec/19-performance-requirements.md',
    );
  });

  it('renders the eager-discovery, virtualization, and projection previews on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/performance-budgets/examples');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelectorAll('.performance-preview').length).toBeGreaterThan(0);
    expect(root.querySelector('cdk-virtual-scroll-viewport')).toBeTruthy();
    expect(root.textContent).toContain('detail: lazy');
    expect(root.textContent).toContain('growingThreshold: 20');
    expect(root.textContent).toContain('cacheKey: sample.library@1.4.0');
  });

  it('renders acceptance criteria previews on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/acceptance-criteria/examples');
    const root = harness.routeNativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain('Acceptance criteria');
    expect(root.querySelector('.acceptance-preview')).toBeTruthy();
    expect(root.textContent).toContain('AC-METADATA-PROJECTION');
    expect(root.textContent).toContain('generated-order-form.png');
  });

  it('sources the compliance API tab from the compliance rules spec', async () => {
    const harness = await RouterTestingHarness.create('/components/compliance-rules');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('Compliance rules');
    expect(root.querySelector('.api-source')?.textContent).toContain('spec/21-compliance-rules.md');
  });

  it('renders compliance previews on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/compliance-rules/examples');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('.compliance-preview')).toBeTruthy();
    expect(root.textContent).toContain('catalog-discoverability: pass');
  });

  it('sources the internationalization API tab from the internationalization spec', async () => {
    const harness = await RouterTestingHarness.create('/components/localized-field');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('Localized field');
    expect(root.querySelector('.api-source')?.textContent).toContain(
      'spec/17-internationalization.md',
    );
  });

  it('renders the localized message and direction previews on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/localized-field/examples');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('.i18n-preview')).toBeTruthy();
    expect(root.textContent).toContain('text: order.submit (translatable)');
    expect(root.querySelector('[dir="rtl"]')).toBeTruthy();
  });

  it('sources the reference examples API tab from the reference examples spec', async () => {
    const harness = await RouterTestingHarness.create('/components/reference-action-button');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('Reference action button');
    expect(root.querySelector('.api-source')?.textContent).toContain(
      'spec/23-reference-examples.md',
    );
  });

  it('renders the reference examples previews on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create(
      '/components/reference-action-button/examples',
    );
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('.reference-preview')).toBeTruthy();
    expect(root.querySelector('[aria-labelledby="reference-actions-label"]')).toBeTruthy();
    expect(root.querySelector('[aria-haspopup="menu"]')).toBeTruthy();
    expect(root.querySelector('[dir="rtl"]')).toBeTruthy();
    expect(root.textContent).toContain('Hidden upstream metadata stays evidence-only.');
  });
});
