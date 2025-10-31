import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Reemplazar provideZoneChangeDetection con:
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};
