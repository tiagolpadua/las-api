const eventosMock = require("./eventosMock.json");

class EventoRepositorio {
  listar() {
    return Promise.resolve(eventosMock);
  }
  buscaPorId(id) {
    return Promise.resolve(eventosMock.find((evento) => evento.id === id));
  }

  adicionar(evento) {
    return Promise.resolve(evento && {insertId: 3});
  }

  // alterar(valores, id) {

  // }
}



module.exports = new EventoRepositorio();