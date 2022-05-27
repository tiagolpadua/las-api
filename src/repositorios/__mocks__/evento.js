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
    adiciona(evento){
        return Promise.resolve(evento && {insertId:90});
    }
    
    //
    alterar(id, valores){
        return Promise.resolve(eventosMock && [valores,id]);
    }

    //
    excluir(id){
        return Promise.resolve(eventosMock && id);
    }
}
module.exports = new Evento();