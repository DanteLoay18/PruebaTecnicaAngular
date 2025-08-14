// src/app/features/auth/auth.providers.ts
import { Provider } from '@angular/core';
import { ProductoRepository } from './domain/producto.repository';
import { ProductoHttpService } from './infrastructure/producto-http.service';

export const provideProducto: Provider[] = [
  { provide: ProductoRepository, useClass: ProductoHttpService },
//   AuthH
];
