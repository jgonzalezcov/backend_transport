const { response } = require('express')

const TruckModel = require('../models/TruckModel')

const create = async (req, res) => {
  try {
    const {
      transport_id,
      name,
      country_patent,
      patent,
      maken,
      model,
      color,
      type_load,
      cubic_meters,
      max_weight,
      long_load,
      wide_load,
      high_load,
    } = req.body
    const resp = await TruckModel.create(
      transport_id,
      name,
      country_patent,
      patent,
      maken,
      model,
      color,
      type_load,
      cubic_meters,
      max_weight,
      long_load,
      wide_load,
      high_load
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
    const {
      name,
      country_patent,
      patent,
      maken,
      model,
      color,
      type_load,
      cubic_meters,
      max_weight,
      long_load,
      wide_load,
      high_load,
    } = req.body
    const resp = await TruckModel.update(
      name,
      country_patent,
      patent,
      maken,
      model,
      color,
      type_load,
      cubic_meters,
      max_weight,
      long_load,
      wide_load,
      high_load,
      id
    )
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
    const resp = await TruckModel.remove(id)
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
    const resp = await TruckModel.list(transport_id)
    console.log('transport_id:', transport_id)
    resp === 'error'
      ? res.send('Error al mostrar registros desde la base de datos')
      : res.send(resp)
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los camiones' })
  }
}

const softDelete = async (req, res) => {
  try {
    const { id } = req.params
    console.log('soy id:', id)
    const resp = await TruckModel.softDelete(id)
    resp === 'error'
      ? res.send('Error al actualizar el registro en la base de datos')
      : res.send('Camion eliminado con éxito')
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el camion' })
  }
}

const all = async (req, res) => {
  const response = await TruckModel.all()
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
