import { SortDir } from "../../../core/models";

export interface Restaurante {
  id: string;
  nombre: string;
  descripcion: string;
  logoUrl: string;
  tiempoEntrega: number;
  activo: boolean;
}

export interface RestaurantePaginationRequest {
  page: number;       // 1-based
  pageSize: number;
  sort?: string;      // nombre de columna en tu API
  dir?: SortDir;
  search?: string;
}
