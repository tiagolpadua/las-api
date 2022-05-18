const repositorio = require("../repositorios/endereco");
const funcoesValidacoes = require("../validacoes/validacoes");
const listaValidacoes = require("../validacoes/listaValidacoes");
const fetch = require("node-fetch");

class Endereco {
  constructor() {
    this.valida = funcoesValidacoes.valida;

    this.validacoes = listaValidacoes;
  }

  buscaEnderecoId(retornoForm) {
    return repositorio.buscaEnderecoId(retornoForm);
  }

  async buscaUfs() {
    try {
      const resultado = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );

      const resultadoJson = await resultado.json();

      return resultadoJson.map((uf) => uf.sigla);
    } catch (error) {
      throw new Error(error);
    }
  }

  async buscaMunicipiosUf(UF) {
    try {
      const resultado =
        await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios
`);

      const resultadoJson = await resultado.json();

      return resultadoJson.map((uf) => uf.nome);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new Endereco();
