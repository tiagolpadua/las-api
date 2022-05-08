const repositorio = require("../repositorios/eventos");

class Eventos {
  listar() {
    return repositorio.listarEventos().then((resultados) => resultados);
  }

  buscarPorId(id) {
    return repositorio.buscarPorIdEvento(id).then((evento) => evento);
  }

  incluir(evento) {
    return repositorio.incluirEvento(evento).then((evento) => evento);
  }

  alterar(id, valores) {
    return repositorio.alterarEvento(id, valores).then((evento) => evento);
  }

  excluir(id) {
    return repositorio.excluirEvento(id);
  }
}

module.exports = new Eventos();
