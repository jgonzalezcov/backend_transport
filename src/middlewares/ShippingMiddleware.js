const shippingMiddleware = async (req, res, next) => {
  console.log('soyresssssppppp', req.body)
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

    if (
      trip_id === undefined ||
      transport_id === undefined ||
      client_id === undefined ||
      description === undefined ||
      origin_address === undefined ||
      destiny_address === undefined ||
      cubic_meters_shipping === undefined ||
      weight_shipping === undefined ||
      long_load_shipping === undefined ||
      wide_load_shipping === undefined ||
      high_load_shipping === undefined ||
      trip_id === '' ||
      transport_id === '' ||
      client_id === '' ||
      description === '' ||
      origin_address === '' ||
      destiny_address === '' ||
      cubic_meters_shipping === '' ||
      weight_shipping === '' ||
      long_load_shipping === '' ||
      wide_load_shipping === '' ||
      high_load_shipping === ''
    ) {
      res.status(400).json({
        message:
          'No se han ingresado todos los datos para el registro de envío',
      })
    } else {
      next()
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al crear un nuevo envío' })
  }
}

module.exports = { shippingMiddleware }
