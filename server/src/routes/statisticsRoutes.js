const { Router } = require('express')
const StatisticsController = require('../controllers/StatisticsControllers')


const router = Router()
router.get('/countEventByYear', StatisticsController.eventoPorAno)
router.get('/countTypeEventByYear', StatisticsController.tipoEventoPorAno)
router.get('/countRespByYear', StatisticsController.respPorAno)
router.get('/countTypePartcByYear', StatisticsController.tipoPartPorAno)
router.get('/countTypeRecByYear', StatisticsController.tipoRecPorAno)
router.get('/countTypeLocalByYear', StatisticsController.tipoLocalPorAno)

module.exports = router