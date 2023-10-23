const {
  cubic_meters,
  max_weight,
  long_load,
  wide_load,
  high_load,
} = require("./TruckMiddleware");
const TripMiddleware = async (req, res, next) => {
  try {
    const {
      truck_id,
      transport_id,
      driver_phone,
      diver_name,
      origin,
      destiny,
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
    } = req.body;
    if (
      truck_id === undefined ||
      transport_id === undefined ||
      driver_phone === undefined ||
      diver_name === undefined ||
      origin === undefined ||
      destiny === undefined ||
      trip_date_ini === undefined ||
      time_ini === undefined ||
      time_end === undefined ||
      trip_date_end === undefined ||
      type_load_trip === undefined ||
      cubic_meters_trip === undefined ||
      max_weight_trip === undefined ||
      long_load_trip === undefined ||
      wide_load_trip === undefined ||
      high_load_trip === undefined ||
      truck_id === "" ||
      transport_id === "" ||
      driver_phone === "" ||
      diver_name === "" ||
      origin === "" ||
      destiny === "" ||
      trip_date_ini === "" ||
      time_ini === "" ||
      time_end === "" ||
      trip_date_end === "" ||
      type_load_trip === "" ||
      cubic_meters_trip === "" ||
      max_weight_trip === "" ||
      long_load_trip === "" ||
      wide_load_trip === "" ||
      high_load_trip === ""
    ) {
      res.status(400).json({
        message:
          "No se han ingresado todos los datos para el registro del viaje",
      });
    } else if (trip_date_ini > trip_date_end) {
      res.status(400).json({
        message: "La fecha de inicio no puede ser mayor a la fecha final",
      });
    } else if (trip_date_ini === trip_date_end && time_ini > time_end) {
      res.status(400).json({
        message: "La hora de inicio no puede ser mayor a la hora final donde la fecha de inicio sea igual a la fecha final.",
      });
    } else if (cubic_meters_trip > cubic_meters) {
      res.status(400).json({
        message:
          "Los metros cubicos del viaje no pueden superar a la capacidad del camión",
      });
    } else if (max_weight_trip > max_weight) {
      res.status(400).json({
        message:
          "La capacidad maxima de carga, no puede superar a la capacidad del camión",
      });
    } else if (long_load_trip > long_load) {
      res.status(400).json({
        message: "El largo de la carga no puede superar al largo del camión",
      });
    } else if (wide_load_trip > wide_load) {
      res.status(400).json({
        message: "El ancho de la carga no puede superar al ancho del camión",
      });
    } else if (high_load_trip > high_load) {
      res.status(400).json({
        message: "El alto de la carga no puede superar al alto del camión",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Error al registrar un nuevo viaje" });
  }
};

module.exports = { TripMiddleware };
