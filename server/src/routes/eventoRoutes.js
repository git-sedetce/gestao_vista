const { Router } = require('express')
const EventoController = require('../controllers/EventoControllers')


const router = Router()
router.get('/')
router.post('/cadastroEvento', EventoController.cadastroEvento)
router.get('/listaEvento', EventoController.listarEventos)
router.get('/listaEventoAcompanhamento', EventoController.listarEventosFollows)
router.get('/listEvent/:id', EventoController.listarEvents)
router.get('/listaEvento/:id', EventoController.listarEventosbyEvento)
router.get('/listaEventoSec/:id', EventoController.listarEventosbySecretaria)
router.get('/listaEventoLocal/:id', EventoController.listarEventosbyLocal)
router.get('/listaEventoRec/:id', EventoController.listarEventosbyRecursos)
router.get('/listaEventoPart/:id', EventoController.listarEventosbyParticipacao)
router.put('/atuaizaEvento/:id', EventoController.updateEvent)
router.delete('/deletaEvento/:id', EventoController.apagaEvento)

router.get('/listaEventoByMes/:mes', EventoController.listarEventosByMes)
router.get('/listaEventoByAno/:ano', EventoController.listarEventosByAno)

module.exports = router