// app/core/initializers/app.env-initializer.ts
import { inject, provideEnvironmentInitializer } from '@angular/core';
import { Store } from '@ngrx/store';
import * as HealthActions from '../../core/state/health/health.actions';
import * as AuthActions from '../../core/state/auth/auth.actions';


// import { restoreFailure, restoreSession } from '../../state/auth/auth.actions';
import { TokenStorageService } from '../../features/auth';

export const provideAppEnvInitializer = provideEnvironmentInitializer(() => {
  const store = inject(Store);
  const tokenStorage = inject(TokenStorageService);

  // Dispara ambos en paralelo (NO await)
  store.dispatch(HealthActions.checkBackendHealth());
  const token = tokenStorage.getToken();
  store.dispatch(token ? AuthActions.restoreSession({ token }) : AuthActions.restoreFailure());
});
