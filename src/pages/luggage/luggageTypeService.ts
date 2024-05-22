import axios from 'axios';

const luggageTypeService = axios.create({
  baseURL: 'http://127.0.0.1:3333/api/v1/baggage-types',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface LuggageType {
  uuid: string;
  id: number;
  slug: string;
  description: string;
  is_active: number;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

interface PaginationParams {
  search?: string;
  lastPage?: number;
  page?: number;
  perPage?: number;
  total?: number;
}

interface PaginatedResponse<T> {
  total: number;
  perPage: number;
  page: number;
  lastPage: number;
  data: T[];
}

export default {
  getRecords(params: PaginationParams = {}) {
    const queryParams = new URLSearchParams({
      search: params.search || '',
      lastPage: params.lastPage?.toString() || '0',
      page: params.page?.toString() || '1',
      perPage: params.perPage?.toString() || '10',
      total: params.total?.toString() || '0'
    }).toString();
    return luggageTypeService.get<PaginatedResponse<LuggageType>>(`?${queryParams}`);
  },

  create(endpoint: string, data: any) {
    return luggageTypeService.post(endpoint, data);
  },

  update(endpoint: string, data: any) {
    return luggageTypeService.put(endpoint, data);
  },

  delete(endpoint: string) {
    return luggageTypeService.delete(endpoint);
  },
};
