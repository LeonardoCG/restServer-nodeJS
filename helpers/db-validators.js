const Role = require('../models/role');
const User = require('../models/user');

 const isRoleValid = async (role = '') => {
    const existeRole = await Role.findOne({ role });
    if( !existeRole ) {
            throw new Error(`Rol ${ role } no esta registrado en la DB`);
    } 
}

const isEmailExists = async (email = '') => {
    
    // Verificar si el email exites
    const emailExists = await User.findOne({ email });
    if ( emailExists ) {
        throw new Error(`Correo ${ email }, existente`);
    }
}

const isEmailExistsPass = async (email = '') => {
    
    // Verificar si el email exites
    const emailExists = await User.findOne({ email });
    if ( !emailExists ) {
        throw new Error(`Correo No ${ email }, existente`);
    }
}

const isUserExistsId = async ( id ) => {

    //verificar si existe el ID de un usuario
    const existsUser = await User.findById(id);
    if( !existsUser ){
        throw new Error(`ID ${ id }, No existente`)
    }
}



module.exports = {
    isRoleValid,
    isEmailExists,
    isUserExistsId,
    isEmailExistsPass
}