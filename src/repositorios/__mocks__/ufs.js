const ufsMockados = require("./dados_mockados/ufs.json");
const municipiosMockados = require("./dados_mockados/municipios.json");

class Ufs {
  listar() {
    return Promise.resolve(ufsMockados);
  }

  buscarMunicipiosPorUf(uf) {
    return Promise.resolve(
        municipiosMockados
        .filter((municipio) => municipio.UF === uf)
        .map((nomeMunicipio) => nomeMunicipio.nome)
    );
  }
}

module.exports = new Ufs();
