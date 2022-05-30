const usuariosMock = require("./mockUsuario.json");
const dadosPessoaisMock = require("./mockDadosPessoais.json");
const contatosMock = require("./mockContatos.json");
const enderecoMock = require("./mockEndereco.json");

class Usuario {
  listar() {
    return Promise.resolve(usuariosMock);
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
  buscaPorId(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }
  buscaPorNome(nome) {
    return Promise.resolve(
      usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }

  //dados-pessoais
  listaDadosPessoais(id) {
    return Promise.resolve(
      dadosPessoaisMock[id - 1] ? dadosPessoaisMock[id - 1] : []
    );
  }

  alterarDadosPessoais(id, valores) {
    return Promise.resolve(
      dadosPessoaisMock[id - 1] && valores ? dadosPessoaisMock : []
    );
  }

  //contatos
  listaContatos(id) {
    return Promise.resolve(contatosMock[id - 1] ? contatosMock[id - 1] : []);
  }

  alterarContatos(id, valores) {
    return Promise.resolve(contatosMock[id - 1] && valores ? contatosMock : []);
  }

  //endereco
  listaEndereco(id) {
    return Promise.resolve(enderecoMock[id - 1] ? enderecoMock[id - 1] : []);
  }

  alterarEndereco(id, valores) {
    return Promise.resolve(enderecoMock[id - 1] && valores ? enderecoMock : []);
  }
  //senha
  alterarSenha(id, senha) {
    return Promise.resolve(id && senha ? senha : []);
  }
}

module.exports = new Usuario();
