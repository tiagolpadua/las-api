const Usuario = require("../models/usuarios");

module.exports = app => {
    app.get("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);
        Usuario.buscaPorId(id, res);
    });

    app.post("/usuarios", async (req, res) => {
        const usuario = req.body;
        await Usuario.adicionar(usuario, res);
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

    
    };
