const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const config = dotenv.parse(fs.readFileSync(path.resolve(__dirname, './development.env')));

Object.keys(config).forEach((k) => {
  process.env[k] = config[k];
});

module.exports = {
  config,
};
