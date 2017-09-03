const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const moment = require('moment');
const cachedRequest = require('cached-request')(request);

const utils = require('./utils.js');

const urlBase = 'http://www.imdb.com/chart/top';

/*  Cache Config */
const cacheDirectory = './data/cache/top-movies';
const cacheTime = 0; // 3 seconds;
cachedRequest.setCacheDirectory(cacheDirectory);
/* * * * * * * * */

const urls = [urlBase];


// Define the scrape function
var movies = [];
const scrape = (url, n, cb) => {
  const scrapeRules = {
    imdbId: {
      pattern: 'td.titleColumn a',
      func: (arr, pageData, $) => {
        arr.map((index, movie) => {
          pageData.push({
            title: $(movie).text()
              .trim()
              .replace(/^\d+/g, '')
              .replace(/\s+/, ' '),
            imdbID: $(movie).prop('href').split('/')[2],
          });
          return 0;
        });
      },
    },
  };

  const callback = (err, data) => {
    movies = movies.concat(data);
    cb();
  };

  // 1. Create the request
  cachedRequest({
    url,
    ttl: cacheTime,
  }, (err, response, body) => {
    const yearMonth = url.split(urlBase)[1];
    if (err) { return callback(err, [], yearMonth); }

    // 2. Parse the HTML
    const $ = cheerio.load(body);
    const data = [];

    // 3. Extract the data
    Object.keys(scrapeRules).forEach((k) => {
      const obj = scrapeRules[k];
      obj.func($(obj.pattern), data, $);
    });

    // Send the data in the callback
    callback(null, data);
    return 0;
  });
};

const complete = () => {
  fs.writeFile('./data/imdb-top-movies.js', utils.jsonToString(movies));
};

utils.syncExecArray(urls, 0, scrape, complete);
