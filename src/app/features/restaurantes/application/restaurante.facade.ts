import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RestauranteRepository } from '../domain/restaurante.repository';
import { Restaurante, RestaurantePaginationRequest } from '../domain/restaurante.model';
import { PaginationResults, Response, SortDir } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class RestauranteFacade {
    private restauranteRepo = inject(RestauranteRepository);

    getPagination({ page, pageSize, dir, search, sort }: RestaurantePaginationRequest): Observable<PaginationResults<Restaurante>> {
        let orderAsc: boolean = dir == 'asc';
        return this.restauranteRepo.getPagination(page, pageSize, sort, orderAsc, search);
    }

    createRestaurante(formData: FormData): Observable<Response<string>> {
         return this.restauranteRepo.createRestaurante(formData);
    }

    updateRestaurante(formData: FormData): Observable<Response<string>> {
         return this.restauranteRepo.updateRestaurante(formData);
    }


    getById(id: string){
        return this.restauranteRepo.getById(id)
    }



}
