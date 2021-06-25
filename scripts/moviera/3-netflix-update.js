const fs = require('fs');
const request = require('request');
const cachedRequest = require('cached-request')(request);
require('../../config.js');

/*  Cache Config */
const cacheDirectory = './data/cache/netflix';
const cacheTime = 30000000000000 * 1000; // 3 seconds;
cachedRequest.setCacheDirectory(cacheDirectory);
/* * * * * * * * */

const utils = require('./utils.js');

const movieSources = [
  './data/imdb-coming-soon.js',
  './data/imdb-top-movies.js',
];

var netflixList = [];
movieSources.map((s) => { netflixList = netflixList.concat(require(s)); return netflixList; });

const getUrl = m => `http://netflixroulette.net/api/api.php?title=${m.title}&year=${m.year}`;

var movies = [];
const scrape = (movie, n, cb) => {
  const movieObj = utils.splitTitleYear(movie.title);

  const callback = (err, response, cur) => {
    console.log(`${cur + 1}/${netflixList.length}`);
    if (response) {
      var obj = JSON.parse(response);
      if (!obj.errorcode) {
        movies = movies.concat(obj);
      }
    }

    cb();
  };

  console.log(getUrl(movieObj))
  // 1. Create the request
  cachedRequest({
    url: getUrl(movieObj),
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
  fs.writeFile('./data/netflix.js', utils.jsonToString(movies), function(err, result) {
    if(err) console.log('error', err);
  });
};

utils.syncExecArray(netflixList, 0, scrape, complete);
