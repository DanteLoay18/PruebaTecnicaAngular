// restaurants.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SortDir } from '../../models';
import { CreateProductoRequest, Producto, UpdateProductoRequest } from '../../../features/productos/domain/producto.model';
import { Categoria } from '../../models/categoria.model';

export const ProductActions = createActionGroup({
  source: 'Producto',
  events: {
    'Init': emptyProps(),                          // primera carga
    'Refresh': emptyProps(),                       // recargar mismos params

    'Change Page': props<{ page: number }>(),
    'Change Page Size': props<{ pageSize: number }>(),
    'Change Sort': props<{ sort?: string; dir?: SortDir }>(),
    'Change Search': props<{ search: string }>(),

    'Load Requested': emptyProps(),
    'Load Succeeded': props<{ data: Producto[]; total: number }>(),
    'Load Failed': props<{ error: string }>(),

    'Create ': props<{ request: CreateProductoRequest }>(),
    'Create Success': props<{ message: string }>(),
    'Create Failure': props<{ message?: string, messages?: string[] }>(),

    'Update': props<{ request: UpdateProductoRequest }>(),
    'Update Success': props<{ message: string }>(),
    'Update Failure': props<{ message: string, messages?: string[] }>(),

    'Get One': props<{ id: string }>(),
    'Get One Success': props<{ entity: Producto }>(),

    'Delete': props<{ id : string }>(),
    'Delete Success': props<{ message: string }>(),
    'Delete Failure': props<{ message: string, messages?: string[] }>(),
    
    'Get Categorias': emptyProps(),
    'Get Categorias Success': props<{ categorias: Categoria[] }>(),
    'Clear Form': emptyProps()
  }
});
