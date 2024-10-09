const { Router } = require('express')
const StatisticsController = require('../controllers/StatisticsControllers')


const router = Router()
router.get('/countEventByYear', StatisticsController.eventoPorAno)
router.get('/countTypeEventByYear/:year', StatisticsController.tipoEventoPorAno)
router.get('/countRespByYear/:year', StatisticsController.respPorAno)
router.get('/countTypePartcByYear/:year', StatisticsController.tipoPartPorAno)
router.get('/countTypeRecByYear/:year', StatisticsController.tipoRecPorAno)
router.get('/countTypeLocalByYear/:year', StatisticsController.tipoLocalPorAno)

module.exports = router