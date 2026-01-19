import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { defineCustomElements } from '@example/stencil-lib/loader';

defineCustomElements(window);

bootstrapApplication(AppComponent).catch((err) => console.error(err));
