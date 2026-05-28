import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'stencil-lib',
  hashFileNames: false,
  buildEs5: false,
  sourceMap: false,
  extras: {
    enableImportInjection: true,
    experimentalSlotFixes: true,
    scopedSlotTextContentFix: true,
  },
  testing: {
    testPathIgnorePatterns: ['node_modules', 'dist'],
    setupFiles: [],
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
      generateTypeDeclarations: true,
    },
    {
      type: 'docs-json',
      file: 'dist/docs/components.json',
    },
    {
      type: 'docs-readme',
    },
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
  ],
};
