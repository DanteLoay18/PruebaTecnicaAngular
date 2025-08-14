// restaurants.reducer.ts
import { createFeature, createReducer, on } from '@ngrx/store';
import { TableState } from '../../models';
import { ProductActions } from './productos.action';
import { Producto } from '../../../features/productos/domain/producto.model';

export type ProductsState = TableState<Producto>;

const initialState: ProductsState = {
  rows: [],
  total: 0,
  loading: false,
  error: null,
  query: { page: 1, size: 10, nombre: '', categoria: '', },
  headers: [
    { label: 'Nombre', key: 'nombre', sortable: false, align: 'left' },
    { label: 'Descripción', key: 'descripcion', sortable: false, align: 'left' },
    { label: 'Precio', key: 'precio', sortable: false, align: 'right', width: 'w-32' },
    { label: 'Cantidad', key: 'cantidad', sortable: false, align: 'left', width: 'w-32' },
    { label: 'Categoria', key: 'categoria', sortable: false, align: 'left', width: 'w-32' },
    { label: 'Acciones', key: '', sortable: false, align: 'left', width: 'w-32' },
  ],
  isSaving: false,
  form: null,
  isLoadingForm: false,
  categorias: {
    isLoading: true,
    items: []
  }


};
export const productsFeatureKey = 'products';

export const productReducer = createReducer(
  initialState,

  on(ProductActions.changePage, (s, { page }) => ({ ...s, query: { ...s.query, page } })),
  on(ProductActions.changePageSize, (s, { pageSize }) => ({
    ...s,
    query: { ...s.query, pageSize, page: 1 }      // resetea a página 1
  })),
  on(ProductActions.changeSort, (s, { sort, dir }) => ({
    ...s,
    query: { ...s.query, sort, dir, page: 1 }
  })),
  on(ProductActions.changeSearch, (s, { nombre, categoriaId }) => ({
    ...s,
    query: { ...s.query, nombre, categoria: categoriaId, page: 1 }
  })),

  on(ProductActions.loadRequested, (s) => ({ ...s, loading: true, error: null })),
  on(ProductActions.loadSucceeded, (s, { data, total }) => ({ ...s, rows: data, total, loading: false })),
  on(ProductActions.loadFailed, (s, { error }) => ({ ...s, loading: false, error })),
  on(ProductActions.create, (s,) => ({
    ...s,
    isSaving: true
  })),
  on(ProductActions.createSuccess, (s,) => ({
    ...s,
    isSaving: false
  })),
  on(ProductActions.createFailure, (s,) => ({
    ...s,
    isSaving: false
  })),
  on(ProductActions.update, (s,) => ({
    ...s,
    isSaving: true
  })),
  on(ProductActions.updateSuccess, (s,) => ({
    ...s,
    isSaving: false
  })),
  on(ProductActions.updateFailure, (s,) => ({
    ...s,
    isSaving: false
  })),
  on(ProductActions.getOne, (s,) => ({
    ...s,
    isLoadingForm: true
  })),
  on(ProductActions.getOneSuccess, (s, { entity }) => ({
    ...s,
    isLoadingForm: false,
    form: entity
  })),
  on(ProductActions.clearForm, (s,) => ({
    ...s,
    isLoadingForm: false,
    form: null
  })),
  on(ProductActions.getCategorias, (s,) => ({
    ...s,
    categorias: {
      isLoading: true,
      items: []
    }
  })),
  on(ProductActions.getCategoriasSuccess, (s, { categorias }) => ({
    ...s,
    categorias: {
      isLoading: false,
      items: categorias
    }
  }))
);
