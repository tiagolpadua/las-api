const Usuario = require("../models/usuarios");

module.exports = (app) => {
    app.get("/usuarios", (res) => {
        Usuario.listar(res);
    });

    app.get("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);
        Usuario.buscaPorId(id, res);
    });

    app.get("/usuarios/nome/:nome", (req, res) => {
        const nome = req.params.nome;
        Usuario.buscaPorNome(nome, res);
    });

    app.post("/usuarios", (req, res) => {
        const usuario = req.body;
        Usuario.add(usuario, res);
    });

    app.put("/usuarios/:id", (req, res) => {
        const id = req.id;
        const valores = req.body;
        Usuario.alterarUsuario(id, valores, res);
    });

    app.delete("/usuarios/:id", (req, res) => {
        const id = req.id;
        Usuario.excluirUsuario(id, res);
    });
};