import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideAuth } from './features/auth';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects, authFeatureKey, AuthInitializer, authReducer, HealthEffects, healthFeatureKey, healthReducer } from './core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { provideAppEnvInitializer } from './core/initializers/app.env-initializer';
import { RestaurantsEffects } from './core/state/productos/productos.effects';
import { provideProducto } from './features/productos/producto.provider';
import { productReducer, productsFeatureKey } from './core/state/productos/productos.reducer';
// import { provideRestaurante } from './features/productos/producto.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: APP_INITIALIZER, useFactory: AuthInitializer, multi: true },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withEnabledBlockingInitialNavigation(),  withRouterConfig({ onSameUrlNavigation: 'reload' })),
    ...provideAuth,
    ...provideProducto,
    // NgRx Store y Effects
    provideStore({
        [healthFeatureKey]: healthReducer,
        [authFeatureKey]: authReducer,
        [productsFeatureKey]: productReducer
    }),
    provideEffects([HealthEffects, AuthEffects, RestaurantsEffects]),
    provideStoreDevtools({ maxAge: 25, }),
    provideAppEnvInitializer
    

]
};
