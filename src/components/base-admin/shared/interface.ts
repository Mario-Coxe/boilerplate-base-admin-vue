export interface LuggageType {
  uuid: string;
  id: number;
  slug: string;
  description: string;
  is_active: number;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

export interface PaginationParams {
  search?: string;
  lastPage?: number;
  page?: number;
  perPage?: number;
  total?: number;
}

export interface PaginatedResponse<T> {
  total: number;
  perPage: number;
  page: number;
  lastPage: number;
  data: T[];
}
