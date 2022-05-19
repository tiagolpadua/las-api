const repositorio = require("../repositorios/usuarios");
const funcoesValidacoes = require("../validacoes/validacoes");
const listaValidacoes = require("../validacoes/listaValidacoes");

class Endereco {
  constructor() {
    this.valida = funcoesValidacoes.valida;

    this.validacoes = listaValidacoes;
  }

  buscaEnderecoId(retornoForm) {
    return repositorio.buscaEnderecoId(retornoForm);
  }

  alterarEndereco(id, retornoForm) {
    return repositorio.alterarEndereco(id, retornoForm);
  }
}

module.exports = new Endereco();
