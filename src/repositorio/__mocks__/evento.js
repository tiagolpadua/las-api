const eventosMockados = require("./dados_mockados/eventosMockados.json");

class Evento {
  listar() {
    return Promise.resolve(eventosMockados);
  }

  adicionar(evento) {
    return Promise.resolve(evento && { insertId: 99 });
  }

  buscaPorId(id) {
    if (isNaN(id)) {
      return Promise.reject();
    }
    return Promise.resolve(
      eventosMockados[id - 1] ? [eventosMockados[id - 1]] : []
    );
  }

  alterar(id, eventoAtualizado) {
    if (isNaN(id)) {
      return Promise.reject();
    }
    return Promise.resolve(
      id && eventoAtualizado && eventosMockados[id - 1]
        ? { affectedRows: 1 }
        : { affectedRows: 0 }
    );
  }

  excluir(id) {
    if (isNaN(id)) {
      return Promise.reject();
    }
    return eventosMockados[id - 1]
      ? Promise.resolve({ affectedRows: 1 })
      : Promise.resolve({ affectedRows: 0 });
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
