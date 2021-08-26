// Object freeze in order to avoid changes on endpoints by consumers
export default Object.freeze({
  baseUrl: 'https://api.tvmaze.com',
  shows: {
    get: '/shows?page=',
  },
  search: {
    shows: '/search/shows?q=',
  },
});
