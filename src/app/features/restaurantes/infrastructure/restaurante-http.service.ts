import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { RestauranteRepository } from '../domain/restaurante.repository';
import { map, Observable } from 'rxjs';
import { Restaurante } from '../domain/restaurante.model';
import { Response } from '../../../core';
import { PaginationResults } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class RestauranteHttpService extends RestauranteRepository {




    private http = inject(HttpClient);

    private readonly API_URL = environment.API_URL + '/api/v1/restaurantes';


    getPagination(pageNumber: number, pageSize: number, orderBy?: string, orderAsc?: boolean, search?: string): Observable<PaginationResults<Restaurante>> {

        let params = new HttpParams()
            .set('PageNumber', pageNumber.toString())
            .set('PageSize', pageSize.toString());

        if (orderBy) params = params.set('OrderBy', orderBy);
        if (orderAsc !== undefined) params = params.set('OrderAsc', String(orderAsc));
        if (search) params = params.set('Search', search);



        return this.http.get<Response<PaginationResults<Restaurante>>>(this.API_URL + '/get-pagination-by-administrador', { params }).pipe(
            map(resp => resp.data)
        );
    }

    createRestaurante(formData: FormData): Observable<Response<string>> {
        return this.http.post<Response<string>>(this.API_URL + '/register', formData);
    }

    updateRestaurante(formData: FormData): Observable<Response<string>> {
        return this.http.put<Response<string>>(this.API_URL + '/update', formData);
    }


    getById(id: string): Observable<Restaurante> {
        return this.http.get<Response<Restaurante>>(this.API_URL + `/get-by-id/${id}`).pipe(
            map(resp => resp.data)
        );
    }
}
