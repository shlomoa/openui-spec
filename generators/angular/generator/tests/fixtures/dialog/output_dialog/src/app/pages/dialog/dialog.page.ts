import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'openui-dialog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule, MatChipsModule],
  templateUrl: './dialog.page.html',
  styleUrl: './dialog.page.scss',
})
export class DialogPage {
  protected readonly componentContract = [];
}
