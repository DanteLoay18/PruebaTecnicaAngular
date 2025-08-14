import { SortDir } from "../../../core/models";

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  cantidad: number;
  categoriaId: string;
}

export interface RestaurantePaginationRequest {
  page: number;       // 1-based
  size: number;
  nombre?: string;      // nombre de columna en tu API
  categoria?: string;
}

export interface CreateProductoRequest {
    nombre:      string;
    descripcion: string;
    precio:      number;
    cantidad:    number;
    categoriaId: string;
}

export interface UpdateProductoRequest {
    id:          string;
    nombre:      string;
    descripcion: string;
    precio:      number;
    cantidad:    number;
    categoriaId: string;
}