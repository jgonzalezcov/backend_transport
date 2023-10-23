const jwt = require('jsonwebtoken')
const { duplicateUser } = require('../models/ClientModel')
/**********************Valida creacion de usuario**********************/
const validateFields = async (req, res, next) => {
  try {
    const { email, password, name, last_name, phone, address, img } = req.body
    resp = parseInt(await duplicateUser(email))
    if (
      email === undefined ||
      password === undefined ||
      name === undefined ||
      last_name === undefined ||
      phone === undefined ||
      address === undefined ||
      img === undefined ||
      email === '' ||
      password === '' ||
      name === '' ||
      last_name === '' ||
      phone === '' ||
      address === '' ||
      img === ''
    ) {
      res.status(400).json({
        message:
          'No se han ingresado todos los datos para el registro de usuario',
      })
    } else if (resp > 0) {
      res.status(400).json({
        message:
          'El correo ingresado ya se encuentra asociado a una cuenta de transportista',
      })
    } else {
      next()
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al crear un nuevo usuario' })
  }
}

module.exports = { validateFields }
