// const query = require("../infraestrutura/database/queries");

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
    if (id) {
      const affectedRows = { affectedRows: 0 };
      USUARIOS_MOCK.find((usuario) => usuario.id === id)
        ? (affectedRows.affectedRows = 1)
        : (affectedRows.affectedRows = 0);
      return Promise.resolve(id && affectedRows);
    }

    return Promise.reject("ID inválido");
  }

  //Dados Pessoais

  buscaDadosPessoaisId(retornoId) {
    if (retornoId) {
      const existeUsuario = DADOS_PESSOAIS_MOCK.filter(
        (dados) => dados.id === retornoId
      );

      return Promise.resolve(existeUsuario);
    }

    return Promise.reject("Id inválido fornecido");
  }

  alterarDadosPessoais(id) {
    if (id) {
      const affectedRows = { affectedRows: 0 };
      DADOS_PESSOAIS_MOCK.find((dadosPessoais) => dadosPessoais.id === id)
        ? (affectedRows.affectedRows = 1)
        : (affectedRows.affectedRows = 0);
      return Promise.resolve(id && affectedRows);
    }
  }

  // //fim Dados Pessoais

  // // Contatos

  buscaContatosId(id) {
    if (id) {
      const resultado = CONTATOS_MOCK.filter((contatos) => contatos.id === id);

      return Promise.resolve(id && resultado);
    }

    return Promise.reject("Id inválido fornecido");
  }

  alterarContatos(id) {
    if (id) {
      const affectedRows = { affectedRows: 0 };
      CONTATOS_MOCK.find((dadosPessoais) => dadosPessoais.id === id)
        ? (affectedRows.affectedRows = 1)
        : (affectedRows.affectedRows = 0);
      return Promise.resolve(id && affectedRows);
    }

    return Promise.reject("Id inválido fornecido");
  }

  // // fim Contatos

  // // Senha

  alterarSenha(id) {
    if (id) {
      const affectedRows = { affectedRows: 0 };
      SENHA_MOCK.find((dadosPessoais) => dadosPessoais.id === id)
        ? (affectedRows.affectedRows = 1)
        : (affectedRows.affectedRows = 0);
      return Promise.resolve(id && affectedRows);
    }

    return Promise.reject("Id inválido fornecido");
  }

  // // fim Senha

  // // Endereco

  buscaEnderecoId(id) {
    if (id) {
      const resultado = ENDERECO_MOCK.filter((contatos) => contatos.id === id);

      return Promise.resolve(id && resultado);
    }

    return Promise.reject("Id inválido fornecido");
  }

  alterarEndereco(id) {
    if (id) {
      const affectedRows = { affectedRows: 0 };
      ENDERECO_MOCK.find((contato) => contato.id === id)
        ? (affectedRows.affectedRows = 1)
        : (affectedRows.affectedRows = 0);
      return Promise.resolve(id && affectedRows);
    }

    return Promise.reject("Id inválido fornecido");
  }

  // // fim Endereco
}

module.exports = new Usuario();
