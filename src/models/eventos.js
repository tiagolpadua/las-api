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
        const dataEhValida = this.isDatasValidas(evento.dataInicio, evento.dataFim);
        if(dataEhValida){
            return repositorio.adicionar(evento);
        } else {
            return Promise.reject({erro: "Data inválida, insira novamente com uma data válida"});
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
        const dataInicioFormatada = moment(dataInicio).format("YYYY-MM-DD");
        const dataFimFormatada = moment(dataFim).format("YYYY-MM-DD");
    
        const dataEhValida = moment(dataInicioFormatada).isSameOrAfter(dataCriacao) && moment(dataFimFormatada).isSameOrAfter(dataInicioFormatada);

        return dataEhValida;
    }
}

module.exports = new Eventos();