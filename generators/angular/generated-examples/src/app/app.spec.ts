import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Generated Angular Material examples',
    );
  });

  it('should render the dashboard panes', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.dashboard-upper')).toBeTruthy();
    expect(compiled.querySelector('.examples-pane')).toBeTruthy();
    expect(compiled.querySelector('.split-separator')).toBeTruthy();
    expect(compiled.querySelector('.preview-pane')).toBeTruthy();
  });

  it('should list generated examples in the accordion', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const panels = compiled.querySelectorAll('mat-expansion-panel');

    expect(panels.length).toBe(3);
    expect(compiled.textContent).toContain('Application shell');
    expect(compiled.textContent).toContain('Generated page');
    expect(compiled.textContent).toContain('Generated form');
  });

  it('should update the preview from lower-pane controls', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll<HTMLButtonElement>('.example-select-button');

    buttons[1].click();
    fixture.detectChanges();

    expect(compiled.querySelector('.preview-card mat-card-title')?.textContent).toContain(
      'Generated page',
    );
    expect(compiled.textContent).toContain('Contoso Retail');
  });

  it('should render the application shell page hierarchy preview by default', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const hierarchy = compiled.querySelector('.page-hierarchy-preview');
    expect(hierarchy).toBeTruthy();
    expect(hierarchy?.textContent).toContain('Orders');
    expect(hierarchy?.textContent).toContain('Order detail');
    expect(hierarchy?.textContent).toContain('Customers');
    expect(hierarchy?.textContent).toContain('Customer detail');
  });
});
