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

  it('renders the navigable container preview on the Examples tab', async () => {
    const harness = await RouterTestingHarness.create('/components/navigation-container/examples');
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('Navigation container');
    expect(root.querySelector('.navigation-preview')).toBeTruthy();
    expect(root.textContent).toContain('currentPage: orders');
  });
});
