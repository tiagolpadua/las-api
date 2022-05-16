const repositorio = require("../repositorios/eventos");

class Eventos {
  listar() {
    return repositorio.listarEventos();
  }
  detalharEvento(id) {
    return repositorio.buscarEvento(id);
  }
}

module.exports = new Eventos();
