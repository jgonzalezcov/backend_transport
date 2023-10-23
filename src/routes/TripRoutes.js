const express = require('express')
const router = express.Router()
const TripController = require('../controllers/TripController')
const { loggerMiddleware } = require('../middlewares/LoggerMiddleware')
const { loginMiddleware } = require('../middlewares/LoginMiddleware')
const { TripMiddleware } = require('../middlewares/TripMiddleware')
const middlewares = [loggerMiddleware, loginMiddleware, TripMiddleware]

/** @description Crear un viaje  */
router.post('/', loggerMiddleware, TripController.create)

/** @description Crear un viaje  */
router.get('/all', loggerMiddleware, TripController.all)

/** @description Modificar la información de un viaje */
router.put('/:id', loggerMiddleware, TripController.update)

/** @description Eliminar de manera lógica un viaje */
router.delete('/:id', loggerMiddleware, TripController.remove)

/** @description Listado de todos los viajes de un transportista */
router.get('/:transport_id', loggerMiddleware, TripController.list)

/** @description Listado de todos los viajes de un transportista */
router.post('/listforclient', loggerMiddleware, TripController.listforclient)

/** @description Modificar el estado de un viaje */
router.put('/softdelete/:id', loggerMiddleware, TripController.softDelete)

/** @description Modificar el estado de un viaje */
router.put('/state/:id', loggerMiddleware, TripController.updateState)
module.exports = router
