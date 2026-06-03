import { Component, Prop, State, Watch, h, Host } from '@stencil/core';

export interface ExampleListItem {
  text: string;
}

@Component({
  tag: 'example-list',
  styleUrl: 'example-list.css',
  scoped: true,
})
export class ExampleList {
  /** The list of items to display */
  @Prop({ mutable: true }) items: ExampleListItem[] = [];

  @State() _items: ExampleListItem[] = [];

  componentWillLoad() {
    this._items = this.items;
  }

  @Watch('items')
  handleItemsChange(newValue: ExampleListItem[]) {
    this._items = newValue;
  }
  render() {
    return (
      <Host>
        <ul class="list">
          {this._items.map((item, i) => (
            <li class="list-item">
              <slot name={`item-${i}`}>{item.text}</slot>
            </li>
          ))}
        </ul>
      </Host>
    );
  }
}
