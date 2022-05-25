const usuariosMock = require("./usuariosMock.json");
const valida = require("../../models/validacoes.js");

class UsuariosRepositorio {
  listar() {
    return Promise.resolve(usuariosMock);
  }

  buscarPorNome(nome) {
    const encontrado = usuariosMock.find((usuario) => usuario.nome === nome);
    return Promise.resolve(encontrado ? [encontrado] : []);
  }

  buscarPorId(id) {
    return Promise.resolve([usuariosMock.find((usuario) => usuario.id === id)]);
  }

  buscarEndereco(id) {
    const usuario = usuariosMock.find((usuario) => usuario.id === id);
    return Promise.resolve([usuario.endereco]);
  }

  buscarDadosContatos(id) {
    const usuario = usuariosMock.find((usuario) => usuario.id === id);
    const campos = ["telefone", "celular", "email"];
    return Promise.resolve([valida.objCamposAceitos(usuario, campos)]);
  }

  buscarDadosPessoais(id) {
    const usuario = usuariosMock.find((usuario) => usuario.id === id);
    const campos = ["nomeCompleto", "dataNascimento", "rg", "cpf"];
    return Promise.resolve([valida.objCamposAceitos(usuario, campos)]);
  }

  adicionar(usuario) {
    return [{ ...usuario, id: 4 }];
  }

  alterar() {
    return Promise.resolve([]);
  }

  alterarContatos() {
    return Promise.resolve([]);
  }

  alterarSenha() {
    return Promise.resolve([]);
  }

  alterarDadosPessoais() {
    return Promise.resolve([]);
  }

  alterarEndereco() {
    return Promise.resolve([]);
  }

  excluir() {
    return Promise.resolve([]);
  }
}

module.exports = new UsuariosRepositorio();
