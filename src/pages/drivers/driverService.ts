import axios from 'axios';

const driverService = axios.create({
  baseURL: 'http://127.0.0.1:3333/api/v1/drivers',
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
  is_active: number;
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


const getRecords = (params: PaginatedResponse<LuggageType>) => {
  return driverService.get('', { params });
};

export default {
  getRecords,
};
