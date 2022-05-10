// const pool = require("../infraestrutura/database/conexao");
// const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuarios");
const funcoesValidacoes = require("../validacoes/validacoes");
const listaValidacoes = require("../validacoes/listaValidacoes");

class Usuarios {
  constructor() {
    this.validaSeNomeFoiUtilizado = async (retornoForm) => {
      const existeUsuario = await repositorio.validarNomeUsuarioNaoUtilizado(
        retornoForm
      );

      if (existeUsuario[0]?.nome === retornoForm.trim()) return !true;

      return !false;
    };

    this.validarNomeUsuarioNaoUtilizadoPUT = async ({ id, retornoForm }) => {
      const existeUsuarioPUT =
        await repositorio.validarNomeUsuarioNaoUtilizadoPUT(id, retornoForm);

      if (existeUsuarioPUT[0]?.nome === retornoForm.trim()) return !true;

      return !false;
    };

    this.validarURLFotoPerfil = funcoesValidacoes.validarURLFotoPerfil;

    this.verificaTamanhoNome = funcoesValidacoes.verificaTamanhoNome;

    this.valida = funcoesValidacoes.valida;

    this.validacoes = [
      {
        nome: "existeUsuario",
        valido: this.validaSeNomeFoiUtilizado,
        mensagem: "usuário já existe na base de dados",
      },
      {
        nome: "existeUsuarioPUT",
        valido: this.validarNomeUsuarioNaoUtilizadoPUT,
        mensagem: "Usuario já existe na base de dados",
      },

      ...listaValidacoes,
    ];
  }

  listarUsuarios() {
    return repositorio.listarUsuarios().then((resultado) => resultado);
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

    return repositorio.incluirUsuarios(retornoForm).then((results) => {
      return { id: results.insertId, ...retornoForm };
    });
  }

  buscaUsuarioId(retornoForm) {
    return repositorio
      .buscaUsuarioId(retornoForm)
      .then((resultado) => resultado);
  }

  buscaUsuarioPeloNome(retornoUrl) {
    return repositorio.buscaUsuarioPeloNome(retornoUrl).then((resultado) => {
      return resultado;
    });
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

    return repositorio
      .alterarUsuario(id, retornoForm)
      .then((resultado) => resultado);
  }

  excluirUsuario(retornoForm) {
    return repositorio.excluirUsuario(retornoForm);
  }
}

module.exports = new Usuarios();
