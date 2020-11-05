const express = require("express");
const router = express.Router();

const usuariosController = require("../controller/usuariosController")
var md_auth = require('../middlewares/authenticated');

router.get('/',usuariosController.list)

router.get('/',usuariosController.home )
router.get('/registro',usuariosController.registro )
router.get('/Crear_vacante',usuariosController.crear_vacante )
router.get('/login',usuariosController.login )
router.get('/list',usuariosController.list )

router.post('/add',usuariosController.save)
router.get('/delete/:id',usuariosController.delete)
router.get('/update/:id', md_auth.authenticated, usuariosController.update)
router.post('/update/:id',usuariosController.saveUpdate)

router.post('/login',usuariosController.signIn);

module.exports = router;
