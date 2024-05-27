import axios from 'axios';
import baseUrl from '../../proprieties';

const driverService = {
  baseURL: `${baseUrl}drivers/`, 
  getRecords(params: PaginatedResponse) {
    return axios.get(`${this.baseURL}`, { params });
  },
};

export default driverService;
