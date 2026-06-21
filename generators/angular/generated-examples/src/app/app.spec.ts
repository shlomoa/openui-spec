import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { DocumentationItems } from './documentation/documentation-items';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the toolbar title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-title')?.textContent).toContain('OpenUI5 Spec');
  });

  it('should render a sidenav navigation listing components by category', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const expectedLinks = TestBed.inject(DocumentationItems).getAllComponents().length;

    expect(compiled.querySelector('.app-sidenav')).toBeTruthy();
    expect(compiled.textContent).toContain('Application structure');
    expect(compiled.textContent).toContain('Data & forms');
    expect(compiled.textContent).toContain('Component model');
    expect(compiled.textContent).toContain('Extension');
    expect(compiled.textContent).toContain('Interaction');
    expect(compiled.textContent).toContain('Navigation');
    expect(compiled.textContent).toContain('Feedback');
    expect(compiled.textContent).toContain('Accessibility');
    expect(compiled.textContent).toContain('Performance');
    expect(compiled.textContent).toContain('Internationalization');
    expect(compiled.textContent).toContain('Reference examples');
    expect(compiled.textContent).toContain('Theming');
    expect(compiled.textContent).toContain('Compliance');
    expect(compiled.textContent).toContain('Quality & compliance');

    const links = compiled.querySelectorAll('.app-sidenav a[mat-list-item]');
    expect(links.length).toBe(expectedLinks);
    expect(compiled.textContent).toContain('Application shell');
    expect(compiled.textContent).toContain('Form');
    expect(compiled.textContent).toContain('Component state');
    expect(compiled.textContent).toContain('Data binding');
    expect(compiled.textContent).toContain('Component contract');
    expect(compiled.textContent).toContain('Extension point');
    expect(compiled.textContent).toContain('Action button');
    expect(compiled.textContent).toContain('Navigation container');
    expect(compiled.textContent).toContain('Status feedback');
    expect(compiled.textContent).toContain('Accessible field');
    expect(compiled.textContent).toContain('Performance budgets');
    expect(compiled.textContent).toContain('Localized field');
    expect(compiled.textContent).toContain('Reference action button');
    expect(compiled.textContent).toContain('Themed button');
    expect(compiled.textContent).toContain('Compliance rules');
    expect(compiled.textContent).toContain('Acceptance criteria');
  });
});
