require('../config.js');

module.exports = {
  client: 'postgresql',
  connection: process.env.PG_CONN_STRING,
};
