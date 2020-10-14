/*
path = /api/login
*/

const {Router} = require('express');
const router = Router();
const{check} = require('express-validator');
const {crearUsuario,login,refreshToken} = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');
const{validarToken} = require('../middlewares/validar-token');

/*Refresh token */
router.get('/refreshToken',validarToken,refreshToken);

/**Login */
router.post('/',[
    check('email','El email no es correcto').isEmail(),
    check('pass','Contraseña minimo 3 caracteres').isLength(3),
    validarCampos
],login);

/**Nuevo usuario */
//Agregamos nuestros middleWares para validar , nombre , correo, y pass, con el paquete check.Hara lo sig...
//Leo un middleWare y paso al metodo validarCampos, leo otro middleWare y paso al metodo validarCampo etc etc..
router.post('/new',[
    check('nombre','El campo nombre es obligatorio').notEmpty(),
    check('email','El email no es correcto').isEmail(),
    check('pass','Contraseña minimo 3 caracteres').isLength(3),
    validarCampos
],crearUsuario);


module.exports = router;
