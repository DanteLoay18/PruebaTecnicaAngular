import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Response } from '../../../core';
import { PaginationResults } from '../../../core/models';
import { ProductoRepository } from '../domain/producto.repository';
import { CreateProductoRequest, Producto, UpdateProductoRequest } from '../domain/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoHttpService extends ProductoRepository {
    




    private http = inject(HttpClient);

    private readonly API_URL = environment.API_URL + '/producto';


    getPagination(pageNumber: number, pageSize: number, nombre?: string, categoria?: string): Observable<PaginationResults<Producto>> {

        let params = new HttpParams()
            .set('page', pageNumber.toString())
            .set('size', pageSize.toString());

        if (categoria) params = params.set('categoria', categoria);
        if (nombre) params = params.set('nombre', nombre);
        // if (orderAsc !== undefined) params = params.set('OrderAsc', String(orderAsc));
        // if (search) params = params.set('Search', search);



        return this.http.get<Response<PaginationResults<Producto>>>(this.API_URL + '/pagination', { params }).pipe(
            map(resp => resp.data)
        );
    }

    create(request: CreateProductoRequest): Observable<Response<string>> {
        return this.http.post<Response<string>>(this.API_URL + '/register', request);
    }

    update(request: UpdateProductoRequest): Observable<Response<string>> {
        return this.http.put<Response<string>>(this.API_URL + '/update', request);
    }


    getById(id: string): Observable<Producto> {
        return this.http.get<Response<Producto>>(this.API_URL + `/${id}`).pipe(
            map(resp => resp.data)
        );
    }

     delete(id: string): Observable<Response<string>> {
        return this.http.get<Response<string>>(this.API_URL + `/${id}`).pipe(
        );
    }
}
