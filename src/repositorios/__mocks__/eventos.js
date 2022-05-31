const eventoMock = require("./evento.json");

class evento {
  adicionar(evento){
    return Promise.resolve(evento && {insertId: 99});
  }

  listar(){
    return Promise.resolve(eventoMock);
  }

  listarPorId(id){
    return Promise.resolve(eventoMock.find((evento) => evento.id === id));
  }

  listarPorStatusAgendado(){
    return Promise.resolve(eventoMock.filter((evento) => evento.status === "agendado"));
  }

  listarPorStatusEmAndamento(){
    return Promise.resolve(eventoMock.filter((evento) => evento.status === "em-andamento"));
  }

  listarPorStatusFinalizado(){
    return Promise.resolve(eventoMock.filter((evento) => evento.status === "finalizado"));
  }
  // eslint-disable-next-line no-unused-vars
  alterar(id, dadosAtualizado){
    return Promise.resolve(eventoMock.find((evento) => evento.id === id));
  }

  excluir(id){
    return Promise.resolve(eventoMock.find((evento) => evento.id === id));
  }
}

module.exports = new evento();