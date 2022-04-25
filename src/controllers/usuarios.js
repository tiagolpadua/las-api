const Usuario = require("../models/usuarios");

module.exports = (app) => {
    app.get("/usuarios/:id", (req, res) => {
        const id = req.params.id;

        Usuario.buscarUsuario(id, res);
    });

    app.post("/usuarios", (req, res) => {
        const usuario = req.body;

        return res.json(usuario);
    });

    app.put("/usuarios/:id", (req, res) => {
        const usuario = req.body;

        return res.json(usuario);
    });

    app.get("/usuarios", (req, res) => {
        res.send("Lista de Usuarios");
    });

    app.delete("/usuarios/:id", (req, res) => {
        const usuario = req.params;

        return res.json(usuario);
    });
};