const funcoesValidacoes = require("../validacoes/validacoes");
const listaValidacoes = require("../validacoes/listaValidacoes");
const fetch = require("node-fetch");

class UFs {
  constructor() {
    this.valida = funcoesValidacoes.valida;

    this.validacoes = listaValidacoes;
  }

  async buscaUfs() {
    const resultado = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );

    const resultadoJson = await resultado.json();

    return resultadoJson.map((uf) => uf.sigla);
  }

  async buscaMunicipiosUf(UF) {
    const resultado =
      await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios
`);

    const resultadoJson = await resultado.json();

    return resultadoJson.map((municipio) => municipio.nome);
  }
}

module.exports = new UFs();
