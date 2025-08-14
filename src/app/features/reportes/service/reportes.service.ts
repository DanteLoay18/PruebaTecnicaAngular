// src/app/core/reports.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Response } from '../../../core';

export interface ProductoLowStock {
    id: string;
    nombre: string;
    descripcion: string;
    precio: string;
    cantidad: number;
    categoriaId: string;
}

@Injectable({ providedIn: 'root' })
export class ReportsService {
    private http = inject(HttpClient);
    private baseUrl = environment.API_URL+'/reporte'; // <-- AJUSTA ESTO

    getLowStock(): Observable<ProductoLowStock[]> {
        return this.http.get<Response<ProductoLowStock[]>>(`${this.baseUrl}/get-productos-inventario-bajo`).pipe(
            map(resp => resp.data)
        );
    }
}
