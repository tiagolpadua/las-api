const ufMock = require("./ufs.json");
const municipioMock = require("./municipios.json");

class UF {
  listar() {
    return Promise.resolve(ufMock);
  }

  buscarPorMunicipio(uf) {
    return Promise.resolve(
      municipioMock
        .filter((municipio) => municipio.UF === uf)
        .map((nomeMunicipio) => nomeMunicipio.nome)
    );
  }
}
module.exports = new UF();
