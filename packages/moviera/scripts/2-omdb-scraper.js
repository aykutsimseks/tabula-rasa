const fs = require('fs');
const request = require('request');
const cachedRequest = require('cached-request')(request);
require('../../../config.js');

/*  Cache Config */
const cacheDirectory = './data/cache/omdb';
const cacheTime = 30000000000000000; // 3 seconds;
cachedRequest.setCacheDirectory(cacheDirectory);
/* * * * * * * * */

const utils = require('./utils.js');

const movieSources = [
  './data/imdb-coming-soon.js',
  './data/imdb-top-movies.js',
];

var imdbList = [];
movieSources.map((s) => { imdbList = imdbList.concat(require(s)); return imdbList; });


var movies = [];
const scrape = (movie, n, cb) => {
  const getUrl = m => `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${m.imdbID}&tomatoes=true`;

  const callback = (err, response, cur) => {
    console.log(`${cur + 1}/${imdbList.length}`);
    if (response) {
      movies = movies.concat(JSON.parse(response));
    }
    cb();
  };
  // 1. Create the request
  cachedRequest({
    url: getUrl(movie),
    ttl: cacheTime,
    timeout: 1000,
  }, (err, response, body) => {
    if (err) { return callback(err, '', n); }
    // Send the data in the callback
    callback(null, body, n);
    return 0;
  });
};

const complete = () => {
  fs.writeFile('./data/omdb.js', utils.jsonToString(movies));
};

utils.syncExecArray(imdbList, 0, scrape, complete);
