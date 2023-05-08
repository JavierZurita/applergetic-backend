const express = require('express');
// const {login, register, getAlergias, updateAlergias} = require('../controllers/user.controller');
const {login, register, getUserByEmail , getUserData, updateUserData} = require('../controllers/user.controller');
const {isAuth} = require('../../middleware/auth.js');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
// router.get('/alergias', getAlergias);
// router.put('/alergias',updateAlergias);
router.get('/email/:email', getUserByEmail);
router.get('/:id', getUserData);
router.put('/:id',updateUserData);
module.exports = router;