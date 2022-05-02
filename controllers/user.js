const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../model/user');

const userGet = async (req, res = response) => {
    const query = { state: true };
    const { limite = 5, desde = 0 } = req.query;
    
    const [ total, usuarios ] = await Promise.all( [
        User.countDocuments( query ),
        User.find( query )
            .skip ( Number( desde ) )
            .limit( Number( limite ) )
    ] );


    res.json( { total, usuarios });
    
}

const userPut = async (req, res = controller) => {
    const id = req.params.id;
    const { _id, password, google, ...update } = req.body;

    // Validar id contra BD

    if( password ){
        // Actualizar password
        const salt = bcryptjs.genSaltSync();
        update.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await User.findByIdAndUpdate( id, update,{new: true} );
    //const usuario = await User.findById( id );
    res.json({        
        usuario
    });
}

const userPost = async (req, res = response) => {
    const { username, password, email, role } = req.body;
    const usuario = new User({ username, password, email, role });
    
    // Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    });
}

const userDelete = async (req, res = response) => {
    const { id } = req.params;

    // Borrar fisicamente
    //const usuario = await User.findByIdAndDelete( id );

    // Baja logicalos
    const usuario = await User.findByIdAndUpdate(id, { state: false} );

    res.json( usuario );
}

const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Success patch api - controller'
    });
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}