const { response } = require('express');

const userGet = (req, res = response) => {
    const { q, nombre = 'NA', apiKey } = req.query;
    res.json({
        ok: true,
        msg: 'Success get api - controller',
        q,
        nombre, 
        apiKey 
    });
}

const userPut = (req, res = controller) => {
    const id = req.params.id;

    res.json({        
        ok: true,
        msg: 'Success put api - controller',
        id
    });
}

const userPost = (req, res = response) => {
    const { nombre, edad} = req.body;

    res.json({
        ok: true,
        msg: 'Success post api - controller',
        nombre,
        edad
    });
}

const userDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Success delete api - controller'
    });
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