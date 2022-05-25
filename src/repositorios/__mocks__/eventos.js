const eventosMock = require("./eventosMock.json");

class EventosRepositorio {
  listar() {
    return Promise.resolve(eventosMock);
  }

  buscarPorId(id) {
    return Promise.resolve([eventosMock.find((evento) => evento.id === id)]);
  }

  adicionar(evento) {
    return Promise.resolve([{ ...evento, id: 19 }]);
  }

  buscarStatus(status) {
    let evento;
    switch (status) {
      case "agendado":
        evento = eventosMock[0];
        break;
      case "em-andamento":
        evento = eventosMock[1];
        break;
      case "finalizado":
        evento = eventosMock[2];
        break;
    }
    return Promise.resolve([evento]);
  }

  alterar() {
    return Promise.resolve([]);
  }

  excluir() {
    return Promise.resolve([]);
  }
}

module.exports = new EventosRepositorio();
