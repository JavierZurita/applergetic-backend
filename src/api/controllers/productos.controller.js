const Productos = require("../models/productos.model");

const getProductos = async(req, res) => {
    try {
        const allProductos = await Productos.find().populate("alergias", "name");
        return res.status(200).json(allProductos);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getProductosById = async(req,res) => {
    try {
        const {id} = req.params;
        const producto = await Productos.findById(id);
        return res.status(200).json(producto);
    } catch (error) {
        return res.status(500).json(error);
    }
}

getProductosByBarcode = async(req, res) => {
    try {
        const {barCode} = req.params;
        const producto = await Productos.findOne({barcode: barCode});
        return res.status(200).json(producto);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postProducto = async (req, res) => {
    try {
      const { name, alergias, barcode, image } = req.body;
  
      const nuevoProducto = new Productos({
        name,
        alergias,
        barcode,
        image
      });
      const productoGuardado = await nuevoProducto.save();
      res.status(201).json(productoGuardado);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("FALLO AL CREAR PRODUCTO", error);
    }
  };

module.exports = {getProductos, getProductosById, getProductosByBarcode, postProducto};