const express = require('express')
const router = express.Router()
const TruckController = require('../controllers/TruckController')
const { loggerMiddleware } = require('../middlewares/LoggerMiddleware')
const { loginMiddleware } = require('../middlewares/LoginMiddleware')
const middlewares = [loggerMiddleware, loginMiddleware]

/** @description Crear un camion  */
router.post('/', loggerMiddleware, TruckController.create)

/** @description Modificar la información de un camion */
router.put('/:id', loggerMiddleware, TruckController.update)

/** @description Eliminar de manera lógica un camion */
router.delete('/:id', loggerMiddleware, TruckController.remove)

/** @description Listado de todos los camiones de un transportista */
router.get('/:transport_id', loggerMiddleware, TruckController.list)

/** @description Modificar el estado de un camion */
router.put('/softdelete/:id', loggerMiddleware, TruckController.softDelete)

module.exports = router
