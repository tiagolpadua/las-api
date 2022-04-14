const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios/:id", (req, res) => res.send('Buscando usuário'))
  
  app.post("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Usuarios.buscaUsuario(id, res);
  });
};

