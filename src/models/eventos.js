const repositorio = require("../repositorios/evento");
// const moment = require("moment");

class Eventos {
  listar() {
    return repositorio.listar();
  }

  buscaPorId(id) {
    return repositorio.buscaPorId(id);
  }

  adicionar(evento) {
      return repositorio.adicionar(evento);
  }

  alterar(valores, id) {
    return repositorio.alterar(valores, id);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }



}
module.exports = new Eventos();
