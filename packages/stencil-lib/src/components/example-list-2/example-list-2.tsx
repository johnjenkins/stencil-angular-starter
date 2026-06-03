import { Component, Prop, State, Watch, h, Host } from '@stencil/core';

export interface ExampleList2Item {
  text: string;
  date?: string | Date;
}

@Component({
  tag: 'example-list-2',
  styleUrl: 'example-list-2.css',
  scoped: true,
})
export class ExampleList2 {
  /** The list of items to display */
  @Prop({ mutable: true }) items: ExampleList2Item[] = [];

  @State() _items: ExampleList2Item[] = [];

  componentWillLoad() {
    this._items = this.items;
  }

  @Watch('items')
  handleItemsChange(newValue: ExampleList2Item[]) {
    this._items = newValue;
  }

  render() {
    return (
      <Host>
        <ul class="list">
          {this._items.map((item, i) => (
            <li class="list-item">
              <slot name={`item-${i}`}>{item.text}</slot>
              {item.date && <span class="date">{item.date}</span>}
            </li>
          ))}
        </ul>
      </Host>
    );
  }
}
