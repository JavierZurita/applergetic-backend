const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const {validateEmail, validatePassword, usedEmail} = require('../../utils/validators');
const {generateSign} = require('../../utils/jwt');

const login = async (req,res) => {
    try {
        const userInfo = await User.findOne({email: req.body.email});
        if(!userInfo) {
            return res.status(400).json({message: 'invalid email address'})
        }
        if(!bcrypt.compareSync(req.body.password, userInfo.password)){
            return res.status(400).json({message: 'invalid password'});
        }
        const token = generateSign(userInfo._id, userInfo.password);
        return res.status(200).json({userInfo, token});
    } catch (error) {
        return res.status(500).json(error);
    }
}

const register = async (req,res) => {
    try {
        const newUser = new User(req.body);
        if(!validateEmail(newUser.email)){
          console.log("1");
            return res.status(400).send({message: 'Invalid email'});
        }
        if(!validatePassword(newUser.password)){
          console.log("1");
          return res.status(400).send({message: 'Invalid password'});
        }
        if(await usedEmail(newUser.email) > 0){
          console.log("1");
          return res.status(400).send({message: 'Email is already in use'});
        }
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        const createdUser = await newUser.save();
        return res.status(201).json(createdUser);
    } catch (error) {
      console.log(error);
        return res.status(500).json(error)
    }
}

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }).populate("alergias");

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

const getUserData = async (req, res) => {
    try {
      const {id} = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los datos del usuario' });
    }
  };

  const updateUserData = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.number = req.body.number || user.number;
        user.name = req.body.name || user.name;
        user.contactName = req.body.contactName || user.contactName;
        user.contactEmail = req.body.contactEmail || user.contactEmail;
        user.contactNumber = req.body.contactNumber || user.contactNumber;
        user.company = req.body.company || user.company;
        user.alergias = req.body.alergias || user.alergias;

        const updatedUser = await user.save();
  
      res.json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al actualizar los datos del usuario' });
    }
  };
  
// const getAlergias = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({message: 'User not found'});
//         }
//         const alergias = user.alergias;
//         return res.status(200).json(alergias);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// }

// const updateAlergias = async (req, res) => {
//     try {
//         const userId = req.user._id; // Obtener el ID del usuario desde la información de sesión
//         const alergias = req.body.alergias; // Obtener la lista de alergias enviada en el cuerpo de la solicitud
//         const user = await User.findByIdAndUpdate(userId, {alergias: alergias}, {new: true}); // Buscar y actualizar el usuario en la base de datos
//         if (!user) {
//             return res.status(404).json({message: 'User not found'});
//         }
//         return res.status(200).json(user.alergias);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// }

// module.exports = {login, register, getAlergias, updateAlergias};
module.exports = {login, register, getUserByEmail , getUserData, updateUserData};