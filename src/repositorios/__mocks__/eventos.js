// const query = require("../infraestrutura/database/queries");

const eventosMock = require("./eventos.json");

class Evento {
  
  listarEventos() {
    return Promise.resolve(eventosMock);
  }

  buscarPorId(id) {
    return Promise.resolve(eventosMock.find((evento) => evento.id === id));    
  }

  buscarEventoPorStatus() {
    return Promise.resolve(eventosMock);
  }
}

module.exports = new Evento();