import { Client } from 'elasticsearch';

const numResults = 15;

let elasticPort = '';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  elasticPort = ':9200';
} else {
  elasticPort = '/search';
}

const client = new Client({
  // host: `${window.location.protocol}//${window.location.hostname}:9200`,
  // host: `${window.location.protocol}//${window.location.hostname}/elastic`,
  host: `${window.location.protocol}//${window.location.hostname}${elasticPort}`,
  // log: 'trace',
});

export const runElasticQuery = (q, sortBy, selectMin, selectMax, terms, page, callback) => {
  client
    .search({
      q: q || undefined,
      sort: [
        `${sortBy}:desc`,
        'released:desc',
        'imdbRating:desc',
      ],
      body: {
        query: {
          bool: {
            filter: [
              {
                range: {
                  released: {
                    gte: `${selectMin > 2009 ? selectMin : 1970}-01-01`,
                    lte: `${selectMax}-12-31`,
                  },
                },
              },
            ].concat(
              terms.map(t => ({ term: { [t[0]]: t[1] } })),
            ),
          },
        },
      },
      size: numResults,
      from: page * numResults,
    })
    .then((body) => {
      if (!page) {
        window.scrollTo(0, 0);
      }
      callback(body);
    });
};
