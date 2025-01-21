const { Router } = require('express');
const AuditController = require('../controllers/AuditControllers.js');

const router = Router();
router.post('/newRegister', AuditController.register);
// router.post('/newMembers', AuditController.cadastraMembros);
// router.get('/allProject', AuditController.todosProjetos);


module.exports = router