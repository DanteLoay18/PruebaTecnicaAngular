import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Response } from '../../../core';
import { UserRepository } from '../domain/user.repository';
import { RegisterAuthRequest, AuthResponse } from '../../auth';

@Injectable({ providedIn: 'root' })
export class UserHttpService extends UserRepository {
  
 
  
  private http = inject(HttpClient);

  private readonly API_URL = environment.API_URL + '/usuarios';


   complementaryRegister(registerRequest: RegisterAuthRequest): Observable<Response<AuthResponse>> {
      throw new Error('Method not implemented.');
  }
  
}
