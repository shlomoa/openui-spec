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

  it('should render generated previews with Angular Material components', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll<HTMLButtonElement>('.example-select-button');

    expect(compiled.querySelector('mat-toolbar.preview-toolbar')).toBeTruthy();
    expect(compiled.querySelector('.shell-preview mat-nav-list')).toBeTruthy();

    buttons[1].click();
    fixture.detectChanges();
    expect(compiled.querySelector('.page-preview table[mat-table]')).toBeTruthy();

    buttons[2].click();
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.form-preview mat-form-field').length).toBe(3);
    expect(compiled.querySelector('.form-preview mat-select')).toBeTruthy();
    expect(compiled.querySelector('.form-preview button[mat-raised-button]')).toBeTruthy();
  });
});
