import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'empty-page',
    loadComponent: () => import('./pages/empty-page/empty-page.page').then((m) => m.EmptyPagePage),
    title: 'empty Page',
  },
  { path: '', pathMatch: 'full', redirectTo: 'empty-page' },
  { path: '**', redirectTo: 'empty-page' },
];
