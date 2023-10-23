const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const TransportModel = require('../models/TransportModel')

const getTokenBody = (transport) => {
  return {
    id: transport.id,
    name: transport.name,
    last_name: transport.last_name,
    email: transport.email,
    phone: transport.phone,
    address: transport.address,
    img: transport.img,
    password: transport.password,
    condition: transport.condition,
    total_starts: transport.total_starts,
    num_qualification: transport.num_qualification,
    role: 'transport',
  }
}

const login = async (req, res) => {
  try {
    let { email, password } = req.body
    const transport = await TransportModel.getByEmail(email)
    const passwordIsCorrect = bcrypt.compareSync(password, transport.password)
    console.log('Biennnnn', transport)
    if (passwordIsCorrect && transport) {
      const tokenPayload = getTokenBody(transport)
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET)
      res.send(token)
    } else {
      res.status(401).json({ message: 'Email o contraseña incorrecta' })
    }
  } catch (e) {
    console.log('falla', e)
    res.status(500).json({ message: 'Error al ingresar el usuario' })
  }
}

const signin = async (req, res) => {
  try {
    let { email, password, name, last_name, phone, address, img } = req.body
    password = bcrypt.hashSync(password)
    response = await TransportModel.signin({
      email,
      password,
      name,
      last_name,
      phone,
      address,
      img,
    })
    res.json(response)
  } catch (e) {
    console.log('falla', error)
    res.status(500).json({ message: 'Error al actualizar el usuario' })
  }
}

const list = async (req, res) => {
  try {
    response = await TransportModel.list()
    res.json(response)
  } catch (e) {
    console.log('falla', error)
    res.status(500).json({ message: 'Error al actualizar el usuario' })
  }
}

const getById = async (req, res) => {
  try {
    const id = req.params.id
    response = await TransportModel.getById(id)
    res.json(response)
  } catch (e) {
    console.log('falla', error)
    res.status(500).json({ message: 'Error al actualizar el usuario' })
  }
}

const remove = async (req, res) => {
  try {
    const id = req.params.id
    response = await TransportModel.remove(id)
    res.json(response)
  } catch (e) {
    console.log('falla', error)
    res.status(500).json({ message: 'Error al actualizar el usuario' })
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.id
    response = await TransportModel.update(id)
    res.json(response)
  } catch (e) {
    console.log('falla', error)
    res.status(500).json({ message: 'Error al actualizar el usuario' })
  }
}

const deleteByEmail = async (req, res) => {
  try {
    const email = req.params.email
    const response = await TransportModel.deleteByEmail(email)
    res.json(response)
  } catch (e) {
    console.log('falla', error)
    res.status(500).json({ message: 'Error al actualizar el usuario' })
  }
}

const updateData = async (req, res) => {
  try {
    const { id } = req.params
    const { name, last_name, phone, address } = req.body
    const response = await TransportModel.updateData(
      name,
      last_name,
      phone,
      address,
      id
    )
    const transport = await TransportModel.getById(id)
    const tokenPayload = getTokenBody(transport)
    response === 'error'
      ? res.send('Error al actualizar el registro en la base de datos')
      : res.send(jwt.sign(tokenPayload, process.env.JWT_SECRET))
  } catch (error) {
    console.log('falla', error)
    res.status(500).json({ message: 'Error al actualizar el usuario' })
  }
}

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params
    let { password } = req.body
    console.log('llego aca', password, id)
    password = bcrypt.hashSync(password)
    const response = await TransportModel.updatePassword(password, id)
    const transport = await TransportModel.getById(id)
    const tokenPayload = getTokenBody(transport)
    response === 'error'
      ? res.send('Error 333333 al actualizar el registro en la base de datos')
      : res.send(jwt.sign(tokenPayload, process.env.JWT_SECRET))
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al actualizar el usuario' })
  }
}

module.exports = {
  login,
  signin,
  list,
  getById,
  remove,
  update,
  deleteByEmail,
  updateData,
  updatePassword,
}
