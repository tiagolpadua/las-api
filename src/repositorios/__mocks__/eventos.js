// const moment = require("moment");
const eventosMock = require("./eventos.json");

class Evento {
  listarEventos() {
    return Promise.resolve(eventosMock);
  }

  buscarPorIdEvento(id) {
    return Promise.resolve(eventosMock.find((evento) => evento.id === id));
  }

  incluirEvento(evento) {
    return Promise.resolve(evento && { insertId: 99 });
  }

  alterarEvento(id, valores) {
    if (!!id && !!valores) {
      return Promise.resolve({ changedRows: 1 });
    }
  }

  excluirEvento(id) {
    return Promise.resolve(id);
  }
}

module.exports = new Evento();
