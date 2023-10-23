const { response } = require('express')

const DriverModel = require('../models/DriverModel')

const create = async (req, res) => {
  try {
    const { transport_id, dni, img, last_name, name, phone } = req.body
    const resp = await DriverModel.create(
      transport_id,
      dni,
      img,
      last_name,
      name,
      phone
    )
    resp === 'error'
      ? res.send('Error al crear el registro en la base de datos')
      : res.send('Camion creado con éxito')
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el camion' })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const { name, last_name, phone, dni, img } = req.body
    const resp = await DriverModel.update(name, last_name, phone, dni, img, id)
    resp === 'error'
      ? res.send('Error al actualizar el registro en la base de datos')
      : res.send('Camion actualizado con éxito')
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el camion' })
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await DriverModel.remove(id)
    resp === 'error'
      ? res.send('Error al eliminar el registro en la base de datos')
      : res.send('Camion eliminado con éxito')
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el camion' })
  }
}

const list = async (req, res) => {
  try {
    const { transport_id } = req.params
    console.log(transport_id)
    const resp = await DriverModel.list(transport_id)
    console.log('transport_id:', transport_id)
    resp === 'error'
      ? res.send('Error al mostrar registros desde la base de datos')
      : res.send(resp)
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los conductores' })
  }
}
const softDelete = async (req, res) => {
  try {
    const { id } = req.params

    const resp = await DriverModel.softDelete(id)
    resp === 'error'
      ? res.send('Error al actualizar el registro en la base de datos')
      : res.send('Camion eliminado con éxito')
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el camion' })
  }
}

const all = async (req, res) => {
  const response = await DriverModel.all()
  res.json(response)
}

module.exports = {
  all,
  create,
  update,
  remove,
  softDelete,
  list,
}
