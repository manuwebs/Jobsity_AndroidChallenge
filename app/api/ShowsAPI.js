import apiClient from './client';
import endpoints from './endpoints';

const get = page => apiClient.get(`${endpoints.shows.get}${page}`);

const getSeasonsByShowID = showID =>
  apiClient.get(`${endpoints.shows.seasonsByShowID.replace(':id', showID)}`);

const getEpisodesByShowID = showID =>
  apiClient.get(`${endpoints.shows.episondesByShowID.replace(':id', showID)}`);

export default { get, getSeasonsByShowID, getEpisodesByShowID };
