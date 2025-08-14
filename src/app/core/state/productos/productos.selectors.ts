import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsFeatureKey, ProductsState } from './productos.reducer';

// 🔑 Debe coincidir con el nombre con el que registraste el reducer en provideState(...)

export const selectProductsState =
  createFeatureSelector<ProductsState>(productsFeatureKey);

export const selectRows      = createSelector(selectProductsState, s => s.rows);
export const selectTotal     = createSelector(selectProductsState, s => s.total);
export const selectLoading   = createSelector(selectProductsState, s => s.loading);
export const selectHeaders   = createSelector(selectProductsState, s => s.headers);
export const selectError     = createSelector(selectProductsState, s => s.error ?? null);
export const selectIsSaving     = createSelector(selectProductsState, s => s.isSaving ?? false);
export const selectIsLoadingForm     = createSelector(selectProductsState, s => s.isLoadingForm );
export const selectForm     = createSelector(selectProductsState, s => s.form ?? null);
export const selectCategorias     = createSelector(selectProductsState, s => s.categorias);

export const selectQuery     = createSelector(selectProductsState, s => s.query);
export const selectPage      = createSelector(selectQuery, q => q.page);
export const selectPageSize  = createSelector(selectQuery, q => q.size);
export const selectNombre     = createSelector(selectQuery, q => q.nombre);
export const selectSearch    = createSelector(selectQuery, q => q.categoria ?? '');

// Derivados útiles
export const selectTotalPages = createSelector(
  selectTotal, selectPageSize,
  (total, size) => Math.max(1, Math.ceil(total / Math.max(1, size)))
);

export const selectCanPrev = createSelector(selectPage, p => p > 1);
export const selectCanNext = createSelector(selectPage, selectTotalPages, (p, t) => p < t);

// (Opcional) query ya “normalizada” para la API
export const selectQueryForApi = createSelector(selectQuery, q => ({
  page: q.page,
  size: q.size,
  categoria: q.categoria,
  nombre: q.nombre ?? '',
}));
