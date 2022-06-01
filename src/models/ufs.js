const repositorio = require("../repositorios/ufs");

class UFs {
  listar() {
    return repositorio.listar();
  }

  listarMunicipio() {
    return repositorio.listarMunicipio();
  }
}
module.exports = new UFs();