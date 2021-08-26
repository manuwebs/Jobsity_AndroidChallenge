import axios from 'axios';
import endpoints from './endpoints';

const apiClient = axios.create({
  baseURL: endpoints.baseUrl,
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
});

export default apiClient;
