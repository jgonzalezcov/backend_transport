const express = require('express')
const router = express.Router()
const DriverController = require('../controllers/DriverController')
const { loggerMiddleware } = require('../middlewares/LoggerMiddleware')
const { loginMiddleware } = require('../middlewares/LoginMiddleware')
const middlewares = [loggerMiddleware, loginMiddleware]

/** @description Crear un conductor  */
router.post('/', loggerMiddleware, DriverController.create)

/** @description Modificar la información de un conductor */
router.put('/:id', loggerMiddleware, DriverController.update)

/** @description Eliminar de manera lógica un conductor */
router.delete('/:id', loggerMiddleware, DriverController.remove)

/** @description Listado de todos los conductor de un transportista */
router.get('/:transport_id', loggerMiddleware, DriverController.list)

/** @description Modificar el estado de un conductor */
router.put('/softdelete/:id', loggerMiddleware, DriverController.softDelete)

module.exports = router
