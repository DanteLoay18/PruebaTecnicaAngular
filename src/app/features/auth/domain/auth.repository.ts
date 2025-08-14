import { Observable } from 'rxjs';
import { LoginAuthRequest, AuthResponse, RegisterAuthRequest } from './auth.model';
import { Response } from '../../../core';

export abstract class AuthRepository {
  abstract login(credentials: LoginAuthRequest): Observable<AuthResponse>;
  abstract logout(): void;
  abstract getToken(): string | null;
  abstract register(registerRequest: RegisterAuthRequest): Observable<Response<AuthResponse>>;
  abstract checkStatus(): Observable<AuthResponse>;


}
