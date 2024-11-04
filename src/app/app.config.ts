import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withJsonpSupport } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withJsonpSupport()
    ),provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()]
};
