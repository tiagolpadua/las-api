const eventosMock = require("./dados-mockados/eventos.json");

class Evento {
  listar() {
    return Promise.resolve(eventosMock);
  }

  buscaPorId(id){
    return Promise.resolve(eventosMock.find((evento) => evento.id === id));
  }

  adicionar(eventosMock) {
    return Promise.resolve(eventosMock && { insertId: 4 });
  }

  alterar(id, valores){
    return Promise.resolve(eventosMock && [valores,id]);
    }

    excluir(id){
        return Promise.resolve(eventosMock && id);
    }

    listarEventosAgendados(){
        return Promise.resolve(eventosMock.filter((evento) => evento.status === "agendado"));
    }

    listarEventosEmAndamento(){
        return Promise.resolve(eventosMock.filter((evento) => evento.status === "em-andamento"));
    }

    listarEventosFinalizados(){
        return Promise.resolve(eventosMock.filter((evento) => evento.status === "finalizado"));
    }
}

module.exports = new Evento();