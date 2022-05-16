const repositorio = require("../repositorios/eventos");  
const moment = require("moment");

const STATUS_AGENDADO = "agendado";
const STATUS_EM_ANDAMENTO = "em-andamento";
const STATUS_FINALIZADO = "finalizado";

class Eventos {
  adicionar(evento){
    const validaData = this.isDatasValidas(evento.dataInicio, evento.dataFim);
  
    if(validaData){
      return repositorio.adicionar(evento);
    }else{
      return new Promise((reject) => reject({erro: "As datas do evento estão inválidas"}));
    }    
  }

  async listar(){
    const eventos = await repositorio.listar();
    return eventos.map((evento) => this.insereStatusNoEvento(evento));
  }

  async listarPorId(id){
    return this.insereStatusEvento(await repositorio.listarPorId(id));
  }

  listarPorStatus(status){
    return repositorio.listarPorStatus(status);
  }

  alterar(id, dadosAtualizado){
    const validaData = this.isDatasValidas(dadosAtualizado.dataInicio, dadosAtualizado.dataFim);

    if(validaData){
      return repositorio.alterar(id, dadosAtualizado);
    }else{
      return new Promise((reject) => reject({erro: "As datas do evento estão inválidas"})
      );
    }   
  }

  exclui(id){
    return repositorio.excluir(id);
  }

  isDatasValidas({ dataInicio, dataFim }){
    const dataCriacao = moment().format("YYYY-MM-DD");
    const dataInicioEvento = moment(dataInicio).format("YYYY-MM-DD");
    const dataFimEvento = moment(dataFim).format("YYYY-MM-DD");

    const dataValida = moment(dataInicioEvento).isSameOrAfter(dataCriacao) && moment(dataFimEvento).isSameOrAfter(dataInicioEvento);

    return dataValida;
  }

  insereStatusNoEvento(evento){
    const status = this.obterStatusEvento(evento);
    return {...evento, status};
  }

  obterStatusEvento(evento) {
    const dataInicio = moment(evento.dataInicio).format("YYYY-MM-DD");
    const dataFim = moment(evento.dataFim).format("YYYY-MM-DD");
    const hoje = moment().format("YYYY-MM-DD");

    if (dataInicio.isAfter(hoje)) {
      return STATUS_AGENDADO;
    } else if (hoje.isbetween(dataInicio,dataFim)) {
      return STATUS_EM_ANDAMENTO;
    } else if (dataFim.isBefore(hoje)) {
      return STATUS_FINALIZADO;
    }
    return undefined;
  }

}

module.exports = new Eventos();