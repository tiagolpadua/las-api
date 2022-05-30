// const query = require("../infraestrutura/database/queries");

const eventosMock = require("./eventos.json");

class Evento {
  
  listarEventos() {
    return Promise.resolve(eventosMock);
  }

  buscarPorId(id) {
    return Promise.resolve(eventosMock.find((evento) => evento.id === id));    
  }

  // listarEventosAgendados() {
  //   return Promise.resolve(eventosMock);
  // }

  // listarEventosEmAndamento() {
  //   return Promise.resolve(eventosMock);
  // }

  // listarEventosFinalizados() {
  //   return Promise.resolve(eventosMock);
  // }

  buscarEventoPorStatus() {
    return Promise.resolve(eventosMock);
  }
}

module.exports = new Evento();