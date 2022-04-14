const Usuario = require("../models/usuarios");

module.exports = (app) => {
    app.get("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);
        Usuario.buscaPorId(id, res);
    });

    app.post("/usuarios", (req, res) => {
        const usuario = req.body;
        Usuario.add(usuario, res);
    });

    app.get("/usuarios/nome/:nome", (req, res) => {
        const nome = req.params.nome;
        Usuario.buscaPorNome(nome, res);
    });
};