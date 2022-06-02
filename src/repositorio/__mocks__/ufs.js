const ufsMockados = require("./dados_mockados/ufsMockados.json");
const municipiosBaMockados = require("./dados_mockados/municipiosBaMockados.json");

class Ufs {
  listar() {
    return Promise.resolve(ufsMockados);
  }

  buscarMunicipiosPorUf(uf) {
    return Promise.resolve(uf == "ba" ? municipiosBaMockados : []);
  }
}

module.exports = new Ufs();
