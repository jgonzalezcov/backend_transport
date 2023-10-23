
const driver = async (req, res, next) => {
  try {
    const {
      id,
      transport_id,
      trip_id,
      name,
      last_name,
      phone,
      dni,
      img
    } = req.body;
    if (
      id === undefined ||
      transport_id === undefined ||
      trip_id === undefined ||
      name === undefined ||
      last_name === undefined ||
      phone === undefined ||
      dni === undefined ||
      img === undefined ||
      id === "" ||
      transport_id === "" ||
      trip_id === "" ||
      name === "" ||
      last_name === "" ||
      phone === "" ||
      dni === "" ||
      img === "" 
    ) {
      res.status(400).json({
        message:
          "No se han ingresado todos los datos para el registro del conductor.",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el conductor" });
  }
};

module.exports = { driver };
