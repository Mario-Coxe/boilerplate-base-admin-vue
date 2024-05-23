import axios, { AxiosResponse } from 'axios';

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

const getRecords = (params: PaginationParams = {}): Promise<AxiosResponse<PaginatedResponse<LuggageType>>> => {
  const queryParams = new URLSearchParams({
    search: params.search || '',
    lastPage: params.lastPage?.toString() || '0',
    page: params.page?.toString() || '1',
    perPage: params.perPage?.toString() || '10',
    total: params.total?.toString() || '0'
  }).toString();
  return colorsTypeService.get<PaginatedResponse<LuggageType>>(`?${queryParams}`);
};

const create = (data: LuggageType): Promise<AxiosResponse<LuggageType>> => {
  return colorsTypeService.post<LuggageType>('/create', data);
};

const update = (id: number, data: Partial<LuggageType>): Promise<AxiosResponse<LuggageType>> => {
  return colorsTypeService.put<LuggageType>(`/${id}`, data);
};

const remove = (id: number): Promise<AxiosResponse<void>> => {
  return colorsTypeService.delete<void>(`/${id}`);
};

export default {
  getRecords,
  create,
  update,
  remove,
};
