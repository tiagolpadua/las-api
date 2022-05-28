const eventosMock = require("./eventos");

class Evento{
    //
    listar() {
        return Promise.resolve(eventosMock);
    }

    //
    buscarPorId(id) {
        return Promise.resolve(eventosMock.find((evento) => evento.id === id));
    }
  
    //
    adicionar(evento){
        return Promise.resolve(evento && {insertId:4});
    }
    
    //
    alterar(id, valores){
        return Promise.resolve(eventosMock && [valores,id]);
    }

    //
    excluir(id){
        return Promise.resolve(eventosMock && id);
    }

    listarAgendado(){
        return Promise.resolve(eventosMock.filter((evento) => evento.status === "agendado"));
    }

    listarEmAndamento(){
        return Promise.resolve(eventosMock.filter((evento) => evento.status === "em-andamento"));
    }

    listarFinalizado(){
        return Promise.resolve(eventosMock.filter((evento) => evento.status === "finalizado"));
    }
}
module.exports = new Evento();