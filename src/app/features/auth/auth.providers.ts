// src/app/features/auth/auth.providers.ts
import { Provider } from '@angular/core';
import { AuthRepository } from './domain/auth.repository';
import { AuthHttpService } from './infrastructure/auth-http.service';
import { AuthFacade } from './application/auth.facade';
import { TokenStorageService } from './infrastructure/token-storage.service';

export const provideAuth: Provider[] = [
  { provide: AuthRepository, useClass: AuthHttpService },
  AuthHttpService,
  TokenStorageService,
  AuthFacade
];
