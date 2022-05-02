const { Router } = require('express');
const{ check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { esRoleValid, emailExiste, existeUserId } = require('../helpers/db-validators');

const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');


const router = Router();

router.get('/',  userGet );
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id'). custom( existeUserId ),
    check('role').custom( esRoleValid ),
    validateFields
], userPut );
router.post('/',[
    check('username', "El username es obligatorio...").not().isEmpty(),
    check('password', "La contraseña debe ser mayo de 6 caracteres...").isLength({min: 6}),
    check('email', "El email no es correcto").isEmail(),
    check('email').custom( emailExiste ),
    //check('role', "No es un role permitido...").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( esRoleValid ),
    validateFields    
], userPost );
router.delete('/:id', [    
    check('id', 'No es un ID válido').isMongoId(),
    check('id'). custom( existeUserId ),
    validateFields
],  userDelete );
router.patch('/', userPatch );

module.exports = router;



