import axios from 'axios';

const luggageTypeService = axios.create({
  baseURL: 'http://127.0.0.1:3333/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default luggageTypeService;
