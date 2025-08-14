// restaurants.reducer.ts
import { createFeature, createReducer, on } from '@ngrx/store';
import { TableState } from '../../models';
import { RestaurantsActions  } from './restaurants.action';
import { Restaurante } from '../../../features/restaurantes/domain/restaurante.model';

export type RestaurantsState = TableState<Restaurante>;

const initialState: RestaurantsState = {
  rows: [],
  total: 0,
  loading: false,
  error: null,
  query: { page: 1, pageSize: 10, sort: '', dir: 'asc', search: '', },
  headers: [
    { label: 'Restaurante', key: 'nombre', sortable: true, align: 'left' },
    { label: 'Descripción', key: 'descripcion', sortable: true, align: 'left' },
    { label: 'Tiempo', key: 'tiempoEntrega', sortable: true, align: 'right', width: 'w-32' },
    { label: 'Estado', key: 'activo', sortable: true, align: 'left', width: 'w-32' },
    { label: 'Acciones', key: 'activo', sortable: false, align: 'left', width: 'w-32' },
  ],
  isSaving: false,
  form: null,
  isLoadingForm: false

  
};
export const restaurantsFeatureKey = 'restaurants';

export const restaurantReducer = createReducer(
  initialState,

  on(RestaurantsActions.changePage, (s, { page }) => ({ ...s, query: { ...s.query, page } })),
  on(RestaurantsActions.changePageSize, (s, { pageSize }) => ({
    ...s,
    query: { ...s.query, pageSize, page: 1 }      // resetea a página 1
  })),
  on(RestaurantsActions.changeSort, (s, { sort, dir }) => ({
    ...s,
    query: { ...s.query, sort, dir, page: 1 }
  })),
  on(RestaurantsActions.changeSearch, (s, { search }) => ({
    ...s,
    query: { ...s.query, search, page: 1 }
  })),

  on(RestaurantsActions.loadRequested, (s) => ({ ...s, loading: true, error: null })),
  on(RestaurantsActions.loadSucceeded, (s, { data, total }) => ({ ...s, rows: data, total, loading: false })),
  on(RestaurantsActions.loadFailed, (s, { error }) => ({ ...s, loading: false, error })),
  on(RestaurantsActions.create, (s, ) => ({
    ...s,
    isSaving: true
  })),
  on(RestaurantsActions.createSuccess, (s, ) => ({
    ...s,
    isSaving: false
  })),
  on(RestaurantsActions.createFailure, (s, ) => ({
    ...s,
    isSaving: false
  })),
  on(RestaurantsActions.update, (s, ) => ({
    ...s,
    isSaving: true
  })),
  on(RestaurantsActions.updateSuccess, (s, ) => ({
    ...s,
    isSaving: false
  })),
  on(RestaurantsActions.updateFailure, (s, ) => ({
    ...s,
    isSaving: false
  })),
  on(RestaurantsActions.getOne, (s, ) => ({
    ...s,
    isLoadingForm: true
  })),
  on(RestaurantsActions.getOneSuccess, (s, {entity} ) => ({
    ...s,
    isLoadingForm: false,
    form: entity
  })),
  on(RestaurantsActions.clearForm, (s,  ) => ({
    ...s,
    isLoadingForm: false,
    form: null
  }))
);
