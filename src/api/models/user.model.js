const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
        number: {type: Number, required: true},
        name: {type: String, required: true},
        contactName: {type: String},
        contactEmail: {type: String},
        contactNumber: {type: Number},
        company: {type: String},
        alergias: [{type: Schema.Types.ObjectId, ref: "alergia"}],
        diario: [{type: Schema.Types.ObjectId, ref: "producto"}]
    }
)

module.exports = mongoose.model('user', userSchema);