const usuariosMock = require("../../../dados-mock/usuarios.json");
const dadosPessoaisMock = require("../../../dados-mock/dados-pessoais.json");
const contatosMock = require("../../../dados-mock/contatos.json");
const enderecoMock = require("../../../dados-mock/endereco.json");

class Usuario {
  listar() {
    return Promise.resolve(usuariosMock);
  }

  alterar(id) {
    return Promise.resolve(usuariosMock[0] && { ...id });
  }

  adicionar(usuario) {
    return Promise.resolve(usuario && { insertId: 99 });
  }

  excluir(id) {
    //contatosMock[id - 1] ? contatosMock[id - 1] : []
    // return Promise.resolve(usuariosMock[id - 1] ? usuariosMock[id - 1].id : []);
    //return repositorio.excluir(id);
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id == id));
  }

  buscarPorNome(nome) {
    return Promise.resolve(
      usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }

  buscarPorId(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }

  async isNomeUsuarioUtilizado(nome) {
    return Promise.resolve(
      !!usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }

  //API DADOS PESSOAIS

  obterDadosPessoais(id) {
    return Promise.resolve(
      dadosPessoaisMock[id - 1] ? dadosPessoaisMock[id - 1] : []
    );
  }

  // eslint-disable-next-line no-unused-vars
  atualizarDadosPessoais(id, dadosPessoaisAlterado) {
    return Promise.resolve(dadosPessoaisMock[id - 1] && { ...id });
  }

  //API DE CONTATOS

  buscarContatos(id) {
    return Promise.resolve(contatosMock[id - 1] ? contatosMock[id - 1] : []);
  }

  // eslint-disable-next-line no-unused-vars
  alterarContatos(id, dadosPessoaisAlterado) {
    return Promise.resolve(contatosMock[id - 1] && { ...id });
  }

  //API DE SENHAS

  alterarSenha(id, senhaAlterada) {
    return Promise.resolve(senhaAlterada ? id : []);
  }

  //API DE ENDEREÇOS

  buscarEndereco(id) {
    return Promise.resolve(enderecoMock[id - 1] ? enderecoMock[id - 1] : []);
  }

  // eslint-disable-next-line no-unused-vars
  alterarEndereco(id, enderecoAlterado) {
    return Promise.resolve(enderecoMock[id - 1] && { ...id });
  }
}

module.exports = new Usuario();
