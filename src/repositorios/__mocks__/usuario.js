//const query = require("../infraestrutura/database/queries");

const usuariosMock = require("./usuario.json");
const dadosUsuariosMock = require("./dados.usuario.json");
const contatosUsuariosMock = require("./contatos.usuario.json");
const enderecoUsuariosMock = require("./endereco.usuario.json");
const senhaUsuariosMock = require("./endereco.usuario.json");

class Usuario {
  listar() {
    return Promise.resolve(usuariosMock);
  }
  buscarPorId(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }
  isNomeUsuarioUtilizado(nome) {
    return Promise.resolve(
      !!usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }
  adicionarUsuario(usuario) {
    return Promise.resolve(usuario && { insert: 99 });
  }
  alterarId(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }
  deletarPorId(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }
  buscarPorNome(nome) {
    return Promise.resolve(
      usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }
  obterDadosPessoais(id) {
    return Promise.resolve(
      dadosUsuariosMock.find((usuario) => usuario.id === id)
    );
  }
  atualizarDadosPessoais(id) {
    return Promise.resolve(
      dadosUsuariosMock.find((usuario) => usuario.id === id)
    );
  }
  obterContatos(id) {
    return Promise.resolve(
      contatosUsuariosMock.find((usuario) => usuario.id === id)
    );
  }
  atualizarContatos(id) {
    return Promise.resolve(
      contatosUsuariosMock.find((usuario) => usuario.id === id)
    );
  }
  obterEndereco(id) {
    return Promise.resolve(
      enderecoUsuariosMock.find((usuario) => usuario.id === id)
    );
  }
  atualizarEndereco(id) {
    return Promise.resolve(
      enderecoUsuariosMock.find((usuario) => usuario.id === id)
    );
  }
  atualizarSenha(id) {
    return Promise.resolve(
      senhaUsuariosMock.find((usuario) => usuario.id === id)
    );
  }
}
module.exports = new Usuario();
