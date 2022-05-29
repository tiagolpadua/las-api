const eventosMock = require("./eventos.json");
const eventoFinalizadoMock = require("./evento.finalizado.json");

class Evento {
  listar() {
    return Promise.resolve(eventosMock);
  }
  buscarPorId(id) {
    return Promise.resolve(eventosMock.find((evento) => evento.id === id));
  }
  isNomeEventoUtilizado(nome) {
    return Promise.resolve(
      !!eventosMock.find((evento) => evento.nome === nome)
    );
  }
  adicionarEvento(evento) {
    return Promise.resolve(evento);
  }
  alterarId(id) {
    return Promise.resolve(eventosMock.find((evento) => evento.id === id));
  }
  deletarPorId(id) {
    return Promise.resolve(eventosMock.find((evento) => evento.id === id));
  }
  buscarPorNome(nome) {
    return Promise.resolve(eventosMock.find((evento) => evento.nome === nome));
  }
  buscarPorStatus(status) {
    return Promise.resolve(
      eventoFinalizadoMock.find((eventos) => eventos.status === status)
    );
  }
}

module.exports = new Evento();
