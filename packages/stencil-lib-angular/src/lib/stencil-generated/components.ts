/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import { Components } from '@example/stencil-lib';


@ProxyCmp({
  inputs: ['disabled', 'placeholder', 'value']
})
@Component({
  selector: 'example-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'placeholder', 'value'],
  outputs: ['exampleChange', 'exampleFocus', 'exampleBlur'],
  standalone: false
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


