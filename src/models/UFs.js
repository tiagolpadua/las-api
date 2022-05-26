const repositorio = require("../repositorios/URFs");
const funcoesValidacoes = require("../validacoes/validacoes");
const listaValidacoes = require("../validacoes/listaValidacoes");

class UFs {
  constructor() {
    this.valida = funcoesValidacoes.valida;

    this.validacoes = listaValidacoes;
  }

  async buscaUfs() {
    return repositorio.buscaUfs();
  }

  async buscaMunicipiosUf(UF) {
    const parametros = {
      isUFvalid: UF,
    };

    const erro = await this.valida(parametros);

    return erro.length
      ? Promise.reject(erro)
      : repositorio.buscaMunicipioPorUF(UF);
  }
}

module.exports = new UFs();
