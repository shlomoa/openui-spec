import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'openui-root',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, MatToolbarModule, RouterLink, RouterOutlet],
  template: `
    <mat-toolbar color="primary">empty Page</mat-toolbar>
    <mat-sidenav-container class="shell">
      <mat-sidenav mode="side" opened>

      <a mat-list-item routerLink="/empty-page">empty Page</a>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .shell { min-height: calc(100vh - 64px); }
    .shell-metadata { font-size: 0.875rem; }
    mat-sidenav { width: 18rem; }
  `],
})
export class AppComponent {
}
