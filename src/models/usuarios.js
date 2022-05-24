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
      nomeUsuario: retornoForm?.nome?.length,
      url: retornoForm?.urlFotoPerfil,
      existeUsuario: retornoForm?.nome,
    };

    const erros = await this.valida(parametros);

    const existemErros = erros.length;

    if (existemErros) {
      return Promise.reject(erros);
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
      url: retornoForm.urlFotoPerfil,
      existeUsuarioPUT: { id, retornoForm: retornoForm.nome },
    };

    const erros = await this.valida(parametros);

    const existemErros = erros.length;

    if (existemErros) {
      return Promise.reject(erros);
    }

    return repositorio.alterarUsuario(id, retornoForm);
  }

  excluirUsuario(retornoId) {
    return repositorio.excluirUsuario(retornoId);
  }
}

module.exports = new Usuarios();
