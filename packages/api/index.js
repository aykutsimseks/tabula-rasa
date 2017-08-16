const express = require('express');
const router = express.Router();

const users = require('./users');

const authHelpers = require('../middleware/auth/_helpers');

router.get('/users', authHelpers.adminRequired, users.getAllUsers);

router.get('/user', authHelpers.loginRequired, (req, res) => {
	var user = req.user;
	delete user.password;

  authHelpers.handleResponse(res, 200, req.user);
});

router.get('/admin', authHelpers.adminRequired, (req, res) => {
  authHelpers.handleResponse(res, 200, 'success');
});

router.get('/healthcheck', (req, res) => {
  authHelpers.handleResponse(res, 200, 'success');
});

module.exports = router;
