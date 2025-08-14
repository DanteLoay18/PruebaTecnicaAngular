import { APP_INITIALIZER, inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '../state/auth/auth.actions';
import { TokenStorageService } from '../../features/auth';

export function AuthInitializer() {
  const store = inject(Store);
  const tokenStorage = inject(TokenStorageService);
  const actions$ = inject(Actions);

  return async () => {
    const token = tokenStorage.getToken();
    if (!token) return; 

    store.dispatch(AuthActions.restoreSession({ token }));

    // Espera a que el effect responda (éxito o falla) antes de permitir la navegación
    await firstValueFrom(
      actions$.pipe(ofType(AuthActions.restoreSuccess, AuthActions.restoreFailure))
    );
  };
}
