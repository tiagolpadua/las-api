const repositorio = require("../repositorios/UF");

class UFs {
  listar() {
    return repositorio.listar();
  }

  listarMunicipios(uf) {
    return repositorio.listarMunicipios(uf);
  }
}
module.exports = new UFs();
