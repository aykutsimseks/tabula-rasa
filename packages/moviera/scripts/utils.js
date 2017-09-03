const _ = require('lodash');

const jsonToString = json => `module.exports = ${JSON.stringify(json, null, 2).replace(/"([^(")"]+)":/g, '$1:')};\n`;

// Syncrenously executes array
const syncExecArray = (list, n, func, complete) => {
  // Continue scrape
  if (n < list.length) {
    // element, index
    func(list[n], n, () => syncExecArray(list, n + 1, func, complete));
  } else {
    complete();
  }
};

const toNumber = (str) => {
  if (!str) { return undefined; }
  return Number(str.replace(/\D+/g, ''));
};

const splitComma = (str) => {
  if (str === 'N/A') { return []; }
  return str.split(/,\s*/g);
};

const splitWriter = str => _.uniq(_.map(splitComma(str), writer => writer.replace(/\s\(.+\)/, '')));

module.exports = {
  jsonToString,
  syncExecArray,
  toNumber,
  splitComma,
  splitWriter,
};
