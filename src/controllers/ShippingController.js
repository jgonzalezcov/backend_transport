const ShippingModel = require('../models/ShippingModel')

const getByClientId = async (req, res) => {
  try {
    const clientId = req.query.clientId
    const shippings = await ShippingModel.getByClientId(clientId)
    res.json(shippings)
  } catch (e) {
    res.status(500).json({ message: e + '' })
  }
}

const getByTripId = async (req, res) => {
  try {
    const tripId = req.params.id
    const shippings = await ShippingModel.getByTripId(tripId)
    res.json(shippings)
  } catch (e) {
    res.status(500).json({ message: e + '' })
  }
}

const getById = async (req, res) => {
  try {
    const shippingId = req.params.id
    const shipping = await ShippingModel.getById(shippingId)
    res.json(shipping)
  } catch (e) {
    res.status(500).json({ message: e + '' })
  }
}

const update = async (req, res) => {
  try {
    const shippingId = req.params.id
    const body = req.body
    const shipping = await ShippingModel.update(shippingId, body)
    res.json(shipping)
  } catch (e) {
    res.status(500).json({ message: e + '' })
  }
}
const updateState = async (req, res) => {
  try {
    const shippingId = req.params.id
    const body = req.body
    console.log('accaaaaaa datos', shippingId, body)
    const shipping = await ShippingModel.updateState(shippingId, body)
    res.json(shipping)
  } catch (e) {
    res.status(500).json({ message: e + '' })
  }
}

const create = async (req, res) => {
  try {
    const {
      trip_id,
      transport_id,
      client_id,
      description,
      origin_address,
      destiny_address,
      cubic_meters_shipping,
      weight_shipping,
      long_load_shipping,
      wide_load_shipping,
      high_load_shipping,
    } = req.body

    const response = await ShippingModel.create({
      trip_id,
      transport_id,
      client_id,
      description,
      origin_address,
      destiny_address,
      cubic_meters_shipping,
      weight_shipping,
      long_load_shipping,
      wide_load_shipping,
      high_load_shipping,
    })
    response === 'error'
      ? res.json({ msj: 'error al crear registro en la bd' })
      : res.json({ msj: 'Creacion exitosa' })
  } catch (e) {
    res.status(500).json({ msj: e })
  }
}

module.exports = {
  getByClientId,
  update,
  getById,
  create,
  getByTripId,
  updateState,
}
