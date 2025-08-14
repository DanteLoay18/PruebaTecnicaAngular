
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

}

export interface TableQuery {
  page: number;       // 1-based
  pageSize: number;
  sort?: string;      // nombre de columna en tu API
  dir?: SortDir;
  search?: string;    // texto de búsqueda
}

export type Align = 'left'|'center'|'right';


export type SortDir = 'asc' | 'desc';