/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

router.post(
    '/new',
    // Middlewares
    [  
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres o más').isLength({ min: 6 }),
    ],
    crearUsuario);

router.post(
    '/', 
    // Middlewares
    [
        check('email', 'El email es inválido').isEmail(),
        check('password', 'El password debe ser de 6 caracteres o más').isLength({ min: 6 }),
    ], 
    loginUsuario);

router.get('/renew', revalidarToken);



module.exports = router;