import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes, withHashLocation } from '@angular/router';
import { AppComponent } from './app/app.component';
import { defineCustomElements } from '@example/stencil-lib/loader';

defineCustomElements(window);

const routes: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import('./app/pages/list-page.component').then((m) => m.ListPageComponent),
  },
  { path: '', pathMatch: 'full', redirectTo: 'list' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes, withHashLocation()),
  ],
}).catch((err) => console.error(err));
