// Object freeze in order to avoid changes on endpoints by consumers
export default Object.freeze({
  baseUrl: 'https://api.tvmaze.com',
  shows: {
    get: '/shows?page=',
    seasonsByShowID: '/shows/:id/seasons',
    episondesByShowID: '/shows/:id/episodes',
  },
  search: {
    shows: '/search/shows?q=',
    people: '/search/people?q=',
  },
  person: {
    getById: '/people/:id/castcredits?embed=show',
  },
});
