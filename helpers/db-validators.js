const Role  = require('../model/role');
const User = require('../model/user');

const esRoleValid = async( role = '' ) => {
    const existeRole = await Role.findOne({ role: role});
    if( !existeRole ){
        throw new Error(`El rol ${ role } no está registrado en BD`);
    }
}

const emailExiste = async( email = '' ) => {
    const existe = await User.findOne({ email });
    if( existe ){
        throw new Error("El correo ya existe...");
    }
}

const existeUserId = async( id = '' ) => {
    const existe = await User.findById( id );
    if( !existe ){
        throw new Error(`El id no existe ${ id }`);
    }
}


module.exports = {
    esRoleValid,
    emailExiste,
    existeUserId
}