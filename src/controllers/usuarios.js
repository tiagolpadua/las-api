const Usuario = require("../controllers/usuarios");

module.exports = app => {
    app.get("/usuarios", (req, res) => {
        Usuario.lista(res);
    });

    app.get("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);

        Usuario.buscarId(id, res);
    });

    app.post("/usuarios", (req, res) => {
        const criaUsuario = req.body;

        Usuario.adiciona(criaUsuario, res);
    });

    app.delete("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);

        Usuario.deleta(id, res);
    });
    
    app.patch("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body.valores;

        Usuario.altera(id, valores, res);
    });
};

