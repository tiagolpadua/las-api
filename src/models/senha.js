const repositorio = require("../repositorios/usuarios");
const funcoesValidacoes = require("../validacoes/validacoes");
const listaValidacoes = require("../validacoes/listaValidacoes");

class Senha {
  constructor() {
    this.valida = funcoesValidacoes.valida;

    this.validacoes = listaValidacoes;
  }

  async alterarSenha(id, retornoForm) {
    return repositorio.alterarSenha(id, retornoForm);
  }
}

module.exports = new Senha();
