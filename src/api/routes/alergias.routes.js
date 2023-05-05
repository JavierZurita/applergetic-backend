const express = require("express");

const {getAlergias} = require("../controllers/alergias.controller");

const router = express.Router();

router.get("/",getAlergias);

module.exports = router;