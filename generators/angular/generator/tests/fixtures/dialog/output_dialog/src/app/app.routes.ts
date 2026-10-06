import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dialog',
    loadComponent: () => import('./pages/dialog/dialog.page').then((m) => m.DialogPage),
    title: 'Dialog example',
  },
  { path: '', pathMatch: 'full', redirectTo: 'dialog' },
  { path: '**', redirectTo: 'dialog' },
];
