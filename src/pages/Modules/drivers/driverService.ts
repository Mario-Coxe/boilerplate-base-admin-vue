import axios from 'axios';
import baseUrl from '../../proprieties';

const driverService = axios.create({
  baseURL: `${baseUrl}drivers`,
  headers: {
    'Content-Type': 'application/json',
  },
});



const getRecords = (params: PaginatedResponse) => {
  return driverService.get('', { params });
};

export default {
  getRecords,
};
