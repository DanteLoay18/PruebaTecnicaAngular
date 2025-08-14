import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { map, Observable } from "rxjs";
import { Response } from "../models";
import { Categoria } from "../models/categoria.model";

@Injectable({ providedIn: 'root' })
export class CategoriaService  {
 
  
  private http = inject(HttpClient);

  private readonly API_URL = environment.API_URL + '/categoria';

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Response<Categoria[]>>(`${this.API_URL}/get-all`).pipe(
        map(resp => resp.data)
    );
  }



}
