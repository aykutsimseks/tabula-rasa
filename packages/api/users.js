const knex = require('../../db/connection');
const bcrypt = require('bcryptjs');
const authHelpers = require('../middleware/auth/_helpers');

const getAllUsers = (req, res) => {
  knex('users')
    .select()
    .then((data) => {
      res
        .status(200)
        .json({
          status: 'success',
          data,
          message: 'Retrieved ALL users',
        });
    })
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
};

// const getAllUsers = (req, res) => {
//   return authHelpers
//     .then(() => {
//       return knex('users')
//         .select()
//         .returning('*');
//     })
//     .catch((err) => {
//       res.status(400).json({ status: err.message });
//     });
// };

const createUser = (req, res) => {
  return authHelpers
    .handleErrors(req)
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(req.body.password, salt);
      return knex('users')
        .insert({
          username: req.body.username,
          password: hash,
        })
        .returning('*');
    })
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
};

module.exports = {
  getAllUsers,
  createUser,
};
