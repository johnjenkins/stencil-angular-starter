import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'stencil-lib',
  hashFileNames: false,
  sourceMap: true,
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: '@example/stencil-lib',
      directivesProxyFile: '../stencil-lib-angular/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../stencil-lib-angular/src/lib/stencil-generated/index.ts',
      valueAccessorConfigs: [
        {
          elementSelectors: ['example-input'],
          event: 'exampleChange',
          targetAttr: 'value',
          type: 'text',
        },
      ],
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
  ],
  extras: {
    enableImportInjection: true,
  }
};
