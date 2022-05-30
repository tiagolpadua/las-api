// const moment = require("moment");
const eventosMock = require("./eventos.json");

class Eventos {
    listar() {
        return Promise.resolve(eventosMock);
    }
    buscarPorIdEvento(id) {
        return Promise.resolve(eventosMock.find((eventos) => eventos.id === id));
    }
    adicionar(evento) {
        return Promise.resolve(evento && { insertId: 99 });
    }
    alterar(valores, id) {
        if (valores.descricao) {
            eventosMock[id - 1].descricao = valores.descricao;
        }
        return Promise.resolve(eventosMock.find((usuario) => usuario.id === id));
    }
    excluir(id) {
        const novaLista = eventosMock.filter((evento) => evento.id !== id);
        return Promise.resolve(novaLista);
    }
    statusAgendado() {
        return Promise.resolve(eventosMock.filter((eventos) => eventos.status === "agendado"));
    }

    statusEmAndamento() {
        return Promise.resolve(eventosMock.find((eventos) => eventos.status === "em-andamento"));
    }

    statusFinalizado() {
        return Promise.resolve(eventosMock.find((eventos) => eventos.status === "finalizado"));
    }
}

module.exports = new Eventos();