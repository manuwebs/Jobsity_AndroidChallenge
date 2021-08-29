import apiClient from './client';
import endpoints from './endpoints';

const shows = criteria => apiClient.get(`${endpoints.search.shows}${criteria}`);

const people = criteria =>
  apiClient.get(`${endpoints.search.people}${criteria}`);

export default { shows, people };
