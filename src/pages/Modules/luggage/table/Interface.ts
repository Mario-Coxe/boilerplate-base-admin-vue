
interface PaginationParams {
  search?: string;
  lastPage?: number;
  page?: number;
  perPage?: number;
  total?: number;
}

interface Luggage {
  uuid: string;
  id: number;
  slug: string;
  description: string;
  value: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

interface PaginatedResponse {
  total: number;
  perPage: number;
  page: number;
  lastPage: number;
  data: Luggage[];
}