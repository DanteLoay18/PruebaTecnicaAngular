import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResults, Response, SortDir } from '../../../core/models';
import { ProductoRepository } from '../domain/producto.repository';
import { CreateProductoRequest, Producto, RestaurantePaginationRequest, UpdateProductoRequest } from '../domain/producto.model';

@Injectable({ providedIn: 'root' })
export class RestauranteFacade {
    private restauranteRepo = inject(ProductoRepository);

    getPagination({ page, size, nombre, categoria }: RestaurantePaginationRequest): Observable<PaginationResults<Producto>> {
        return this.restauranteRepo.getPagination(page, size, nombre, categoria);
    }

    createRestaurante(request: CreateProductoRequest): Observable<Response<string>> {
         return this.restauranteRepo.create(request);
    }

    updateRestaurante(request: UpdateProductoRequest): Observable<Response<string>> {
         return this.restauranteRepo.update(request);
    }


    getById(id: string){
        return this.restauranteRepo.getById(id)
    }



}
