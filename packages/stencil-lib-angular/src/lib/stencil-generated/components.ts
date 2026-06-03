/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@example/stencil-lib/components';

import { defineCustomElement as defineExampleInput } from '@example/stencil-lib/components/example-input.js';
import { defineCustomElement as defineExampleList2 } from '@example/stencil-lib/components/example-list-2.js';
@ProxyCmp({
  defineCustomElementFn: defineExampleInput,
  inputs: ['disabled', 'placeholder', 'value']
})
@Component({
  selector: 'example-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'placeholder', 'value'],
  outputs: ['exampleChange', 'exampleFocus', 'exampleBlur'],
})
export class ExampleInput {
  protected el: HTMLExampleInputElement;
  @Output() exampleChange = new EventEmitter<CustomEvent<string>>();
  @Output() exampleFocus = new EventEmitter<CustomEvent<void>>();
  @Output() exampleBlur = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ExampleInput extends Components.ExampleInput {
  /**
   * Emitted when the value changes
   */
  exampleChange: EventEmitter<CustomEvent<string>>;
  /**
   * Emitted when the input receives focus
   */
  exampleFocus: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the input loses focus
   */
  exampleBlur: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineExampleList2,
  inputs: ['items']
})
@Component({
  selector: 'example-list-2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['items'],
})
export class ExampleList2 {
  protected el: HTMLExampleList2Element;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ExampleList2 extends Components.ExampleList2 {}


