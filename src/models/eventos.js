const repositorio = require("../repositorios/evento");

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
  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }
}

module.exports = new Eventos();
