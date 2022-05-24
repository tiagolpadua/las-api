const USUARIOS_MOCK = require("../__mocks__/USUARIOS.json");
const DADOS_PESSOAIS_MOCK = require("../__mocks__/DADOS_PESSOAIS.json");
const CONTATOS_MOCK = require("../__mocks__/CONTATOS.json");
const SENHA_MOCK = require("../__mocks__/SENHA.json");
const ENDERECO_MOCK = require("../__mocks__/ENDERECO.json");

class Usuario {
  listarUsuarios() {
    return Promise.resolve(USUARIOS_MOCK);
  }

  buscaUsuarioId(retornoId) {
    return Promise.resolve(
      USUARIOS_MOCK.filter((usuario) => usuario.id === retornoId)
    );
  }

  validarNomeUsuarioNaoUtilizado(retornoForm) {
    const existeEvento = USUARIOS_MOCK.filter(
      (usuario) => usuario.nome === retornoForm
    );

    return Promise.resolve(existeEvento);
  }

  incluirUsuarios(retornoForm) {
    return Promise.resolve(retornoForm && { insertId: 5 });
  }

  buscaUsuarioPeloNome(retornoForm) {
    return Promise.resolve(
      USUARIOS_MOCK.filter((usuario) => usuario.nome.includes(retornoForm))
    );
  }

  validarNomeUsuarioNaoUtilizadoPUT(id, retornoForm) {
    const existeUsuario = USUARIOS_MOCK.filter(
      (usuario) => usuario.nome === retornoForm && usuario.id !== id
    );

    return Promise.resolve(existeUsuario);
  }

  alterarUsuario(id, retornoForm) {
    return Promise.resolve(id, retornoForm);
  }

  excluirUsuario(id) {
    return this.checkDataBaseInsertion(id, USUARIOS_MOCK);
  }

  //Dados Pessoais

  buscaDadosPessoaisId(retornoId) {
    if (retornoId) {
      return Promise.resolve(
        DADOS_PESSOAIS_MOCK.filter((dados) => dados.id === retornoId)
      );
    }

    return Promise.reject("Id inválido fornecido");
  }

  alterarDadosPessoais(id) {
    return this.checkDataBaseInsertion(id, DADOS_PESSOAIS_MOCK);
  }

  // //fim Dados Pessoais

  // // Contatos

  buscaContatosId(id) {
    if (id) {
      const resultado = CONTATOS_MOCK.filter((contatos) => contatos.id === id);

      return Promise.resolve(resultado);
    }

    return Promise.reject("Id inválido fornecido");
  }

  alterarContatos(id) {
    return this.checkDataBaseInsertion(id, CONTATOS_MOCK);
  }

  // // fim Contatos

  // // Senha

  alterarSenha(id) {
    return this.checkDataBaseInsertion(id, SENHA_MOCK);
  }

  // // fim Senha

  // // Endereco

  buscaEnderecoId(id) {
    if (id) {
      const resultado = ENDERECO_MOCK.filter((contatos) => contatos.id === id);

      return Promise.resolve(resultado);
    }

    return Promise.reject("Id inválido fornecido");
  }

  alterarEndereco(id) {
    return this.checkDataBaseInsertion(id, ENDERECO_MOCK);
  }

  // // fim Endereco

  checkDataBaseInsertion(identifier, list) {
    const affectedRows = { affectedRows: 0 };

    if (identifier) {
      list.find((item) => item.id === identifier)
        ? (affectedRows.affectedRows = 1)
        : affectedRows;
      return Promise.resolve(affectedRows);
    }

    return Promise.reject("ID inválido");
  }
}

module.exports = new Usuario();
