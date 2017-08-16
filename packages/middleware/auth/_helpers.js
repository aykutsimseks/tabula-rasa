const knex = require('../../../db/connection');
const bcrypt = require('bcryptjs');

const comparePass = (userPassword, databasePassword) =>
  bcrypt.compareSync(userPassword, databasePassword);

const handleErrors = (req) => {
  return new Promise((resolve, reject) => {
    if (req.body.username.length < 6) {
      reject({
        message: 'Username must be longer than 6 characters',
      });
    } else if (req.body.password.length < 6) {
      reject({
        message: 'Password must be longer than 6 characters',
      });
    } else {
      resolve();
    }
  });
};

const handleLogin = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

const handleResponse = (res, code, statusMsg) => {
  res.status(code).json({ status: statusMsg });
};

const loginRequired = (req, res, next) => {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });

  return next();
};

const adminRequired = (req, res, next) => {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });

  return knex('users')
    .where({ uid: req.user.uid })
    .first()
    .then((user) => {
      if (!user.admin) res.status(401).json({ status: 'You are not authorized' });
      return next();
    })
    .catch((err) => {
      res.status(500).json({ status: 'Something bad happened' });
    });
};

const loginRedirect = (req, res, next) => {
  if (req.user) {
    return res
      .status(401)
      .json({ status: 'You are already logged in' });
  }
  return next();
};

module.exports = {
  comparePass,
  loginRequired,
  adminRequired,
  loginRedirect,
  handleErrors,
  handleLogin,
  handleResponse,
};
