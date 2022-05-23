// const query = require("../infraestrutura/database/queries");

const URFs = require("../__mocks__/URF.json");
const MUNICIPIOS = require("../__mocks__/municipios.json");

class URF {
  buscaUfs() {
    return Promise.resolve(URFs);
  }

  buscaMunicipioPorUF(UF) {
    const municipios = MUNICIPIOS.filter((item) => item["UF-sigla"] === UF).map(
      (nomeMunicipio) => nomeMunicipio["nome"]
    );

    return Promise.resolve(municipios);
  }
}

module.exports = new URF();
