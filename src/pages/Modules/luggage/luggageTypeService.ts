import axios from 'axios';
import baseUrl from '../../proprieties';

const luggageTypeService = {
  baseURL: `${baseUrl}baggage-types/`, 
  getRecords(params: PaginatedResponse) {
    return axios.get(`${this.baseURL}`, { params });
  },
};

export default luggageTypeService;
