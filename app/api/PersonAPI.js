import apiClient from './client';
import endpoints from './endpoints';

const getById = id =>
  apiClient.get(`${endpoints.person.getById.replace(':id', id)}`);

export default { getById };
