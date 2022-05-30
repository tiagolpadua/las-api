
const usuariosMock = require("./usuariosMock");

class UsuarioRepositorio {
  listar() {
    return Promise.resolve(usuariosMock);
  }
}

module.exports = new UsuarioRepositorio();
