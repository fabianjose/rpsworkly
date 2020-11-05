const express = require("express");
const router = express.Router();

const usuariosController = require("../controller/usuariosController")
var md_auth = require('../middlewares/authenticated');

router.get('/',usuariosController.list)

router.get('/registro',usuariosController.register);

router.post('/add',usuariosController.save)
router.get('/delete/:id',usuariosController.delete)
router.get('/update/:id', md_auth.authenticated, usuariosController.update)
router.post('/update/:id',usuariosController.saveUpdate)







module.exports = router;
