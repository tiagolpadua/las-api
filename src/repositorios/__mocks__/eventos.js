const eventosMock = require("./mockEventos.json");

class TiposVendas {
  listar() {
    return Promise.resolve(eventosMock);
  }
  adicionar(evento) {
    return Promise.resolve(evento && { insertId: 99 });
  }

  alterar(id, evento) {
    return id && evento && eventosMock[id - 1]
      ? Promise.resolve()
      : Promise.reject();
  }

  excluir(id) {
    return eventosMock[id - 1] ? Promise.resolve() : Promise.reject();
  }
  buscarEventosAgendado() {
    return Promise.resolve(
      eventosMock.filter((evento) => evento.status == "agendado")
    );
  }
  buscarEventosEmAndamento() {
    return Promise.resolve(
      eventosMock.filter((evento) => evento.status == "em-andamento")
    );
  }
  buscarEventosFinalizado() {
    return Promise.resolve(
      eventosMock.filter((evento) => evento.status == "finalizado")
    );
  }
  buscaPorId(id) {
    return eventosMock[id - 1]
      ? Promise.resolve(eventosMock[id - 1])
      : Promise.reject();
  }
}

module.exports = new TiposVendas();
