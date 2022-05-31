const repositorio = require("../repositorios/eventos");
const moment = require("moment");

class Eventos {
    listar() {
        return repositorio.listar();
    }

    buscarPorId(id) {
        return repositorio.buscarPorId(id);
    }

    adicionar(evento) {
        const dataValida = this.isDatasValidas(evento.dataInicio, evento.dataFim);
        if (dataValida) {
            return repositorio.adicionar(evento);
        } else {
            return Promise.reject({ erro: "Data inválida, insira uma nova data válida" });
        }
    }

    alterar(id, valores) {
        return repositorio.alterar(id, valores);
    }

    excluir(id) {
        return repositorio.excluir(id);
    }

    isDatasValidas({dataInicio, dataFim}) {
        const dataCriacao = moment().format("YYYY-MM-DD");
        const dataInicioFormatada = moment(dataInicio).format("YYYY-MM-DD");
        const dataFimFormatada = moment(dataFim).format("YYYY-MM-DD");

        const dataValida = moment(dataInicioFormatada).isSameOrAfter(dataCriacao) && moment(dataFimFormatada).isSameOrAfter(dataInicioFormatada);

        return dataValida;
    }

    buscarPorStatus(status) {
        return repositorio.buscarPorStatus(status);
    }
}

module.exports = new Eventos();