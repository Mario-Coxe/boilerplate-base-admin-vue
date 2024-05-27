import axios from 'axios';
import baseUrl from '../../proprieties';

const luggageTypeService = axios.create({
  baseURL: `${baseUrl}baggage-types`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getRecords = (params: PaginatedResponse) => {
  return luggageTypeService.get('', { params });
};

const create = (data: any) => {
  return luggageTypeService.post('', data);
};

const update = (id: number, data: any) => {
  return luggageTypeService.put(`/${id}`, data);
};

const remove = (id: number) => {
  return luggageTypeService.delete(`/${id}`);
};

export default {
  getRecords,
  create,
  update,
  remove,
};
