const usuariosMock = require("../__mocks__/dados-mockados/usuarios.json");

class Usuario {
  listar() {
    return Promise.resolve(usuariosMock);
  }

  buscarPorId(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  adicionar(usuario) {
    return Promise.resolve(usuario && { insertId: 99 });
  }

  isNomeUsuarioUtilizado(nome) {
    return Promise.resolve(
      !!usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }
}

module.exports = new Usuario();
