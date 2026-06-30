import { Component, inject, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AppConfirmDialogComponent } from './components/app-confirm-dialog/app-confirm-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button mat-raised-button color="warn" (click)="openDialog()">Delete item</button>
  `,
})
export class App {
  private readonly dialog = inject(MatDialog);

  readonly isOpen = signal(false);

  openDialog(): void {
    this.isOpen.set(true);

    const dialogRef = this.dialog.open(AppConfirmDialogComponent, {
      ariaLabel: 'Confirm deletion',
      restoreFocus: true,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => this.onClose(result));
  }

  onClose(result: unknown): void {
    this.isOpen.set(false);
    console.log('Dialog closed with:', result);
  }
}

bootstrapApplication(App, {
  providers: [provideAnimations()]
});
