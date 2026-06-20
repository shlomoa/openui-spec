import { Routes } from '@angular/router';
import { ComponentList } from './components/component-list/component-list';
import { ComponentViewer } from './components/component-viewer/component-viewer';
import { ComponentApi } from './components/component-api/component-api';
import { ComponentExamples } from './components/component-examples/component-examples';
import { ComponentStyling } from './components/component-styling/component-styling';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'components' },
  { path: 'components', component: ComponentList },
  {
    path: 'components/:id',
    component: ComponentViewer,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'api' },
      { path: 'api', component: ComponentApi },
      { path: 'examples', component: ComponentExamples },
      { path: 'styling', component: ComponentStyling },
    ],
  },
  { path: '**', redirectTo: 'components' },
];
