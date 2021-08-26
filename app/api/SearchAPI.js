import apiClient from './client';
import endpoints from './endpoints';

const shows = criteria => apiClient.get(`${endpoints.search.shows}${criteria}`);

export default { shows };
