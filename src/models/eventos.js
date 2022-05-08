const repositorio = require("../repositorios/eventos");

class Eventos {
  listar() {
    return repositorio.listarEventos().then((resultados) => resultados);
  }

  buscarPorId(id) {
    return repositorio.buscarPorIdEvento(id).then((evento) => evento);
  }
}

module.exports = new Eventos();
