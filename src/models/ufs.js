const repositorio = require("../repositorios/ufs");

class UFs {
  listar(){
    return repositorio.listar();
  }

  listarMunicipiosPorUf(uf){
    return repositorio.listarMunicipiosPorUf(uf);
  }
}

module.exports = new UFs();