const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const moment = require('moment');
const cachedRequest = require('cached-request')(request);

const utils = require('./utils.js');

const urlBase = 'http://www.imdb.com/movies-coming-soon/';

/*  Cache Config */
const cacheDirectory = './data/cache/imdb-coming-soon';
const cacheTime = 30000000000000 * 1000; // 3 seconds;
cachedRequest.setCacheDirectory(cacheDirectory);
/* * * * * * * * */

/* Date Calculations & URL Generate */
const start = moment('2011-01-01', 'YYYY-MM-DD');
const end = moment();
const cur = start;
const urls = [];
while (cur <= end) {
  urls.push(`${urlBase}${cur.format('YYYY-MM')}`);
  cur.add(1, 'months');
}
/* * * * * * * * */


// Define the scrape function
var movies = [];
const scrape = (url, n, cb) => {
  const scrapeRules = {
    imdbId: {
      pattern: "h4 a[title]",
      func: (arr, pageData, $) => {
        arr.map((index, movie) => {
          pageData.push({
            title: $(movie).text().trim(),
            imdbID: $(movie).prop('href').split('/')[2],
          });
          return 0;
        });
      },
    },
  };

  const callback = (err, data, yearMonth) => {
    console.log(`${n}/${urls.length}: ${yearMonth}: ${url}`);
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
    callback(null, data, yearMonth);
    return 0;
  });
};

const complete = () => {
  console.log('SAVING...');
  fs.writeFile('./data/imdb-coming-soon.js', utils.jsonToString(movies), function(err, result) {
    if(err) console.log('error', err);
  });
};

utils.syncExecArray(urls, 0, scrape, complete);
