import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'table',
    loadComponent: () =>
      import('./table-page-routed.component').then(m => m.TablePageRoutedComponent),
  },
  {
    path: 'input',
    loadComponent: () =>
      import('./input-page.component').then(m => m.InputPageComponent),
  },
  { path: '', pathMatch: 'full', redirectTo: 'table' },
  { path: '**', redirectTo: 'table' },
];
