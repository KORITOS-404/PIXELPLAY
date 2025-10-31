import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

console.log('MAIN.TS EJECUTÁNDOSE');

bootstrapApplication(App, appConfig)
  .then(() => console.log('ANGULAR ARRANCÓ'))
  .catch(err => console.error('ERROR AL ARRANCAR:', err));
