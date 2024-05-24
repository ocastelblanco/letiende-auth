import { ApplicationConfig, provideZoneChangeDetection, isDevMode, PLATFORM_ID, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp, initializeServerApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '@environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => {
      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        return initializeApp(environment.firebaseConfig);
      }
      const request: any = { headers: { authorization: '' } };
      // Optional, since it's null in dev-mode and SSG
      //const request = inject(REQUEST, { optional: true });
      const authIdToken = request?.headers.authorization?.split("Bearer ")[1];
      return initializeServerApp(environment.firebaseConfig, {
        authIdToken,
        releaseOnDeref: request || undefined
      });
    }),
    provideFirebaseApp(() => {
      return initializeApp(environment.firebaseConfig)
    }),
    provideAuth(() => getAuth()),
    provideServiceWorker(
      'ngsw-worker.js',
      {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
      }
    )
  ]
};
