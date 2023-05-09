const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productoSchema = new Schema(
    {
        name: {type: String, required: true},
        alergias: [{type: Schema.Types.ObjectId, ref: "alergia"}],
        ingredientes: [{type: String}],
        barcode: {type: Number, required: true},
        image: {type: String},
        marca: {type: String}
    }
)

module.exports = mongoose.model('producto', productoSchema);