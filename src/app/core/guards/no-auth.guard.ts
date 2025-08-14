import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, filter, map, race, switchMap, take, tap } from "rxjs";
import { selectAppLoaded, selectAuthLoaded, selectHealthOk, selectIsAuthenticated } from "../state";
import { Actions, ofType } from "@ngrx/effects";
import * as Auth from '../state/auth/auth.actions';

export const noAuthGuard: CanActivateFn = (route, _state) => {
  const store  = inject(Store);
  const router = inject(Router);
  const actions$ = inject(Actions);

  // si ya está cargado, no esperes acciones
  const loaded$ = store.select(selectAuthLoaded).pipe(filter(Boolean), take(1));
  const restoreDone$ = actions$.pipe(ofType(Auth.restoreSuccess, Auth.restoreFailure), take(1));
  
  return race(loaded$, restoreDone$).pipe(        // 👈 espera a que RESTORE termine sí o sí
    switchMap(() =>
      combineLatest([
        store.select(selectHealthOk).pipe(take(1)),
        store.select(selectIsAuthenticated).pipe(take(1)),
      ]).pipe(

        map(([healthOk, isAuth]) => {
          if (!healthOk) return router.createUrlTree(['/maintenance']);
          return !isAuth ? true : router.createUrlTree(['/productos']); // noAuthGuard
        })
      )
    )
  );
};