import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { RestaurantsActions } from './restaurants.action';
import * as Sel from './restaurants.selectors';
import { RestauranteFacade } from '../../../features/restaurantes/application/restaurante.facade';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class RestaurantsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private restauranteFacade = inject(RestauranteFacade);
  private toastService = inject(ToastService);
  private router = inject(Router);

  // Cualquier cambio de query dispara LoadRequested
  queryChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RestaurantsActions.init,
        RestaurantsActions.refresh,
        RestaurantsActions.changePage,
        RestaurantsActions.changePageSize,
        RestaurantsActions.changeSort
      ),
      map(() => RestaurantsActions.loadRequested())
    )
  );

  // Búsqueda con debounce
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantsActions.changeSearch),
      debounceTime(300),
      distinctUntilChanged((a, b) => a.search === b.search),
      map(() => RestaurantsActions.loadRequested())
    )
  );




  // Cargar desde el backend (server-side)
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantsActions.loadRequested),
      withLatestFrom(this.store.select(Sel.selectQueryForApi)),
      switchMap(([_, q]) =>
        // ✅ Opción A: si tu Facade acepta un objeto
        this.restauranteFacade.getPagination(q).pipe(
          map(r => RestaurantsActions.loadSucceeded({ data: r.results, total: r.totalNumberOfRecords })),
          catchError((e) => of(RestaurantsActions.loadFailed({ error: e?.message ?? 'Error' })))
        )

        // ✅ Opción B (descomenta si tu Facade recibe args sueltos):
        // this.restauranteFacade.getPagination(q.page, q.pageSize, q.sort, q.dir, q.search).pipe(
        //   map(r => RestaurantsActions.loadSucceeded({ data: r.data, total: r.total })),
        //   catchError((e) => of(RestaurantsActions.loadFailed({ error: e?.message ?? 'Error' })))
        // )
      )
    )
  );

  createRestaurante$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantsActions.create),

      switchMap(({ formData }) =>
        this.restauranteFacade.createRestaurante(formData).pipe(
          map(r => RestaurantsActions.createSuccess({ message: r.message })),
          catchError(({ error }) => {
            // console.log(e);
            return of(RestaurantsActions.createFailure({ message: error.message }))
          })
        ))
    ));

  createRestauranteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RestaurantsActions.createSuccess),
        tap(({ message }) => this.toastService.success(message)),
        tap(() => this.router.navigateByUrl('/restaurantes'))
      ),
    { dispatch: false }
  );

  createRestauranteFailute$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RestaurantsActions.createFailure),
        tap(({ message }) => this.toastService.error(message ?? '')),
        tap(({ messages }) => {
          if (messages != null) {
            messages.forEach((message) => {
              this.toastService.error(message ?? '');
            })
          }
        })
        // tap(() => this.router.navigateByUrl('/restaurantes'))
      ),
    { dispatch: false }
  );

  getOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantsActions.getOne),

      switchMap(({ id }) =>
        this.restauranteFacade.getById(id).pipe(
          map((restaurante) => RestaurantsActions.getOneSuccess({ entity: restaurante })),
        ))
    ));

  updateRestaurante$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantsActions.update),

      switchMap(({ formData }) =>
        this.restauranteFacade.updateRestaurante(formData).pipe(
          map(r => RestaurantsActions.createSuccess({ message: r.message })),
          catchError(({ error }) => {
            // console.log(e);
            return of(RestaurantsActions.createFailure({ message: error.message }))
          })
        ))
    ));

  updateRestauranteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RestaurantsActions.updateSuccess),
        tap(({ message }) => this.toastService.success(message)),
        tap(() => this.router.navigateByUrl('/restaurantes'))
      ),
    { dispatch: false }
  );

  updateRestauranteFailute$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RestaurantsActions.updateFailure),
        tap(({ message }) => this.toastService.error(message ?? '')),
        tap(({ messages }) => {
          if (messages != null) {
            messages.forEach((message) => {
              this.toastService.error(message ?? '');
            })
          }
        })
        // tap(() => this.router.navigateByUrl('/restaurantes'))
      ),
    { dispatch: false }
  );



}
