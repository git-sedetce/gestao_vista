const { Router } = require('express')
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const AnexoController = require('../controllers/AnexoControllers')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const pastaUploads = path.join(__dirname, '../storage/uploads/eventos/img');
        verificarECriarPasta(pastaUploads);
        //cb(null, __dirname + '../../../../conerge/conerge/src/assets/uploads/noticias/img')
        cb(null, pastaUploads)
    },
    filename: function(req, file, cb){
        cb(null,  Date.now() + '_sde_' + 'evento_' + file.originalname)
      //cb(null, file.originalname + Date.now() + '.' + file.mimetype.split('/')[1])
      //cb(null, file.originalname + Date.now() + path.extname(file.originalname))
  }
})

// Função para verificar se a pasta existe e criar se não existir
function verificarECriarPasta(pastaPath) {
    if (!fs.existsSync(pastaPath)) {
        fs.mkdirSync(pastaPath, { recursive: true });
        console.log(`A pasta ${pastaPath} foi criada.`);
    } else {
        console.log(`A pasta ${pastaPath} já existe.`);
    }
  }

const upload = multer({ storage })

const router = Router()

router.post('/evento_imgs/:id', upload.array('files'), AnexoController.uploadImgs)
router.get('/pegaImagesEvento/:id', AnexoController.pegaImgById)
router.get('/countImgs', AnexoController.qtdImgensByID)



module.exports = router