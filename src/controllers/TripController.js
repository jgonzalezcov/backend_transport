const { response } = require('express')

const TripModel = require('../models/TripModel')

const create = async (req, res) => {
  try {
    const {
      truck_id,
      transport_id,
      driver_id,
      country_origin,
      country_destiny,
      city_origin,
      city_destiny,
      trip_date_ini,
      time_ini,
      time_end,
      trip_date_end,
      type_load,
      cubic_meters_trip,
      max_weight_trip,
      long_load_trip,
      wide_load_trip,
      high_load_trip,
    } = req.body
    const resp = await TripModel.create(
      truck_id,
      transport_id,
      driver_id,
      country_origin,
      country_destiny,
      city_origin,
      city_destiny,
      trip_date_ini,
      time_ini,
      time_end,
      trip_date_end,
      type_load,
      cubic_meters_trip,
      max_weight_trip,
      long_load_trip,
      wide_load_trip,
      high_load_trip
    )
    resp === 'error'
      ? res.send('Error al crear el registro en la base de datos')
      : res.send('viaje creado con éxito')
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el viaje' })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const {
      truck_id,
      transport_id,
      driver_id,
      country_origin,
      country_destiny,
      city_origin,
      city_destiny,
      trip_date_ini,
      time_ini,
      time_end,
      trip_date_end,
      type_load_trip,
      cubic_meters_trip,
      max_weight_trip,
      long_load_trip,
      wide_load_trip,
      high_load_trip,
    } = req.body
    const resp = await TripModel.update(
      truck_id,
      transport_id,
      driver_id,
      country_origin,
      country_destiny,
      city_origin,
      city_destiny,
      trip_date_ini,
      time_ini,
      time_end,
      trip_date_end,
      type_load_trip,
      cubic_meters_trip,
      max_weight_trip,
      long_load_trip,
      wide_load_trip,
      high_load_trip,
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
    const resp = await TripModel.remove(id)
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
    const resp = await TripModel.list(transport_id)
    console.log(transport_id)
    resp === 'error'
      ? res.send('Error al mostrar registros desde la base de datos')
      : res.send(resp)
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los viajes' })
  }
}

const listforclient = async (req, res) => {
  const {
    type_load_shipping,
    city_origin,
    city_destiny,
    country_destiny,
    country_origin,
    cubic_meters_shipping,
    high_load_shipping,
    long_load_shipping,
    status,
    time_end,
    time_ini,
    trip_date_end,
    trip_date_ini,
    weight_shipping,
    wide_load_shipping,
  } = req.body
  try {
    const resp = await TripModel.listforclient(
      type_load_shipping,
      city_origin,
      city_destiny,
      country_destiny,
      country_origin,
      cubic_meters_shipping,
      high_load_shipping,
      long_load_shipping,
      status,
      time_end,
      time_ini,
      trip_date_end,
      trip_date_ini,
      weight_shipping,
      wide_load_shipping
    )

    resp === 'error'
      ? res.send('Error al mostrar registros desde la base de datos')
      : res.send(resp)
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los viajes' })
  }
}

const softDelete = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await TripModel.softDelete(id)
    resp === 'error'
      ? res.send('Error al actualizar el registro en la base de datos')
      : res.send('Camion eliminado con éxito')
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el camion' })
  }
}

const updateState = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const resp = await TripModel.updateState(id, status)
    resp === 'error'
      ? res.send('Error al actualizar el registro en la base de datos')
      : res.send('Camion eliminado con éxito')
  } catch (error) {
    res.status(500).json({ message: 'Error actualizar estado' })
  }
}

const all = async (req, res) => {
  const response = await TripModel.all()
  res.json(response)
}

module.exports = {
  all,
  create,
  update,
  remove,
  softDelete,
  list,
  listforclient,
  updateState,
}
