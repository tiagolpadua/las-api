// const pool = require("../infraestrutura/database/conexao");
// const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuarios");
const funcoesValidacoes = require("../validacoes/validacoes");
const listaValidacoes = require("../validacoes/listaValidacoes");

class Usuarios {
  constructor() {
    this.valida = funcoesValidacoes.valida;

    this.validacoes = listaValidacoes;
  }

  listarUsuarios() {
    return repositorio.listarUsuarios();
  }

  async incluirUsuarios(retornoForm) {
    const parametros = {
      nomeUsuario: retornoForm.nome.length,
      url: retornoForm.urlFotoPerfil,
      existeUsuario: retornoForm.nome,
    };

    const erros = await this.valida(parametros);

    const existemErros = erros.length;

    if (existemErros) {
      return new Promise((resolve, reject) => reject(erros));
    }

    return repositorio.incluirUsuarios(retornoForm);
  }

  buscaUsuarioId(retornoForm) {
    return repositorio.buscaUsuarioId(retornoForm);
  }

  buscaUsuarioPeloNome(retornoUrl) {
    return repositorio.buscaUsuarioPeloNome(retornoUrl);
  }

  async alterarUsuario(id, retornoForm) {
    const parametros = {
      nomeUsuario: retornoForm.nome.length,
      // existeUsuario: retornoForm.nome,
      url: retornoForm.urlFotoPerfil,
      existeUsuarioPUT: { id, retornoForm: retornoForm.nome },
    };

    const erros = await this.valida(parametros);

    console.log(retornoForm);

    const existemErros = erros.length;

    console.log(existemErros);
    if (existemErros) {
      return new Promise((resolve, reject) => reject(erros));
    }

    return repositorio.alterarUsuario(id, retornoForm);
  }

  excluirUsuario(retornoForm) {
    return repositorio.excluirUsuario(retornoForm);
  }
}

module.exports = new Usuarios();
