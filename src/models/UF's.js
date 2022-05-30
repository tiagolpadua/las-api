const repositorio = require("../repositorios/UF's");

class UFs {
  listar() {
    return repositorio.listar();
  }
  buscaCidade(cidade) {
    return repositorio.buscaCidade(cidade);
  }
  buscaSigla(sigla) {
    return repositorio.buscaSigla(sigla);
  }
  // inserirr(lista){
  //   lista.forEach(element => {
  //     return repositorio
  //   });
  // }
}

module.exports = new UFs();
