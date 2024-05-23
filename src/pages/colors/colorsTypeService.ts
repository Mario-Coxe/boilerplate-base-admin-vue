import axios from 'axios';

const colorsTypeService = axios.create({
  baseURL: 'http://127.0.0.1:3333/api/v1/colors',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface PaginationParams {
  search?: string;
  lastPage?: number;
  page?: number;
  perPage?: number;
  total?: number;
}

interface LuggageType {
  uuid: string;
  id: number;
  slug: string;
  description: string;
  value: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

interface PaginatedResponse<T> {
  total: number;
  perPage: number;
  page: number;
  lastPage: number;
  data: T[];
}

const getRecords = (params: PaginationParams = {}) => {
  const queryParams = new URLSearchParams({
    search: params.search || '',
    lastPage: params.lastPage?.toString() || '0',
    page: params.page?.toString() || '1',
    perPage: params.perPage?.toString() || '10',
    total: params.total?.toString() || '0'
  }).toString();
  return colorsTypeService.get<PaginatedResponse<LuggageType>>(`?${queryParams}`);
};

const create = (data: any) => {
  return colorsTypeService.post('', data);
};

const update = (id: number, data: any) => {
  return colorsTypeService.put(`/${id}`, data);
};

const remove = (id: number) => {
  return colorsTypeService.delete(`/${id}`);
};

export default {
  getRecords,
  create,
  update,
  remove,
};
