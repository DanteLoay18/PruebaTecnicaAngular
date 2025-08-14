import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '../domain/auth.repository';
import { LoginAuthRequest, AuthResponse, RegisterAuthRequest } from '../domain/auth.model';
import { map, Observable, tap } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../../../environments/environment';
import { Response } from '../../../core';

@Injectable({ providedIn: 'root' })
export class AuthHttpService extends AuthRepository {



  private http = inject(HttpClient);
  private tokenStorage = inject(TokenStorageService);

  private readonly API_URL = environment.API_URL + '/auth';

  login(credentials: LoginAuthRequest): Observable<AuthResponse> {
    return this.http.post<Response<AuthResponse>>(`${this.API_URL}/login`, credentials).pipe(
      map(response => response.data),
      tap(response => this.tokenStorage.setToken(response.accessToken))
    );
  }

  logout(): void {
    this.tokenStorage.clearToken();
  }

  getToken(): string | null {
    return this.tokenStorage.getToken();
  }

  register(registerRequest: RegisterAuthRequest): Observable<Response<any>> {
    return this.http.post<Response<AuthResponse>>(`${this.API_URL}/register`, registerRequest)
      .pipe(
        // tap(response => this.tokenStorage.setToken(response.data.accessToken))
      );
  }

  checkStatus(): Observable<AuthResponse> {
    const token = this.tokenStorage.getToken();

    return this.http.get<Response<AuthResponse>>(
      `${this.API_URL}/check-status`,
    ).pipe(
      map(response => response.data),
      tap(response => this.tokenStorage.setToken(response.accessToken))
    );
  }


}
