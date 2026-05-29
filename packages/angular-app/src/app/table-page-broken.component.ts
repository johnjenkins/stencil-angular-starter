import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTable } from '@example/stencil-lib-angular';

interface PersonRow {
  id: number;
  name: string;
  role: string;
  startDate: Date;
}

@Component({
  selector: 'app-table-page-broken',
  standalone: true,
  imports: [CommonModule, DataTable],
  template: `
    <section>
      <h2>table-page-broken: Date cell in &lt;custom-table&gt;</h2>
      <h3>Broken in Stencil 4.41.2: keyed-children diff no longer tolerates non-primitive vnode children. Change betweeen versions 4.41.2 and 4.41.1 to get the error</h3>
      <span>Reload button forces table to re-render with same data </span>
      <button type="button" (click)="reload()">Reload data</button>

      <data-table
        [data]="tableData"
        [columns]="tableColumns"
      >
      </data-table>

      <p class="explain">
        <strong>Why this crashes on Reload:</strong>
        the <code>startDate</code> cell holds a raw <code>Date</code> instance.
        On the initial render Stencil mounts each <code>&lt;td&gt;</code> with that
        non-primitive child and everything looks fine. On Reload we hand the
        table a new array of fresh row objects with the same shape, which
        triggers Stencil&apos;s keyed-children diff to reorder/patch the existing
        rows. Stencil 4.41.2&apos;s diff assumes text-like vnode children expose a
        <code>length</code> (string/array); when it encounters the <code>Date</code>
        object it throws
        <code>TypeError: Cannot read properties of undefined (reading 'length')</code>.
      </p>
      <p class="explain">
        <strong>Fix &mdash; coerce Date cells to primitives before rendering:</strong>
        either map the data
        (<code>startDate: row.startDate.toISOString()</code>) or, inside the
        component, coerce in the cell renderer
        (<code>{{ '{' }}toCellText(row[field]){{ '}' }}</code> returning a string for
        <code>Date</code>/objects). Primitives (string / number / boolean) render
        safely through the keyed diff.
      </p>
    </section>
  `,
  styles: [`
    section { background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 16px; }
    button { margin-right: 6px; margin-bottom: 8px; }
    .explain { background: #fff8e1; border-left: 4px solid #f0a500; padding: 10px 14px; margin: 12px 0 0; font-size: 13px; line-height: 1.5; }
    .explain code { background: #f4f4f4; padding: 1px 4px; border-radius: 3px; font-size: 12px; }
  `],
})
export class TablePageBrokenComponent {
  tableColumns = [
    { fieldName: 'id', headerName: 'ID' },
    { fieldName: 'name', headerName: 'Name' },
    { fieldName: 'role', headerName: 'Role' },
    { fieldName: 'startDate', headerName: 'Start Date' },
  ];

  tableData: PersonRow[] = [
    { id: 1, name: 'Ada Lovelace', role: 'Engineer', startDate: new Date(2026, 0, 15) },
    { id: 2, name: 'Alan Turing', role: 'Researcher', startDate: new Date(2026, 3, 22) },
    { id: 3, name: 'Grace Hopper', role: 'Architect', startDate: new Date(2026, 7, 9) },
  ];

  reload() {
    this.tableData = this.tableData.map((r) => ({ ...r }));
  }
}
