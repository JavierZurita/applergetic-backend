const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Producto = require('../api/models/productos.model');

const arrayProductos = [
    {
        "name": "Prueba",
        "alergias": ["6454c71af77903aa26ff5b78", "6454c71af77903aa26ff5b79"],
        "barcode": 84104943000043,
        "image": "https://res.cloudinary.com/dw11t6pjw/image/upload/v1679473515/cld-sample-5.jpg"
    },
]

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async() => {
    const allProductos = await Producto.find();
    if(allProductos.length){
        await Producto.collection.drop();
        console.log("Productos eliminadas");
    };
})
.catch((err) => console.log("Fallo eliminando productos"))
.then(async() => {
    const productosMap = arrayProductos.map((producto) => new Producto(producto));
    await Producto.insertMany(productosMap);
    console.log("Productos creadas");
})
.catch((err) => console.log("Fallo insertando productos", err))
.finally(() => mongoose.disconnect());