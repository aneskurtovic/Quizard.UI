export interface PaginationParams {
  offset: number;
  pageSize: number;
}

export interface PagedResultMetadata {
  total: number;
  offset: number;
  pageSize: number;
}

export interface PagedResult<T> {
  data: T[];
  metadata: PagedResultMetadata;
}
