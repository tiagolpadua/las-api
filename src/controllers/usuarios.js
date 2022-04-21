const Usuario = require("../models/usuarios");

module.exports = app => {
    app.get("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);
        Usuario.buscaPorId(id, res);
    });

    app.post("/usuarios", (req, res) => {
        const usuario = req.body;
       Usuario.adicionar(usuario, res);
     });

     app.put("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const usuarioAlterado = req.body;
        Usuario.atualiza(id, usuarioAlterado, res);
      });

      app.get("/usuarios", (req,res) => {
        Usuario.listar(res);
    }); 
      
      app.delete("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);
        Usuario.deleta(id, res);
      });

      app.get("/usuarios/nome/:nome", (req,res) => {
        const nome = req.params.nome;
        Usuario.buscaPorNome(nome, res);
    });   
    };
