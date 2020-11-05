const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuariosController")

router.get('/',usuariosController.home )
router.get('/registro',usuariosController.registro )
router.get('/Crear_vacante',usuariosController.crear_vacante )
router.get('/login',usuariosController.login )
router.get('/list',usuariosController.list )
router.post('/add',usuariosController.save)
router.get('/delete/:id',usuariosController.delete)
router.get('/update/:id',usuariosController.update)
router.post('/update/:id',usuariosController.saveUpdate)







module.exports = router;
