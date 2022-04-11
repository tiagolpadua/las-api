const express = require ('express');

const Usuario = require ('../models/usuario.js');

const router = express.Router();

router.get('/usuario:id', async(req, res) => {
    const {usuario} = await Usuario.create(req.body);
    return res.send({usuario});
  });

router.post('/usuario', async(req, res) => {
// continua

});