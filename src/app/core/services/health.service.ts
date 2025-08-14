import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Response } from "../models";

@Injectable({ providedIn: 'root' })
export class HealthService  {
 
  
  private http = inject(HttpClient);

  private readonly API_URL = environment.API_URL + '/health';

  checkHealth(): Observable<string> {
    return this.http.head<string>(`${this.API_URL}`);
  }



}
