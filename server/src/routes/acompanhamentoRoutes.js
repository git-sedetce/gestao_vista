const { Router } = require('express')
const AcompanhamentoController = require('../controllers/AcompanhamentoControllers')


const router = Router()
router.post('/cadastroFollow', AcompanhamentoController.cadastroFollow)
router.get('/listaFollow', AcompanhamentoController.listarFollows)
router.get('/listaFollow/:id', AcompanhamentoController.listarFollowsbyId)

module.exports = router