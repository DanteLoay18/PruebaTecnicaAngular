import { Observable } from 'rxjs';
import { Restaurante } from './restaurante.model';
import { PaginationResults, Response } from '../../../core/models';

export abstract class RestauranteRepository {
  abstract getPagination(pageNumber: number, pageSize: number, orderBy?: string, orderAsc?: boolean, search?: string): Observable<PaginationResults<Restaurante>>;

  abstract createRestaurante(formData: FormData): Observable<Response<string>>;
  
  abstract updateRestaurante(formData: FormData): Observable<Response<string>>;

  abstract getById(id: string): Observable<Restaurante>;


}
