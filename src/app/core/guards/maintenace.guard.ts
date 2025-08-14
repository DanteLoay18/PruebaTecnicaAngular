import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectHealthOk, selectAuthLoaded, selectIsAuthenticated, selectAuthRestoring } from '../state';
import { take, map, switchMap, of, filter, race, tap, combineLatest } from 'rxjs';
import * as Auth from '../state/auth/auth.actions';
import { Actions, ofType } from '@ngrx/effects';
import { TokenStorageService } from '../../features/auth';

export const maintenanceGuard: CanMatchFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const actions$ = inject(Actions);
  const tokenStorage = inject(TokenStorageService);

  return store.select(selectHealthOk).pipe(
    take(1),
    switchMap(ok => {
    
      if (!ok) return of(true); // backend caído -> deja entrar a /maintenance
      return combineLatest([
        store.select(selectAuthLoaded).pipe(take(1)),
        store.select(selectAuthRestoring).pipe(take(1)),
        store.select(selectIsAuthenticated).pipe(take(1)),
      ]).pipe(
        switchMap(([loaded, restoring, isAuth]) => {
            
          if (loaded && isAuth) return of(router.createUrlTree(['/productos']));

          const token = tokenStorage.getToken();
          if (!token) return of(router.createUrlTree(['/productos']));

          if (restoring) {
            return race(
              actions$.pipe(ofType(Auth.restoreSuccess), take(1)),
              actions$.pipe(ofType(Auth.restoreFailure), take(1))
            ).pipe(map(() => router.createUrlTree(['/productos'])));
          }

          store.dispatch(Auth.restoreSession({ token }));
          return race(
            actions$.pipe(ofType(Auth.restoreSuccess), take(1)),
            actions$.pipe(ofType(Auth.restoreFailure), take(1))
          ).pipe(map(() => router.createUrlTree(['/productos'])));
        })
      );
    })
  );
};

