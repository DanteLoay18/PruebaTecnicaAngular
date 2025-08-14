import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../domain/auth.repository';
import { LoginAuthRequest, AuthResponse, RegisterAuthRequest } from '../domain/auth.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private authRepo = inject(AuthRepository);

  login(credentials: LoginAuthRequest): Observable<AuthResponse> {
    return this.authRepo.login(credentials);
  }

  checkStatus(): Observable<AuthResponse> {
    return this.authRepo.checkStatus();
  }

  logout(): void {
    this.authRepo.logout();
  }

  getToken(): string | null {
    return this.authRepo.getToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  register(registerRequest : RegisterAuthRequest) {
    return this.authRepo.register(registerRequest);

  }
}
