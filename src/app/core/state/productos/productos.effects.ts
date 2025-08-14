import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ProductActions } from './productos.action';
import * as Sel from './productos.selectors';
import { ProductoFacade } from '../../../features/productos/application/producto.facade';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';

@Injectable()
export class RestaurantsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private productoFacade = inject(ProductoFacade);
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
        this.productoFacade.getPagination(q).pipe(
          map(r => ProductActions.loadSucceeded({ data: r.results, total: r.totalRecords })),
          catchError((e) => of(ProductActions.loadFailed({ error: e?.message ?? 'Error' })))
        )

      )
    )
  );

  createRestaurante$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.create),

      switchMap(({ request }) =>
        this.productoFacade.create(request).pipe(
          map(r => ProductActions.createSuccess({ message: r.message })),
          catchError(({ error }) => {
            return of(ProductActions.createFailure({ message: error.message }))
          })
        ))
    ));

  createSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.createSuccess),
        tap(({ message }) => this.toastService.success(message)),
        tap(() => this.router.navigateByUrl('/productos'))
      ),
    { dispatch: false }
  );

  createFailute$ = createEffect(
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
      ),
    { dispatch: false }
  );

  getOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getOne),

      switchMap(({ id }) =>
        this.productoFacade.getById(id).pipe(
          map((restaurante) => ProductActions.getOneSuccess({ entity: restaurante })),
        ))
    ));

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.update),

      switchMap(({ request }) =>
        this.productoFacade.update(request).pipe(
          map(r => ProductActions.createSuccess({ message: r.message })),
          catchError(({ error }) => {
            return of(ProductActions.createFailure({ message: error.message }))
          })
        ))
    ));

  updateSuccess$ = createEffect(
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
        this.productoFacade.delete(id).pipe(
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
      ),
    { dispatch: false }
  );

}
