const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Producto = require('../api/models/productos.model');

const arrayProductos = [
    {
        "name": "Patatas Lays",
        "alergias": ["6454c71af77903aa26ff5b80", "6454c71af77903aa26ff5b8e"],
        "barcode": 9780201379624,
        "marca": "Lays",
        "image": "https://res.cloudinary.com/dw11t6pjw/image/upload/v1679473515/cld-sample-5.jpg",
        "ingredientes": ["Patata","Sal", "lo que sea"]
    },{
        "name": "Batido de vainilla",
        "alergias": ["6454c71af77903aa26ff5b8e"],
        "ingredientes": ["Leche desnatada","crema","azúcar","jarabe de maíz","proteína de suero de leche","goma xantana","goma guar","aroma natural de vainilla"],
        "barcode": 9780201371888,
        "image": "https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202205/03/00120911801460____14__600x600.jpg",
        "marca": "Puleva"
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