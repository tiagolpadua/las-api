const repositorio = require("../repositorios/ufs");

class Ufs {
  listar() {
    return repositorio.listar();
  }
  buscarMunicipio(uf) {
    return repositorio.buscarMunicipio(uf);
  }
}

module.exports = new Ufs();
