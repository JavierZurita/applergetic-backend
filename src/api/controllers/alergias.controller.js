const Alergias = require('../models/alergias.model');

const getAlergias = async (req, res) => {
    try {
        const allAlergias = await Alergias.find();
        return res.status(200).json(allAlergias)
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getAlergias};