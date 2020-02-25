export interface PaginationParams {
  offset: number;
  pageSize: number;
  name?: string;
}

export interface PagedResultMetadata {
  total: number;
  offset: number;
  pageSize: number;
  name: string;
}

export interface PagedResult<T> {
  data: T[];
  metadata: PagedResultMetadata;
}
