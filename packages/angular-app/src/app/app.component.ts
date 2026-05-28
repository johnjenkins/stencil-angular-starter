import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TablePageComponent } from './table-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TablePageComponent],
  template: `
    <div class="container">
      <h1>Stencil + Angular Integration</h1>
      <app-table-page></app-table-page>
      <nav class="tabs">
        <a routerLink="/table" routerLinkActive="active">Table</a>
        <a routerLink="/input" routerLinkActive="active">Input</a>
      </nav>

      <router-outlet />
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
    }
    h1 {
      color: #333;
    }
    .tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    .tabs a {
      padding: 6px 12px;
      border-radius: 6px;
      text-decoration: none;
      color: #555;
      background: #eee;
    }
    .tabs a.active {
      background: #333;
      color: white;
    }
  `]
})
export class AppComponent {}
