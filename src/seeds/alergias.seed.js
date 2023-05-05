const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Alergia = require('../api/models/alergias.model');

const arrayAlergias = [
    {name: "Acido benzoico"},
    {name: "Almendras"},
    {name: "Altramuces"},
    {name: "Anacardo"},
    {name: "Apio"},
    {name: "Arroz"},
    {name: "Avellana"},
    {name: "Cacahuete"},
    {name: "Cacao"},
    {name: "Castaña"},
    {name: "Cereales"},
    {name: "Coco"},
    {name: "Crustaceos"},
    {name: "Fenilalanina"},
    {name: "Fibras"},
    {name: "Fresa"},
    {name: "Fructosa"},
    {name: "Frutas"},
    {name: "Frutos con cáscara"},
    {name: "Frutos rojos"},
    {name: "Gelatina"},
    {name: "Gisante"},
    {name: "Glucosa"},
    {name: "Gluten"},
    {name: "Huevo"},
    {name: "Kiwi"},
    {name: "Lactosa"},
    {name: "Leche"},
    {name: "Legumbres"},
    {name: "Lenteja"},
    {name: "Lino"},
    {name: "LTP"},
    {name: "Maiz"},
    {name: "Marisco"},
    {name: "Melocotón"},
    {name: "Moluscos"},
    {name: "Mostaza"},
    {name: "Nueces"},
    {name: "Pescado"},
    {name: "Piñones"},
    {name: "Pistachos"},
    {name: "Plátanos"},
    {name: "Rosaceas"},
    {name: "Sésamo"},
    {name: "Soja"},
    {name: "Sulfitos"},
    {name: "Tomate"},
    {name: "Trazas"},
    {name: "Trigo"},
    {name: "Uva"},
    {name: "Vitamina D"},
    {name: "Vitamina E"},
    {name: "Yuca"}
]
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async() => {
    const allAlergias = await Alergia.find();
    if(allAlergias.length){
        await Alergia.collection.drop();
        console.log("Alergias eliminadas");
    };
})
.catch((err) => console.log("Fallo eliminando alergias"))
.then(async() => {
    const alergiasMap = arrayAlergias.map((alergia) => new Alergia(alergia));
    await Alergia.insertMany(alergiasMap);
    console.log("Alergias creadas");
})
.catch((err) => console.log("Fallo insertando alergias", err))
.finally(() => mongoose.disconnect());