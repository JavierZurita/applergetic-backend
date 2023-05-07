const express = require('express');
// const {login, register, getAlergias, updateAlergias} = require('../controllers/user.controller');
const {login, register, getUserData, updateUserData} = require('../controllers/user.controller');
const {isAuth} = require('../../middleware/auth.js');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
// router.get('/alergias', getAlergias);
// router.put('/alergias',updateAlergias);
router.get('/user/:id', getUserData);
router.put('/user/me',updateUserData);
module.exports = router;