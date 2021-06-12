//Ayuda a mostrar las opciones es redundande
const { request, response } = require('express');

const User = require('../models/user');  //importamos el usuario de model 
const bcryptjs = require('bcryptjs'); // para encriptar contraseñas
const user = require('../models/user');
const { query } = require('express-validator');


const usersGet = async (req = request, res = response) => {

    //Destructuring
    //TODO: Traer todos los usuarios con .find() 
    const { limit = 5, desde= 0} = req.query;
    const query = { statu: true };

    /*const users = await User.find(query) //envio de parametros de usuario
        .skip( Number(desde))
        .limit( Number(limit) );  
    
    const total = await User.countDocuments(query);
    */
    
    const[ total, users] = await Promise.all([
        
        User.countDocuments(query),
        User.find(query)
            .skip( Number(desde) )
            .limit( Number(limit) )

    ])
    
    res.json({
       total, 
       users
    });
}

const usersPut = async (req, res = response) => {
    
    const { id } = req.params; //desestructurar
    const { _id, password, google, email, ...resto } = req.body;

    //TODO: validar contra base de datos
    if( password ) {
        //Verificar la contraseña encriptada
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );

    }
 
    const user = await User.findByIdAndUpdate( id, resto );

    res.json( user );
}


const userPutPassword = async (req, res = response ) => {

    const { id } = req.params;
    const { _id, google, name, ...rest } = req.body;

    if ( password ) {

        const saltPass = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, saltPass );
    }
 
    const userPassword = await User.findByIdAndUpdate ( id, rest );
  
    res.json({
        msj:'putPassword api - controller',
        userPassword
    });
}

 

const usersPost = async (req, res = response) => {
    
    //extraer elementos del body { name, edad, etc} ó todo body
    const {name, email, password, role } = req.body;
    const user = new User( { name, email, password, role } );

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); 
    user.password = bcryptjs.hashSync( password, salt); //para encriptar en una sola vía

    //Guardar en DB
    await user.save();

    res.json(user);
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;

    //Fisicamente borrado de DATABASE
    //const users = await user.findByIdAndDelete(id);

    //Desactivar el status del usuario
    const user = await User.findByIdAndUpdate( id, {statu: false} );

    res.json(user);
}

const usersPatch = (req, res = response) => {
    res.json({
        msj: 'patch api - controller'
    });
}



module.exports = {
    usersGet,
    usersPut,

    userPutPassword,

    usersPost,
    usersDelete,
    usersPatch
}