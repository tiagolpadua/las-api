const eventosMock = require("./eventos.json");

class Eventos {
  listarEventos() {
    return Promise.resolve(eventosMock);
  }
  detalharEvento(id) {
    return Promise.resolve(eventosMock.find((evento) => evento.id == id));
  }
  incluirEvento(evento) {
    return Promise.resolve(evento && { insertId: 23 });
  }
  alterarEvento(id, valores) {
    return id && valores && eventosMock[id - 1]
      ? Promise.resolve()
      : Promise.reject();
  }
  excluirEvento(id) {
    return eventosMock[id - 1] ? Promise.resolve() : Promise.reject();
  }
  listarEventosAgendados() {
    return Promise.resolve(
      eventosMock.filter((evento) => evento.status === "agendado")
    );
  }

  listarEventosEmAndamento() {
    return Promise.resolve(
      eventosMock.filter((evento) => evento.status === "em-andamento")
    );
  }

  listarEventosFinalizados() {
    return Promise.resolve(
      eventosMock.filter((evento) => evento.status === "finalizado")
    );
  }
}

module.exports = new Eventos();
