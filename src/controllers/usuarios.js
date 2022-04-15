//controlar rotas
const Usuarios = require("../models/usuarios");

module.exports = app => {     

        app.get("/usuarios", (req, res) =>{
        Usuarios.lista(res);
        });
        app.get("/usuarios/:id", (req, res) =>{
            const id = parseInt(req.params.id);
            Usuarios.buscaPorId(id, res);
        });
        app.delete("/usuarios/:id", (req,res) =>{
            const id = parseInt(req.params.id);
            Usuarios.deleta(id, res);
        });
        app.post("/usuarios", (req, res) =>{
            const usuario = req.body;
            Usuarios.adiciona(usuario, res);

        });
        app.patch("/usuarios/:id", (req, res) => {
            const id = parseInt(req.params.id);
                    
            Usuarios.altera(id, res);
        });
};