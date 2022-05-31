// const query = require("../infraestrutura/database/queries");

const eventosMock = require("./eventoss.json");

class Eventos {
    listar() {
        return Promise.resolve(eventosMock);
    }

    buscarPorId(id) {
        return Promise.resolve(eventosMock.find((evento) => evento.id === id));
    }

    adicionar(evento) {
        return Promise.resolve(evento);
    }

    alterar(valores, id) {
        return Promise.resolve(eventosMock.find((evento) => evento.id === id));
    }

    excluir(id) {
        return Promise.resolve(eventosMock.find((evento) => evento.id === id));
    }

    buscarPorStatus() {
        return Promise.resolve((eventosMock.filter((evento) => evento.status === "agendado")));
    }
}

module.exports = new Eventos();