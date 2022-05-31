const repositorio = require("../repositorios/eventos");  
const moment = require("moment");

const STATUS_AGENDADO = "agendado";
const STATUS_EM_ANDAMENTO = "em-andamento";
const STATUS_FINALIZADO = "finalizado";

class Eventos {
  async adicionar(evento){
    const validaData = this.isDatasValidas(evento.dataInicio, evento.dataFim);
  
    if(validaData){
      const resp = await repositorio.adicionar(evento);
      return {id: resp.insertId, ...evento};
    }else{
      throw {erro: "As datas do evento estão inválidas"};
    }    
  }

  async listar(){
    const eventos = await repositorio.listar();
    return eventos.map((evento) => this.insereStatusNoEvento(evento));
    // return repositorio.listar();
  }

  async listarPorId(id){
    let evento = await repositorio.listarPorId(id);
    return this.insereStatusNoEvento(evento);
  }

  async listarPorStatus(status){
    if(status === STATUS_AGENDADO) {
      const eventos = await repositorio.listarPorStatusAgendado();
      return eventos.map((evento) => this.insereStatusNoEvento(evento));
    }else if(status === STATUS_EM_ANDAMENTO){
      const eventos = await repositorio.listarPorStatusEmAndamento();
      return eventos.map((evento) => this.insereStatusNoEvento(evento));
    }else if(status === STATUS_FINALIZADO){
      const eventos = await repositorio.listarPorStatusFinalizado();
      return eventos.map((evento) => this.insereStatusNoEvento(evento));
    }else{
      return Promise.reject({erro: "Status Inválido"});
    }
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
    const dataInicio = moment(evento.dataInicio);
    const dataFim = moment(evento.dataFim);
    const hoje = moment();

    if (dataInicio.isAfter(hoje)) {
      return STATUS_AGENDADO;
    } else if (hoje.isBetween(dataInicio,dataFim)) {
      return STATUS_EM_ANDAMENTO;
    } else if (dataFim.isBefore(hoje)) {
      return STATUS_FINALIZADO;
    }
    return undefined;
  }

}

module.exports = new Eventos();