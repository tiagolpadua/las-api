//controlar rotas
const Usuarios = require("../models/usuarios");

module.exports = app =>{
      /*app.get("usuarios/:id", (req, res) => {
          const id = parseInt(req.params.id);

        Usuario.buscarPorId(id, res);
    }); // ENDPOINT BUSCANDO O USUARIO

        app.post("/usuarios", (req, res) => {
        const usuario = req.body;

        Usuario.criacaoDeUsuario(usuario, res);
    }); //ENDPOINT ADICIONANDO UM USUARIO*/

    app.get("/usuarios", (req, res) =>{
        Usuarios.listaDeUsuarios(res);
    }); //ENDPOINT LISTA DE USUARIOS


};