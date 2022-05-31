const repositorio = require("../repositorios/endereco");

class Endereco {
  listarUFs() {
    return repositorio.listarUFs();
  }

  listarMunicipios(uf) {
    return repositorio.listarMunicipios(uf);
  }
}

module.exports = new Endereco();
