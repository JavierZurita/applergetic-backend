const express = require('express');
const {login, register, checkSession, getAlergias, updateAlergias} = require('../controllers/user.controller');
const {isAuth} = require('../../middleware/auth.js');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/checksession', [isAuth], checkSession);
router.get('/alergias', getAlergias);
router.put('/alergias',updateAlergias);

module.exports = router;