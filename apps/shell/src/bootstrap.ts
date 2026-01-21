import { bootstrapApplication } from '@angular/platform-browser';
import { setRemoteDefinitions } from '@nx/angular/mf';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Define the remote micro-frontends with their URLs
// This is required for Dynamic Module Federation
setRemoteDefinitions({
  'product-list': 'http://localhost:4201/remoteEntry.mjs',
  'product-details': 'http://localhost:4202/remoteEntry.mjs',
});

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
