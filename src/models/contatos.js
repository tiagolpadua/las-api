const repositorio = require("../repositorios/usuarios");
const funcoesValidacoes = require("../validacoes/validacoes");
const listaValidacoes = require("../validacoes/listaValidacoes");

class Contato {
  constructor() {
    this.valida = funcoesValidacoes.valida;

    this.validacoes = listaValidacoes;
  }

  buscaContatosId(retornoForm) {
    return repositorio.buscaContatosId(retornoForm);
  }

  async alterarContatos(id, retornoForm) {
    return repositorio.alterarContatos(id, retornoForm);
  }
}

module.exports = new Contato();
