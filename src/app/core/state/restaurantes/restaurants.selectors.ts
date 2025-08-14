import { createFeatureSelector, createSelector } from '@ngrx/store';
import { restaurantsFeatureKey, RestaurantsState } from './restaurants.reducer';

// 🔑 Debe coincidir con el nombre con el que registraste el reducer en provideState(...)

export const selectRestaurantsState =
  createFeatureSelector<RestaurantsState>(restaurantsFeatureKey);

export const selectRows      = createSelector(selectRestaurantsState, s => s.rows);
export const selectTotal     = createSelector(selectRestaurantsState, s => s.total);
export const selectLoading   = createSelector(selectRestaurantsState, s => s.loading);
export const selectHeaders   = createSelector(selectRestaurantsState, s => s.headers);
export const selectError     = createSelector(selectRestaurantsState, s => s.error ?? null);
export const selectIsSaving     = createSelector(selectRestaurantsState, s => s.isSaving ?? false);
export const selectIsLoadingForm     = createSelector(selectRestaurantsState, s => s.isLoadingForm );
export const selectForm     = createSelector(selectRestaurantsState, s => s.form ?? null);

export const selectQuery     = createSelector(selectRestaurantsState, s => s.query);
export const selectPage      = createSelector(selectQuery, q => q.page);
export const selectPageSize  = createSelector(selectQuery, q => q.pageSize);
export const selectSort      = createSelector(selectQuery, q => q.sort);
export const selectDir       = createSelector(selectQuery, q => q.dir ?? 'asc');
export const selectSearch    = createSelector(selectQuery, q => q.search ?? '');

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
  pageSize: q.pageSize,
  sort: q.sort ?? undefined,
  dir: q.dir ?? 'asc',
  search: (q.search ?? '').trim() || undefined,
}));
