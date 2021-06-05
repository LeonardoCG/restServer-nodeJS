//Ayuda a mostrar las opciones es redundande
const { request, response } = require('express');

const usersGet = (req = request, res = response) => {

    //destructuring
    const { q, name, edad, page = '1', limit, apikey } = req.query;

    res.json({
        msj: 'get API - controller',
        q,
        name,
        edad,
        page,
        limit,
        apikey
    });
}

const usersPut = (req, res = response) => {
    
    const { id } = req.params //desestructurar

    res.json({
        msj:'put api - controller',
        id
    });
}

const usersPost = (req, res = response) => {
    
    //extraer elementos del body { name, edad, etc} ó todo body
    const {name, edad } = req.body;

    res.json({
        msj: 'post api - controller',
        name,
        edad
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msj: 'delete api - controller'
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msj: 'patch api - controller'
    });
}



module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}