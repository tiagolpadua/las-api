const repositorio = require("../repositorios/URFs");

class UFs {
  async buscaUfs() {
    return repositorio.buscaUfs();
  }

  async buscaMunicipiosUf(UF) {
    return repositorio.buscaMunicipioPorUF(UF);
  }
}

module.exports = new UFs();
