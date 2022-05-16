const repositorio = require("../repositorios/eventos");

class Eventos {
  listar() {
    return repositorio.listarEventos();
  }
  detalharEvento(id) {
    return repositorio.buscarEvento(id);
  }
  incluirEvento(evento) {
    return repositorio.incluir(evento);
  }
  alterarEvento(id, valores) {
    return repositorio.alterar(id, valores);
  }
  excluirEvento(id) {
    return repositorio.excluir(id);
  }
}

module.exports = new Eventos();
