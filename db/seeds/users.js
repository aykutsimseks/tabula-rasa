const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('johnson123', salt);
    return Promise.join(
      knex('users').insert({
        email: 'user@asimsek.com',
        password: hash,
      })
    );
  })
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('bryant123', salt);
    return Promise.join(
      knex('users').insert({
        email: "simsek-aykut@hotmail.com",
        display_name: "Aykut Şimşek",
        first_name: "Aykut",
        last_name: "Şimşek",
        provider: "facebook",
        profile: {
          id: "10153592087412663",
          displayName: "Aykut Şimşek",
          name: {
            familyName: "Şimşek",
            givenName: "Aykut"
          },
          emails: [{
            value: "simsek-aykut@hotmail.com"
          }],
          provider: "facebook",
          _raw: "{"id":"10153592087412663","last_name":"\u015eim\u015fek","first_name":"Aykut","name":"Aykut \u015eim\u015fek","email":"simsek-aykut\u0040hotmail.com"}",
          _json: {
            id: "10153592087412663",
            last_name: "Şimşek",
            first_name: "Aykut",
            name: "Aykut Şimşek",
            email: "simsek-aykut@hotmail.com"
          }
        },
      })
    );
  });
};
