import apiClient from './client';
import endpoints from './endpoints';

const get = page => apiClient.get(`${endpoints.shows.get}${page}`);

export default { get };
