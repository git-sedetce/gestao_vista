const { Router } = require('express')
const AcompanhamentoController = require('../controllers/AcompanhamentoControllers')


const router = Router()
router.post('/cadastroFollow', AcompanhamentoController.cadastroFollow)
router.get('/listaFollow', AcompanhamentoController.listarFollows)
router.get('/listaFollow/:id', AcompanhamentoController.listarFollowsbyId)
router.get('/listaFollowByEvento/:id', AcompanhamentoController.listarFollowsbyEvento)
router.get('/listaFollowByStatus/:stats', AcompanhamentoController.listarFollowsbyStats)

router.put('/atualizaFollow/:id', AcompanhamentoController.updateFollow)
router.delete('/deletaFollow/:id', AcompanhamentoController.apagaFollow)

module.exports = router