import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { AppConfirmDialogComponent } from './app-confirm-dialog.component';

/**
 * Validation tests for the dialog output fixture (Step 5 of
 * populating_test_use_cases.md). They assert that the generated
 * `app-confirm-dialog` component manifests the confirm-deletion dialog
 * described by `dialog.example.json`:
 *
 * - `DialogTitle` text "Delete item?"
 * - `DialogContent` text "This action cannot be undone."
 * - `DialogActions` with a Cancel button wired to `close('cancel')` and a
 *   Delete button wired to `close('confirm')`.
 */
describe('AppConfirmDialogComponent (dialog output fixture)', () => {
  let dialogRef: { close: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    dialogRef = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AppConfirmDialogComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MatDialogRef, useValue: dialogRef },
      ],
    }).compileComponents();
  });

  it('creates the generated dialog component', () => {
    const fixture = TestBed.createComponent(AppConfirmDialogComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the dialog title from the example JSON', () => {
    const fixture = TestBed.createComponent(AppConfirmDialogComponent);
    fixture.detectChanges();
    const title = (fixture.nativeElement as HTMLElement).querySelector('[mat-dialog-title]');
    expect(title?.textContent).toContain('Delete item?');
  });

  it('renders the dialog content from the example JSON', () => {
    const fixture = TestBed.createComponent(AppConfirmDialogComponent);
    fixture.detectChanges();
    const content = (fixture.nativeElement as HTMLElement).querySelector('mat-dialog-content');
    expect(content?.textContent).toContain('This action cannot be undone.');
  });

  it('renders Cancel and Delete actions in the dialog actions row', () => {
    const fixture = TestBed.createComponent(AppConfirmDialogComponent);
    fixture.detectChanges();
    const buttons = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('mat-dialog-actions button'),
    );
    const labels = buttons.map((button) => button.textContent?.trim());
    expect(labels).toEqual(['Cancel', 'Delete']);
  });

  it('closes with "cancel" when the Cancel button is clicked', () => {
    const fixture = TestBed.createComponent(AppConfirmDialogComponent);
    fixture.detectChanges();
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      'mat-dialog-actions button',
    );
    buttons[0].click();
    expect(dialogRef.close).toHaveBeenCalledWith('cancel');
  });

  it('closes with "confirm" when the Delete button is clicked', () => {
    const fixture = TestBed.createComponent(AppConfirmDialogComponent);
    fixture.detectChanges();
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      'mat-dialog-actions button',
    );
    buttons[1].click();
    expect(dialogRef.close).toHaveBeenCalledWith('confirm');
  });
});
