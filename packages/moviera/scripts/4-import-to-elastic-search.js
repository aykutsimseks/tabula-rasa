const elasticsearch = require('elasticsearch');
const moment = require('moment');
const _ = require('lodash');

const utils = require('./utils.js');

const movies = require('./data/omdb.js');


const args = process.argv.slice(2);

const client = new elasticsearch.Client({
  host: args[0] || 'localhost:9200',
});

const notNA = str => str !== 'N/A';

const getYears = (str) => {
  if (str === 'N/A') { return {}; }
  const tokens = str.split('–');
  return {
    year: utils.toNumber(tokens[0]),
    yearEnded: utils.toNumber(tokens[1]),
  };
};

const compact = (obj) => {
  Object.keys(obj).forEach((key) => {
    const v = obj[key];
    if (!v || (v === 'N/A')) { delete obj[key]; }
  });
  return obj;
};

const __guardMethod__ = (obj, methodName, transform) => {
  if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
    return transform(obj, methodName);
  }
  return undefined;
};

const processedMovies = movies.map((movie) => {
  const years = getYears(movie.Year);
  const poster = movie.Poster;
  return compact({
    title: movie.Title,
    year: years.year,
    yearEnded: years.yearEnded,
    rated: utils.splitComma(movie.Rated),
    released: notNA(movie.Released) ? moment(movie.Released, 'DD MMM YYYY').format('YYYY-MM-DD') : undefined,
    runtimeMinutes: utils.toNumber(movie.Runtime),
    genres: utils.splitComma(movie.Genre),
    directors: utils.splitComma(movie.Director),
    writers: utils.splitWriter(movie.Writer),
    actors: utils.splitComma(movie.Actors),
    plot: movie.Plot,
    languages: utils.splitComma(movie.Language),
    countries: utils.splitComma(movie.Country),
    awards: notNA(movie.Awards) ? movie.Awards : undefined,
    poster,
    metaScore: notNA(movie.Metascore) ? Number(movie.Metascore) : undefined,
    imdbRating: Number(movie.imdbRating),
    imdbVotes: utils.toNumber(movie.imdbVotes),
    tomatoRating: Number(movie.tomatoRating),
    imdbId: movie.imdbID,
    type: _.capitalize(movie.Type),
    suggest: {
      input: __guardMethod__(movie.Title, 'split', o => o.split(' ')) || [],
      output: movie.Title,
      payload: { id: movie.imdbID },
    },
  });
});

// console.log processedMovies

const commands = [];

processedMovies.map((m) => {
  commands.push({ index: { _index: 'movies', _type: 'movie', _id: m.imdbId } });
  commands.push(m);
  return m;
});

// client.bulk({ body: commands }, (err, res) => {
//   if (err) {
//     return console.log(err);
//   }
//   if (res.errors) {
//     return console.log(res.errors);
//   }

//   return console.log(`indexed ${res.items.length} items in ${res.took}ms`);
// });


const getMultiFieldDef = (name) => {
  const def = {
    // type: 'multi_field',
    type: 'text',
    fields: {
      raw: { type: 'string', index: 'not_analyzed' },
    },
  };

  def.fields[name] = { type: 'string', index: 'analyzed' };
  return def;
};
const settings = {
  analysis: {
    char_filter: {
      replace: {
        type: 'mapping',
        mappings: [
          '&=> and ',
        ],
      },
    },
    filter: {
      word_delimiter: {
        type: 'word_delimiter',
        split_on_numerics: false,
        split_on_case_change: true,
        generate_word_parts: true,
        generate_number_parts: true,
        catenate_all: true,
        preserve_original: true,
        catenate_numbers: true,
      },
    },
    analyzer: {
      default: {
        type: 'custom',
        char_filter: [
          'html_strip',
          'replace',
        ],
        tokenizer: 'whitespace',
        filter: [
          'lowercase',
          'word_delimiter',
        ],
      },
    },
  },
};
const mapping = {
  index: 'movies',
  type: 'movie',
  body: {
    movie: {
      properties: {
        year: { type: 'integer' },
        yearEnded: { type: 'integer' },
        released: { type: 'date' },
        // runtimeMinutes: { type: 'integer' },
        // rated: getMultiFieldDef('rated'),
        genres: getMultiFieldDef('genres'),
        countries: getMultiFieldDef('countries'),
        languages: getMultiFieldDef('languages'),
        metaScore: { type: 'integer' },
        imdbRating: { type: 'float' },
        imdbVotes: { type: 'integer' },
        writers: getMultiFieldDef('writers'),
        directors: getMultiFieldDef('directors'),
        actors: getMultiFieldDef('actors'),
        type: getMultiFieldDef('type'),
        suggest: {
          type: 'completion',
          store: true,
        },
      },
    },
  },
};


client.indices.delete({ index: 'movies' }, (err, res) => {
  console.log(err, res);
  return client.indices.create({ index: 'movies', body: { settings } }, (err, res) => {
    console.log(err, res);

    return client.indices.putMapping(mapping, (err, res) => {
      console.log(err, res);
      client.bulk({ body: commands }, (err, res) => {
        if (err) {
          return console.log(err);
        }
        if (res.errors) {
          return console.log(res.errors);
        }

        return console.log(`indexed ${res.items.length} items in ${res.took}ms`);
      });
    });
  });
});
