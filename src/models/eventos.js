const repositorio = require("../repositorios/eventos");
const moment = require("moment");

class Eventos{
    listar(){
        return repositorio.listar();
    }
    buscarPorId(id) {   
        return repositorio.buscarPorId(id)
        .then(resultados => resultados[0]);
    }
    adicionar(evento){
        const dataEhValida = this.isDatasValidas(
            evento.dataInicio,
            evento.dataFim
        );
        if(dataEhValida){
            return repositorio.adicionar(evento);
        } else {
            return Promise.reject({erro: "Data inválida, cadastre novamente com uma data válida"});
        }

    }
    alterar(valores, id) {
        return repositorio.alterar(valores, id);
    }
    excluir(id) {
        return repositorio.excluir(id);
    }

    buscarPorStatus(status) {   
        return repositorio.buscarPorStatus(status);
    }
        
    isDatasValidas({ dataInicio, dataFim }) {
        const dataCriacao = moment().format("YYYY-MM-DD");
        const dataInicioEvento = moment(dataInicio).format("YYYY-MM-DD");
        const dataFimEvento = moment(dataFim).format("YYYY-MM-DD");
    
        const dataEventoEhValida =
        moment(dataInicioEvento).isSameOrAfter(dataCriacao) &&
        moment(dataFimEvento).isSameOrAfter(dataInicioEvento);
        return dataEventoEhValida;
    }
}

module.exports = new Eventos();