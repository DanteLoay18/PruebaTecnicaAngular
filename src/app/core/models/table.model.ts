import { Categoria } from "./categoria.model";
import { SelectorModel } from "./selector.model";

export interface TableHeader {
  label: string;
  key?: string;           // clave de sort que usarás en tu API
  sortable?: boolean;
  align?: Align;
  class?: string;
  width?: string;         // opcional: w-32, etc.
}

export interface TableState<T> {
  rows: T[];
  total: number;
  loading: boolean;
  error?: string | null;
  query: TableQuery;
  headers: TableHeader[];
  isSaving: boolean;
  form: T | null;
  isLoadingForm: boolean
  categorias: SelectorModel<Categoria> | null

}

export interface TableQuery {
  page: number;       // 1-based
  size: number;
  nombre?: string;      // nombre de columna en tu API
  categoria?: string;    // texto de búsqueda
}

export type Align = 'left'|'center'|'right';


export type SortDir = 'asc' | 'desc';

