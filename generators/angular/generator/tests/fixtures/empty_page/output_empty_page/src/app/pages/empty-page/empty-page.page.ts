import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'openui-empty-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule, MatChipsModule],
  templateUrl: './empty-page.page.html',
  styleUrl: './empty-page.page.scss',
})
export class EmptyPagePage {
  protected readonly componentContract = [];
}
