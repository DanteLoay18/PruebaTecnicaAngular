import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../features/auth';

@Injectable()
export class AuthEffects {
    private authFacade= inject(AuthFacade);
    private actions$= inject(Actions);
    private router= inject(Router);

  

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authLogin),
      switchMap(({ credentials }) =>
        this.authFacade.login(credentials).pipe(
          map(({ user, accessToken }) =>
            AuthActions.authLoginSuccess({ user, token : accessToken })
          ),
          catchError(({error}) =>
            of(AuthActions.authLoginFailure({ error: error.message || 'Error al iniciar sesión' }))
          )
        )
      )
    )
  );

  // Redirigir al home si login fue exitoso
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authLoginSuccess),
        tap(() => this.router.navigateByUrl('/productos'))
      ),
    { dispatch: false }
  );

  // Logout opcional con redirección
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authLogout),
        tap(() => {
          this.authFacade.logout();
          this.router.navigateByUrl('/auth');
        }),
        map(() => AuthActions.restoreFailure())
      ),
    // { dispatch: false }
  );

  restore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.restoreSession),
      exhaustMap(() =>
        this.authFacade.checkStatus().pipe(                 // GET /auth/me o /auth/check
          map(({user, accessToken}) => AuthActions.restoreSuccess({ user , token: accessToken })),
          catchError(() => of(AuthActions.restoreFailure()))
        )
      )
    )
  );
}
