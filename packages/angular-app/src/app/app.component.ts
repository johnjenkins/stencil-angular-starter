import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExampleInput, ExampleList2 } from '@example/stencil-lib-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, ExampleInput, ExampleList2],
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

      <section>
        <h2>Example List</h2>
        <example-list-2 [items]="items"></example-list-2>

        <h2>Example List 2 (with date field)</h2>
        <example-list-2 [items]="itemsWithDate"></example-list-2>
        <button type="button" (click)="reload()">Reload (shuffle)</button>
      </section>
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

    h1 {
      color: #333;
    }

    h2 {
      color: #666;
      font-size: 16px;
      margin-top: 0;
    }

    button {
      margin-top: 12px;
    }
  `]
})
export class AppComponent {
  basicValue = signal('');
  formControl = new FormControl('initial value');

  items = [
    { text: 'First' },
    { text: 'Second' },
    { text: '' },
  ];

  itemsWithDate = [
    { text: 'Alpha', date: new Date('2026-01-15') },
    { text: 'Beta', date: new Date('2026-03-22') },
    { text: 'Gamma' },
  ];

  onBasicChange(event: CustomEvent<string>) {
    this.basicValue.set(event.detail);
  }

  addItem() {
    this.items = [...this.items, { text: `New ${this.items.length + 1}` }];
  }

  reload() {
    this.items = this.shuffle(this.items);
    this.itemsWithDate = this.shuffle(this.itemsWithDate);
  }

  private shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
