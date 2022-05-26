const repositorio = require("../repositorios/UF's");

class UFs {
  listar() {
    return repositorio.listar();
  }
  buscaCidade(cidade) {
    return repositorio.buscaCidade(cidade);
  }
  buscaEstado(estado) {
    return repositorio.buscaEstado(estado);
  }
}

module.exports = new UFs();
