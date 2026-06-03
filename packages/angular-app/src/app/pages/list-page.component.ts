import { Component, OnInit, signal } from '@angular/core';
import { ExampleList } from '@example/stencil-lib-angular';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [ExampleList],
  template: `
    <section>
      <h2>Example List</h2>
      <h3>First Table not rendered with zone change detection</h3>
      <example-list [items]="items"></example-list>
      <h3>Second Table rendered with rendered (@)if and signal change from false to true</h3>
      @if (ready()) {
        <example-list [items]="items"></example-list>
      }
      <button type="button" (click)="addItem()">Add item</button>
    </section>
  `,
  styles: [`
    section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    button {
      margin-top: 12px;
    }
  `],
})
export class ListPageComponent implements OnInit {
  ready = signal(false);

  items = [
    { text: 'First' },
    { text: 'Second' },
    { text: '' },
  ];

  ngOnInit() {
    this.ready.set(true);
  }

  addItem() {
    this.items = [...this.items];
  }
}
