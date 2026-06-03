import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ExampleInput } from '@example/stencil-lib-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, ExampleInput, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="container">
      <h1>Stencil + Angular Integration</h1>

      <section>
        <example-input
          [value]="basicValue()"
          placeholder="Type something..."
          (exampleChange)="onBasicChange($event)"
        >
          <span slot="label">Basic Input</span>
          <span slot="helper">Current value: {{ basicValue() }}</span>
        </example-input>
      </section>

      <nav>
        <a routerLink="/list" routerLinkActive="active">List</a>
      </nav>

      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
    }

    section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    nav {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }

    nav a {
      padding: 6px 12px;
      border-radius: 6px;
      text-decoration: none;
      color: #333;
      background: #eee;
    }

    nav a.active {
      background: #333;
      color: white;
    }

    h1 {
      color: #333;
    }

    h2 {
      color: #666;
      font-size: 16px;
      margin-top: 0;
    }
  `]
})
export class AppComponent {
  basicValue = signal('');
  formControl = new FormControl('initial value');

  onBasicChange(event: CustomEvent<string>) {
    this.basicValue.set(event.detail);
  }
}
