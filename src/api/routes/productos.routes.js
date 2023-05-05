const express = require("express");

const {getProductos, getProductosById} = require('../controllers/productos.controller');

const router = express.Router();

router.get("/", getProductos);
router.get("/:id", getProductosById);

module.exports = router;