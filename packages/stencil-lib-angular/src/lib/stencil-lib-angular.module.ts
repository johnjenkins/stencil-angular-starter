import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleInput } from './stencil-generated/components';
import { TextValueAccessor } from './stencil-generated/text-value-accessor';

const DECLARATIONS = [
  ExampleInput,
  TextValueAccessor
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule],
  exports: DECLARATIONS
})
export class StencilLibAngularModule { }
