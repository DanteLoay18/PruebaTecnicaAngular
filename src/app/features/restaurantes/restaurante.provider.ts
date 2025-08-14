// src/app/features/auth/auth.providers.ts
import { Provider } from '@angular/core';
import { RestauranteRepository } from './domain/restaurante.repository';
import { RestauranteHttpService } from './infrastructure/restaurante-http.service';

export const provideRestaurante: Provider[] = [
  { provide: RestauranteRepository, useClass: RestauranteHttpService },
//   AuthH
];
