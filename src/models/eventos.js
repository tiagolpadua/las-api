const repositorio = require("../repositorios/evento");
const moment = require("moment");

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

  listarPorStatus(status) {
    return repositorio.listarPorStatus(status);
  }

  isDatasValidas(evento) {
    const now = moment();
    const inicio = moment(evento.dataInicio);
    const fim = moment(evento.dataFim);

    let eventoValido = false;

    if (moment(inicio).isSameOrAfter(now)){
      if (moment(fim).isAfter(inicio)){
        eventoValido = true;
      }
    }
    return eventoValido;
  }
}
module.exports = new Eventos();
