const repositorio = require("../repositorios/uf");

class Ufs {
  listar() {
    return repositorio.listar();
  }

  async buscarMunicipiosPorUf(uf) {
    return repositorio.buscarMunicipiosPorUf(uf);
  }
}

module.exports = new Ufs();
