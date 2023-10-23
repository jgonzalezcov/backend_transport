
const truckMiddleware = async (req, res, next) => {
  try {
    const {
      id,
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
      condition,
    } = req.body;
    if (
      id === undefined ||
      transport_id === undefined ||
      name === undefined ||
      country_patent === undefined ||
      patent === undefined ||
      maken === undefined ||
      model === undefined ||
      color === undefined ||
      type_load === undefined ||
      cubic_meters === undefined ||
      max_weight === undefined ||
      long_load === undefined ||
      wide_load === undefined ||
      high_load === undefined ||
      condition === undefined ||
      id === "" ||
      transport_id === "" ||
      name === "" ||
      country_patent === "" ||
      patent === "" ||
      maken === "" ||
      model === "" ||
      color === "" ||
      type_load === "" ||
      cubic_meters === "" ||
      max_weight === "" ||
      long_load === "" ||
      wide_load === "" ||
      high_load === "" ||
      condition === ""
    ) {
      res.status(400).json({
        message:
          "No se han ingresado todos los datos para el registro del camión",
      });
    } else if (type_load ('Container', 'Container Refrigerado', 'Remolque cerrado', 'Remolque abierto')) {
      res.status(400).json({
        message:
          "Ingrese un tipo de carga válido",
      });
    } else if (cubic_meters < 184,5) {
      res.status(400).json({
        message:
          "Los metros cúbicos no pueden exceder el máximo legal establecido (184,5 metros cúbicos)",
      });
    } else if (max_weight < 31000) {
      res.status(400).json({
        message:
          "La carga no puede exceder el máximo legal establecido (31.000 kilos).",
      });
    } else if (long_load < 16,5) {
        res.status(400).json({
          message:
            "La carga no puede exceder el largo legal establecido (16,5 metros).",
        });
    } else if (wide_load < 2,6) {
      res.status(400).json({
        message:
          "El ancho del camión no puede superar el ancho legal establecido (2,6 metros).",
      });
    } else if (high_load < 4,3) {
      res.status(400).json({
        message:
          "El alto del camión no puede superar el alto legal establecido (4,3 metros).",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Error al crear un nuevo Camión" });
  }
};

module.exports = { truckMiddleware };
