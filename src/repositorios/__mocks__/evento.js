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

  alterar(valores, id) {
    const evento = eventosMock.find((evento) => evento.id === id);
    evento.nome = valores.nome;
    return Promise.resolve(evento);

  }

  excluir(id) {
    const eventosFiltrados = eventosMock.filter((evento) => evento.id !== id);
    return Promise.resolve(eventosFiltrados);
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




module.exports = new EventoRepositorio();