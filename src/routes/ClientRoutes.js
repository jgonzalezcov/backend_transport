const express = require('express')
const router = express.Router()
const ClientController = require('../controllers/ClientController')
const { loggerMiddleware } = require('../middlewares/LoggerMiddleware')
const { loginMiddleware } = require('../middlewares/LoginMiddleware')
const { validateFields } = require('../middlewares/ClientMiddleware')
const middlewares = [loggerMiddleware, loginMiddleware]
const signinMiddleware = [...middlewares, validateFields]

/** @description Iniciar sesión como un cliente  */
router.post('/login', loggerMiddleware, ClientController.login)

/** @description Crear una cuenta para cliente  */
router.post('/signin', loggerMiddleware, ClientController.signin)

/** @description Listado de todos los clientes */
router.get('/', middlewares, ClientController.list)

/** @description Obtener información de un cliente específico a través de su id */
router.get('/:id', middlewares, ClientController.getById)

/** @description Eliminar de manera lógica un cliente */
router.delete('/:id', middlewares, ClientController.remove)

router.delete(
  '/deleteByEmail/:email',
  middlewares,
  ClientController.deleteByEmail
)

/** @description Modificar la información de un cliente */
router.put('/:id', middlewares, ClientController.update)

/** @description Modificar informacion de transportista*/
router.put('/updateData/:id', loggerMiddleware, ClientController.updateData)
/** @description Modificar password de transportista*/
router.put(
  '/updatePassword/:id',
  loggerMiddleware,
  ClientController.updatePassword
)

module.exports = router
