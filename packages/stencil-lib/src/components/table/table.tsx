import { Component, h, Prop, State, Watch, Event, EventEmitter, Host, Element } from '@stencil/core';

export type DataTableBreakpoint = 'small' | 'medium' | 'large';

export interface DataTableColumn {
  /** Property name on each row to display in this column. */
  fieldName: string;
  /** Header label displayed in the column header. Falls back to fieldName. */
  headerName?: string;
}

export type DataTableRow = Record<string, any>;

/**
 * A minimal data table component.
 * Accepts `data` and `columns` (array or JSON string) and emits `viewRendered`
 * whenever the visible rows change so consumers can render custom cells.
 */
@Component({
  tag: 'data-table',
  styleUrl: 'table.css',
  shadow: false,
  scoped: true,
})
export class DataTable {
  @Element() el!: HTMLElement;

  /** The rows to display. Accepts an array or a JSON string. */
  @Prop({ mutable: true, reflect: true }) data: string | DataTableRow[] = [];

  /** The columns to display. Accepts an array or a JSON string. */
  @Prop({ mutable: true, reflect: true }) columns: string | DataTableColumn[] = [];

  /**
   * Property name used to uniquely identify each row. Only used when
   * `enableId` is `true`.
   * @defaultValue "key"
   */
  @Prop({ mutable: true, reflect: true }) bindKey: string = 'key';

  /**
   * When `true`, the cell slot names use `row[bindKey]` instead of the row
   * index (e.g. `cell-name-{key}` rather than `cell-name-0`). Useful when the
   * underlying dataset is reordered or filtered.
   * @defaultValue false
   */
  @Prop({ mutable: true, reflect: true }) enableId: boolean = false;

  /** Emitted whenever the visible rows change. Useful for rendering custom cells. */
  @Event() viewRendered!: EventEmitter<DataTableRow[]>;

  /** Emitted when the host crosses a breakpoint threshold. */
  @Event({ bubbles: true, composed: true }) screenSizeChanged!: EventEmitter<DataTableBreakpoint>;

  @State() private _data: DataTableRow[] = [];
  @State() private _columns: DataTableColumn[] = [];
  @State() private _slicedData: DataTableRow[] = [];
  @State() private _loaded = false;
  @State() private _currentBreakpoint: DataTableBreakpoint | null = null;

  private _resizeObserver?: ResizeObserver;

  @Watch('data')
  handleDataChanged(value: string | DataTableRow[]) {
    this._data = this.parse(value);
    if (this._loaded) {
      this.emitViewRendered();
    }
  }

  @Watch('columns')
  handleColumnsChanged(value: string | DataTableColumn[]) {
    this._columns = this.parse(value);
    if (this._loaded) {
      this.emitViewRendered();
    }
  }

  componentWillLoad() {
    this.handleColumnsChanged(this.columns);
    this.handleDataChanged(this.data);
    this.breakpointChanged(document.body.clientWidth);
    this.emitViewRendered();
    this._loaded = true;
  }

  componentDidLoad() {
    if (typeof ResizeObserver === 'undefined') return;
    this._resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.breakpointChanged(entry.contentRect.width);
      }
    });
    this._resizeObserver.observe(this.el);
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }

  /** Same thresholds as pt-table: >=992 large, >=768 medium, else small. */
  private breakpointChanged(width: number) {
    const previous = this._currentBreakpoint;
    let next: DataTableBreakpoint;
    if (width >= 992) {
      next = 'large';
    } else if (width >= 768) {
      next = 'medium';
    } else {
      next = 'small';
    }
    if (previous !== next) {
      this._currentBreakpoint = next;
      this.screenSizeChanged.emit(next);
      if (this._loaded) {
        this.emitViewRendered();
      }
    }
  }

  private emitViewRendered() {
    this._slicedData = this._data.slice(-2); // return last two items for demo
    this.viewRendered.emit(this._slicedData);
  }

  private parse<T>(value: string | T[]): T[] {
    try {
      if (value == null) return [];
      if (typeof value === 'string') {
        if (value.trim() === '') return [];
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      }
      return Array.isArray(value) ? value : [];
    } catch (err) {
      console.error('data-table: invalid JSON', err);
      return [];
    }
  }

  private headerLabel(column: DataTableColumn): string {
    return column.headerName ?? column.fieldName;
  }


  render() {
    return (
      <Host>
        <table class="data-table">
          <thead>
            <tr>
              {this._columns.map(column => (
                <th
                  key={column.fieldName}
                >
                  <slot name={`header-${column.fieldName}`}>{this.headerLabel(column)}</slot>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this._slicedData.length === 0 && (
              <tr>
                <td class="empty" colSpan={this._columns.length || 1}>
                  <slot name="empty">No data</slot>
                </td>
              </tr>
            )}
            {this._slicedData.map((row, rowIndex) => {
              const rowKey = this.enableId && row?.[this.bindKey] !== undefined
                ? row[this.bindKey]
                : rowIndex;
              return (
                <tr key={rowKey}>
                  {this._columns.map(column => (
                    <td
                      key={`${rowKey}-${column.fieldName}`}
                    >
                      <slot name={`cell-${column.fieldName}-${rowKey}`}>
                        {row?.[column.fieldName]}
                      </slot>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Host>
    );
  }
}
