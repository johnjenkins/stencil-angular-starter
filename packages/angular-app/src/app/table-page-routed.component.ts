import { afterNextRender, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTable } from '@example/stencil-lib-angular';

interface PersonRow {
  id: number;
  name: string;
  role: string;
  salary: number;
}

@Component({
  selector: 'app-table-page-routed',
  standalone: true,
  imports: [CommonModule, DataTable],
  template: `
    <section>
      <h2>Data table (routed, guarded with signal)</h2>
      <span> uncomment the table ready signal to make it work</span>
      <!-- @if (tableReady()) { -->
        <data-table
          [data]="tableData"
          [columns]="tableColumns"
        >
        </data-table>
      <!-- } -->
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
export class TablePageRoutedComponent {
  tableColumns = [
    { fieldName: 'id', headerName: 'ID' },
    { fieldName: 'name', headerName: 'Name' },
    { fieldName: 'role', headerName: 'Role' },
    { fieldName: 'salary', headerName: 'Salary' },
  ];

  tableData: PersonRow[] = [
    { id: 1, name: 'Ada Lovelace', role: 'Engineer', salary: 95000 },
    { id: 2, name: 'Alan Turing', role: 'Researcher', salary: 105000 },
    { id: 3, name: 'Grace Hopper', role: 'Architect', salary: 115000 },
  ];
  tableDataView: PersonRow[] = [];
  tableReady = signal(false);

  constructor() {
    // Routed activation races Stencil's connectedCallback: the custom element
    // mounts before Angular has applied inputs / projected slot children.
    // Defer rendering until after the next CD turn so bindings are in place.
    afterNextRender(() => this.tableReady.set(true));
  }

  onViewRendered(event: Event) {
    this.tableDataView = (event as CustomEvent<PersonRow[]>).detail ?? [];
  }
}
