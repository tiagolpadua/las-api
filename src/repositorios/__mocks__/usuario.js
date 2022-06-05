// const query = require("../infraestrutura/database/queries");

const usuariosMock = require("./usuarios.json");
const dadosPessoaisMock = require("./dadosPessoais.json");
const contatosMock = require("./contatos.json");
const enderecoMock = require("./endereco.json");

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
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id == id));
  }
  excluir(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id == id));
  }
  buscarPorNome(nome) {
    return Promise.resolve(
      usuariosMock.find((usuario) => usuario.nome == nome)
    );
  }
  // ///Atualização e consulta de dados pessoais

  consultarDadosPessoais(id) {
    return Promise.resolve(dadosPessoaisMock.find((dados) => dados.id == id));
  }
  atualizarDadosPessoais(id) {
    return Promise.resolve(dadosPessoaisMock.find((dados) => dados.id == id));
  }

  // //Atualização e consulta de contatos

  consultaContatos(id) {
    return Promise.resolve(
      contatosMock.find((usuarioContatos) => usuarioContatos.id == id)
    );
  }
  atualizarContatos(id) {
    return Promise.resolve(
      contatosMock.find((usuarioContatos) => usuarioContatos.id == id)
    );
  }

  // //Inclusão e consulta de endereço

  consultarEndereco(id) {
    return Promise.resolve(
      enderecoMock.find((enderecos) => enderecos.id == id)
    );
  }
  alterarEndereco(id) {
    return Promise.resolve((endereco) => endereco.id == id);
  }
}
module.exports = new Usuario();
