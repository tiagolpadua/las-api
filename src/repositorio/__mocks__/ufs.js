const ufsMockados = require("./dados_mockados/ufsMockados.json");
const municipiosBaMockados = require("./dados_mockados/municipiosBaMockados.json");

class Ufs {
  listar() {
    return Promise.resolve(ufsMockados);
  }

  buscarMunicipiosPorUf(uf) {
    return uf == "ba"
      ? Promise.resolve(municipiosBaMockados)
      : Promise.reject();
  }
}

module.exports = new Ufs();
