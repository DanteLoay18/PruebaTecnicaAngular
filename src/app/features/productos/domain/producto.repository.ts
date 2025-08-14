import { Observable } from 'rxjs';
import { PaginationResults, Response } from '../../../core/models';
import { CreateProductoRequest, Producto, UpdateProductoRequest } from './producto.model';

export abstract class ProductoRepository {
  abstract getPagination(pageNumber: number, pageSize: number, nombre?: string, categoria?: string): Observable<PaginationResults<Producto>>;

  abstract create(request: CreateProductoRequest): Observable<Response<string>>;
  
  abstract update(request: UpdateProductoRequest): Observable<Response<string>>;

  abstract getById(id: string): Observable<Producto>;

  abstract delete(id: string): Observable<Response<string>>;


}
