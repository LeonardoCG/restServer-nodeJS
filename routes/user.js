const { Router } = require('express');
const { check } = require('express-validator');

const { validatorCampus} = require('../middlewares/validator-campus');
const { isRoleValid, isEmailExists, isUserExistsId, isEmailExistsPass } = require('../helpers/db-validators');

const { usersGet, 
        usersPut,
        userPutPassword, 
        usersPost, 
        usersDelete, 
        usersPatch } = require('../controllers/users.controller');

        
 
const router = Router();


 
router.get('/', usersGet );

router.put('/:id',[
        check('id', 'No es un ID válido').isMongoId(), // ayudar a validad id en validator de express
        check('id').custom( isUserExistsId ),
        //check('role').custom( isRoleValid ), 
        validatorCampus           
], usersPut ); //ruta especifica de express para buscar un id
 
router.put('/password/:id',[
        check('id', 'No es un ID válido').isMongoId(), // ayudar a validad id en validator de express
        check('id').custom( isUserExistsId ),
        check('email', 'Correo no válido').isEmail(),
        check('email').custom( isEmailExistsPass ), 
        check('role').custom( isRoleValid ), 
        validatorCampus           
], userPutPassword ); //ruta especifica de express para buscar un id

router.post('/', [
        check('name', 'Nombre obligatorio').not().isEmpty(),
        check('password', 'Password minimo 8 carácteres').isLength({ min: 8 }),
        check('email', 'Correo no válido').isEmail(),
        check('email').custom( isEmailExists ),  
        //check('role', 'Role no válido').isIn(['ADMIN_ROLA','USER_ROLE']),
        check('role').custom( isRoleValid ),  
        validatorCampus
], usersPost );
  
router.delete('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( isUserExistsId),
        validatorCampus
],usersDelete );

router.patch('/', usersPatch );
 






module.exports = router;