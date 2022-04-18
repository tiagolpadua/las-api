const Usuario = require("../models/usuarios");

module.exports = app => {
    app.get("/usuarios", (req,res) => res.send("Rota GET..."));

    app.post("/usuarios", (req, res) => {
        console.log("Usuario enviado");
        const usuario = req.body;
    //res.send("post Usuario");
        Usuario.adiciona(usuario, res);
     });
    };
