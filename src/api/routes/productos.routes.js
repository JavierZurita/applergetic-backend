const express = require("express");

const {getProductos, getProductosById, getProductosByBarcode, postProducto} = require('../controllers/productos.controller');

const router = express.Router();

router.get("/", getProductos);
router.get("/:id", getProductosById);
router.get("/:barcode", getProductosByBarcode);
router.post("/", postProducto);

module.exports = router;