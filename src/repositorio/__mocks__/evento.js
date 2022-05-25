const eventosMockados = require("./dados_mockados/eventosMockados.json");

class Evento {
  listar() {
    return Promise.resolve(eventosMockados);
  }

  adicionar(tipoVenda) {
    return Promise.resolve(tipoVenda && { insertId: 99 });
  }

  buscaPorId(id) {
    return eventosMockados[id - 1]
      ? Promise.resolve(eventosMockados[id - 1])
      : Promise.reject();
  }

  alterar(id, tipoVendaAtualizada) {
    return id && tipoVendaAtualizada && eventosMockados[id - 1]
      ? Promise.resolve()
      : Promise.reject();
  }

  excluir(id) {
    return eventosMockados[id - 1] ? Promise.resolve() : Promise.reject();
  }
  buscarEventosAgendado() {
    return Promise.resolve(
      eventosMockados.filter((evento) => evento.status == "agendado")
    );
  }
  buscarEventosEmAndamento() {
    return Promise.resolve(
      eventosMockados.filter((evento) => evento.status == "em-andamento")
    );
  }
  buscarEventosFinalizado() {
    return Promise.resolve(
      eventosMockados.filter((evento) => evento.status == "finalizado")
    );
  }
}

module.exports = new Evento();
