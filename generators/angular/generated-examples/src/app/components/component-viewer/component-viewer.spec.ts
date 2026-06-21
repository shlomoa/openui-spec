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
    expect(root.querySelector('[aria-haspopup="menu"]')).toBeTruthy();
    expect(root.querySelector('[dir="rtl"]')).toBeTruthy();
    expect(root.textContent).toContain('Hidden upstream metadata stays evidence-only.');
  });
});
