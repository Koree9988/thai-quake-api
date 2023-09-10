export class PaginationResponse {
  page: number;
  page_size: number;
  page_count: number;
  total: number;
}

export class FindAllAndPageResponse<T> {
  entities: T[];
  pagination: PaginationResponse;
}
