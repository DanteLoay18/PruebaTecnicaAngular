import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideAuth } from './features/auth';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects, authFeatureKey, AuthInitializer, authReducer, HealthEffects, healthFeatureKey, healthReducer } from './core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { provideAppEnvInitializer } from './core/initializers/app.env-initializer';
import { restaurantReducer, restaurantsFeatureKey } from './core/state/restaurantes/restaurants.reducer';
import { RestaurantsEffects } from './core/state/restaurantes/restaurants.effects';
import { provideRestaurante } from './features/restaurantes/restaurante.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: APP_INITIALIZER, useFactory: AuthInitializer, multi: true },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withEnabledBlockingInitialNavigation(),  withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideHttpClient(),
    ...provideAuth,
    ...provideRestaurante,
    // NgRx Store y Effects
    provideStore({
        [healthFeatureKey]: healthReducer,
        [authFeatureKey]: authReducer,
        [restaurantsFeatureKey]: restaurantReducer
    }),
    provideEffects([HealthEffects, AuthEffects, RestaurantsEffects]),
    provideStoreDevtools({ maxAge: 25, }),
    provideAppEnvInitializer
    

]
};
