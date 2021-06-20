const searchObservationsSql = (db, params) =>
  db('observations')
  .where((builder) => {
    if (params.jobs) {
      builder.whereIn('job', (params.jobs || '').split(','))
    }

    if (params.keys) {
      builder.whereIn('key', (params.keys || '').split(','))
    }

    return builder;
  })
  .orderBy('timestamp', 'desc')

const searchObservations = (db, params) => {
  let sql = searchObservationsSql(db, params);
  console.log(sql.toString());
  return sql.then((result) => {
      return result;
    })
    .catch(err => err);
};

module.exports = searchObservations;