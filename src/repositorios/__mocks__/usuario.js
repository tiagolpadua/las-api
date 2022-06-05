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

  alterar(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  excluir(id) {
    return Promise.resolve(usuariosMock.pop((usuario) => usuario.id === id));
  }

  buscarPorNome(nome) {
    return Promise.resolve(
      usuariosMock.find((usuario) => usuario.nome.includes(nome))
    );
  }

  buscarDadosPessoaisDoUsuario(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  atualizarDadosPessoaisDoUsuario(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  buscarContatosDoUsuario(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  atualizarContatosDoUsuario(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  atualizarSenhaDoUsuario(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  buscarEnderecoDoUsuario(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  atualizarEnderecoDoUsuario(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }
}

module.exports = new Usuario();
