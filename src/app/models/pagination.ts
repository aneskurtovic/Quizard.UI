export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

export interface PagedResultMetadata {
  total: number;
  pageNumber: number;
  pageSize: number;
}

export interface PagedResult<T> {
  data: T[];
  metadata: PagedResultMetadata;
}
