const { Router } = require('express')
const TypeController = require('../controllers/TypeControllers')


const router = Router()
router.get('/listaSexec', TypeController.listarSexec)
router.get('/listaTipoEvento', TypeController.listarTipoEvento)
router.get('/listaLocal', TypeController.listarLocal)
router.get('/listaParticipacao', TypeController.listarParticipacao)
router.get('/listaRecursos', TypeController.listarRecursos)

module.exports = router