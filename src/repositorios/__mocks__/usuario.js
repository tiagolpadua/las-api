const usuariosMock = require("./usuariosMock.json");

class UsuarioRepositorio {
  listar() {
    return Promise.resolve(usuariosMock);
  }
  buscarPorId(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }
  adicionar(usuario) {
    return Promise.resolve(usuario && { id: 99 });
  }
  async isNomeUsuarioUtilizado(nome) {
    return Promise.resolve(
      !!usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }
}

module.exports = new UsuarioRepositorio();
