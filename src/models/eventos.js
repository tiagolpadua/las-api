const repositorio = require("../repositorios/evento");

class Eventos {
  listar() {
    return repositorio.listar();
  }

  buscaPorId(id) {
    return repositorio.buscaPorId(id);
  }
}

module.exports = new Eventos();
