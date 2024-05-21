import axios from 'axios';

const luggageTypeService = axios.create({
  baseURL: 'http://127.0.0.1:3333/api/v1/baggage-types', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {

  getRecords() {
    return luggageTypeService.get('');
  },

  create(endpoint : string, data : any) {
    return luggageTypeService.post(endpoint, data);
  },
  
  update(endpoint: string, data: any) {
    return luggageTypeService.put(endpoint, data);
  },

  delete(endpoint: string) {
    return luggageTypeService.delete(endpoint);
  },
};
