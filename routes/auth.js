const express = require('express');
const { register, login, dashboard } = require('../controllers/auth');
const router = express.Router();
const authenticationMiddleware = require('../middlewares/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/dashboard').get(authenticationMiddleware, dashboard);

module.exports = router