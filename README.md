# Stencil + Angular Starter

A minimal reproduction monorepo for testing Stencil components with Angular output targets.

## Versions

- `@stencil/core`: latest
- `@stencil/angular-output-target`: latest
- `@angular/*`: ^21.0.0

## Setup

```bash
# Install dependencies
pnpm install

# Start development mode (builds stencil first, then watches all)
pnpm start
```

The development server will start at http://localhost:4200/
In watch mode all changes to the Stencil components will automatically rebuild the Angular wrappers and reload the Angular app.