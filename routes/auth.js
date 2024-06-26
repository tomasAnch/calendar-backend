/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

router.post(
    '/new',
    // Middlewares
    [  
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres o más').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/', 
    // Middlewares
    [
        check('email', 'El email es inválido').isEmail(),
        check('password', 'El password debe ser de 6 caracteres o más').isLength({ min: 6 }),
        validarCampos
    ], 
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken); 



module.exports = router;