export interface PaginationResults<T> {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    results: T[];
}