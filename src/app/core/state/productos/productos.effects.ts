import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ProductActions } from './productos.action';
import * as Sel from './productos.selectors';
import { RestauranteFacade } from '../../../features/productos/application/producto.facade';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';

@Injectable()
export class RestaurantsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private restauranteFacade = inject(RestauranteFacade);
  private categoriaService = inject(CategoriaService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  // Cualquier cambio de query dispara LoadRequested
  queryChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductActions.init,
        ProductActions.refresh,
        ProductActions.changePage,
        ProductActions.changePageSize,
        ProductActions.changeSort
      ),
      map(() => ProductActions.loadRequested())
    )
  );

  // Búsqueda con debounce
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.changeSearch),
      debounceTime(300),
      distinctUntilChanged((a, b) => a.nombre === b.nombre && a.categoriaId === b.categoriaId),
      map(() => ProductActions.loadRequested())
    )
  );




  // Cargar desde el backend (server-side)
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadRequested),
      withLatestFrom(this.store.select(Sel.selectQueryForApi)),
      switchMap(([_, q]) =>
        // ✅ Opción A: si tu Facade acepta un objeto
        this.restauranteFacade.getPagination(q).pipe(
          map(r => ProductActions.loadSucceeded({ data: r.results, total: r.totalRecords })),
          catchError((e) => of(ProductActions.loadFailed({ error: e?.message ?? 'Error' })))
        )

        // ✅ Opción B (descomenta si tu Facade recibe args sueltos):
        // this.restauranteFacade.getPagination(q.page, q.pageSize, q.sort, q.dir, q.search).pipe(
        //   map(r => ProductActions.loadSucceeded({ data: r.data, total: r.total })),
        //   catchError((e) => of(ProductActions.loadFailed({ error: e?.message ?? 'Error' })))
        // )
      )
    )
  );

  createRestaurante$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.create),

      switchMap(({ request }) =>
        this.restauranteFacade.createRestaurante(request).pipe(
          map(r => ProductActions.createSuccess({ message: r.message })),
          catchError(({ error }) => {
            return of(ProductActions.createFailure({ message: error.message }))
          })
        ))
    ));

  createRestauranteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.createSuccess),
        tap(({ message }) => this.toastService.success(message)),
        tap(() => this.router.navigateByUrl('/productos'))
      ),
    { dispatch: false }
  );

  createRestauranteFailute$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.createFailure),
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
      ofType(ProductActions.getOne),

      switchMap(({ id }) =>
        this.restauranteFacade.getById(id).pipe(
          map((restaurante) => ProductActions.getOneSuccess({ entity: restaurante })),
        ))
    ));

  updateRestaurante$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.update),

      switchMap(({ request }) =>
        this.restauranteFacade.updateRestaurante(request).pipe(
          map(r => ProductActions.createSuccess({ message: r.message })),
          catchError(({ error }) => {
            return of(ProductActions.createFailure({ message: error.message }))
          })
        ))
    ));

  updateRestauranteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.updateSuccess),
        tap(({ message }) => this.toastService.success(message)),
        tap(() => this.router.navigateByUrl('/productos'))
      ),
    { dispatch: false }
  );

  updateRestauranteFailute$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.updateFailure),
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

  getCategorias$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getCategorias),

      switchMap(() =>
        this.categoriaService.getCategorias().pipe(
          map((categorias) => ProductActions.getCategoriasSuccess({ categorias  })),
        ))
    ));


    delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.delete),

      switchMap(({ id }) =>
        this.restauranteFacade.delete(id).pipe(
          map(r => ProductActions.deleteSuccess({ message: r.message })),
          catchError(({ error }) => {
            return of(ProductActions.deleteFailure({ message: error.message, messages: error.messages  }))
          })
        ))
    ));

  deleteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.deleteSuccess),
        tap(({ message }) => this.toastService.success(message)),
        tap(() => this.router.navigateByUrl('/productos')),
        map(()=> ProductActions.loadRequested()),
      ),
    // { dispatch: false }
  );

  deleteFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.updateFailure),
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
