const ufsMock = require("../__mocks__/dados-mockados/ufs.json");
const municipiosMock = require("./dados-mockados/municipios.json");

class Ufs {
  listar() {
    return Promise.resolve(ufsMock);
  }

  buscarMunicipiosPorUf(uf) {
    return Promise.resolve(
      municipiosMock
        .filter((municipio) => municipio.UF === uf)
        .map((nomeMunicipio) => nomeMunicipio.nome)
    );
  }
}

module.exports = new Ufs();
