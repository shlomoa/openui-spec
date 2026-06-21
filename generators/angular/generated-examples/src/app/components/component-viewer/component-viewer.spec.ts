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
});
