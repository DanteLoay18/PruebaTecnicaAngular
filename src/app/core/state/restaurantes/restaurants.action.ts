// restaurants.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Restaurante } from '../../../features/restaurantes/domain/restaurante.model';
import { SortDir } from '../../models';

export const RestaurantsActions = createActionGroup({
  source: 'Restaurants',
  events: {
    'Init': emptyProps(),                          // primera carga
    'Refresh': emptyProps(),                       // recargar mismos params

    'Change Page': props<{ page: number }>(),
    'Change Page Size': props<{ pageSize: number }>(),
    'Change Sort': props<{ sort?: string; dir?: SortDir }>(),
    'Change Search': props<{ search: string }>(),

    'Load Requested': emptyProps(),
    'Load Succeeded': props<{ data: Restaurante[]; total: number }>(),
    'Load Failed': props<{ error: string }>(),

    'Create ': props<{ formData: FormData }>(),
    'Create Success': props<{ message: string }>(),
    'Create Failure': props<{ message?: string, messages?: string[] }>(),

    'Update': props<{ formData: FormData }>(),
    'Update Success': props<{ message: string }>(),
    'Update Failure': props<{ message: string, messages?: string[] }>(),

    'Get One': props<{ id: string }>(),
    'Get One Success': props<{ entity: Restaurante }>(),

    'Clear Form': emptyProps()
  }
});
