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
    // statusAgendado() {
    //     const dataHoje = moment().format("YYYY-MM-DD");
    //     const sql = "SELECT * FROM eventos WHERE dataInicio >= ?";
    //     return query(sql, dataHoje);
    // }

    // statusEmAndamento() {
    //     const dataHoje = {
    //       inicio: moment().startOf("day").format("YYYY-MM-DD"),
    //       fim: moment().endOf("day").format("YYYY-MM-DD"),
    //     };
    //     const sql = "SELECT * FROM eventos WHERE dataInicio <= ? AND dataFim >= ?";
    //     return query(sql, [dataHoje.inicio, dataHoje.fim]);
    // }

    // statusFinalizado() {
    //     const dataHoje = moment().format("YYYY-MM-DD");
    //     const sql = "SELECT * FROM eventos WHERE dataFim < ?";
    //     return query(sql, dataHoje);
    // }
}

module.exports = new Eventos();