import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './app-confirm-dialog.component.html',
  styleUrl: './app-confirm-dialog.component.scss',
})
export class AppConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<AppConfirmDialogComponent>);

  close(result: 'cancel' | 'confirm'): void {
    this.dialogRef.close(result);
  }
}
