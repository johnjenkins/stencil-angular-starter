import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleInput } from '@example/stencil-lib-angular';

@Component({
  selector: 'app-input-page',
  standalone: true,
  imports: [CommonModule, ExampleInput],
  template: `
    <section>
      <h2>Example input</h2>
      <example-input
        [value]="basicValue()"
        placeholder="Type something..."
        (exampleChange)="onBasicChange($event)"
      >
        <span slot="label">Basic Input</span>
        <span slot="helper">Current value: {{ basicValue() }}</span>
      </example-input>
    </section>
  `,
  styles: [`
    section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 {
      color: #666;
      font-size: 16px;
      margin-top: 0;
    }
  `]
})
export class InputPageComponent {
  basicValue = signal('');

  onBasicChange(event: CustomEvent<string>) {
    this.basicValue.set(event.detail);
  }
}
