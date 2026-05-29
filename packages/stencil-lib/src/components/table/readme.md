# data-table



<!-- Auto Generated Below -->


## Overview

A minimal data table component.
Accepts `data` and `columns` (array or JSON string) and emits `viewRendered`
whenever the visible rows change so consumers can render custom cells.

## Properties

| Property   | Attribute   | Description                                                                                                                                                                                   | Type                          | Default |
| ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- |
| `bindKey`  | `bind-key`  | Property name used to uniquely identify each row. Only used when `enableId` is `true`.                                                                                                        | `string`                      | `'key'` |
| `columns`  | `columns`   | The columns to display. Accepts an array or a JSON string.                                                                                                                                    | `DataTableColumn[] \| string` | `[]`    |
| `data`     | `data`      | The rows to display. Accepts an array or a JSON string.                                                                                                                                       | `DataTableRow[] \| string`    | `[]`    |
| `enableId` | `enable-id` | When `true`, the cell slot names use `row[bindKey]` instead of the row index (e.g. `cell-name-{key}` rather than `cell-name-0`). Useful when the underlying dataset is reordered or filtered. | `boolean`                     | `false` |


## Events

| Event          | Description                                                                  | Type                          |
| -------------- | ---------------------------------------------------------------------------- | ----------------------------- |
| `viewRendered` | Emitted whenever the visible rows change. Useful for rendering custom cells. | `CustomEvent<DataTableRow[]>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
