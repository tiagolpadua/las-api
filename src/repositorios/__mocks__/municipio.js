const municipiosMock = require("../../../dados-mock/municipios.json");

class Municipio {
  buscarMunicipio(uf) {
    return Promise.resolve(
      municipiosMock.find((nomeMunicipio) => nomeMunicipio.nome === uf)
    );
  }
}

module.exports = new Municipio();
