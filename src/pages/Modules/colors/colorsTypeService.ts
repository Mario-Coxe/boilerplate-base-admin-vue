import axios from 'axios';
import baseUrl from '../../proprieties';
const colorService = {
  baseURL: `${baseUrl}colors/`, 
  getRecords(params: any) {
    return axios.get(`${this.baseURL}`, { params });
  },
  create(data: any) {
    return axios.post(`${this.baseURL}create`, data);
  },
  update(id : number, data : any) {
    return axios.put(`${this.baseURL}${id}`, data);
  },
  delete(id: number) {
    return axios.delete(`${this.baseURL}${id}`);
  },
};

export default colorService;
