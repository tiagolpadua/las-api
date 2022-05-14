const repositorio = require("../repositorios/eventos");
const moment = require("moment");

const STATUS_AGENDADO = "agendado";
const STATUS_EM_ANDAMENTO = "em-andamento";
const STATUS_FINALIZADO = "finalizado";

class Eventos {
  async listar() {
    const eventos = await repositorio.listarEventos();
    return eventos.map((evento) => this.insereStatusNoEvento(evento));
  }

  async buscarPorId(id) {
    let evento = await repositorio.buscarPorIdEvento(id);
    return this.insereStatusNoEvento(evento);
  }

  incluir(evento) {
    if (this.isDatasValidas(evento.dataInicio, evento.dataFim)) {
      return repositorio.incluirEvento(evento);
    } else {
      return { erro: "Data invalida" };
    }
  }

  async alterar(id, valores) {
    const evento = await repositorio.alterarEvento(id, valores);
    return evento;
  }

  excluir(id) {
    return repositorio.excluirEvento(id);
  }

  //Validações e funções auxiliares

  isDatasValidas(dataInicio, dataFim) {
    if (
      moment(dataInicio).isAfter(moment()) &&
      moment(dataFim).isAfter(moment(dataInicio))
    ) {
      return true;
    } else {
      return false;
    }
  }

  listarPorStatus(status) {
    if (status === STATUS_AGENDADO) {
      return repositorio.statusAgendado();
    }
    if (status === STATUS_EM_ANDAMENTO) {
      return repositorio.statusEmAndamento();
    }
    if (status === STATUS_FINALIZADO) {
      return repositorio.statusFinalizado();
    }
    throw new Error(`Status inválido:${status} `);
  }

  insereStatusNoEvento(evento) {
    const status = this.obterStatusEvento(evento);
    return { ...evento, status };
  }

  obterStatusEvento(evento) {
    const dataInicio = moment(evento.dataInicio);
    const dataFim = moment(evento.dataFim);
    const hoje = moment();

    if (dataInicio.isAfter(hoje)) {
      return STATUS_AGENDADO;
    } else if (dataInicio.isSameOrBefore(hoje) && dataFim.isSameOrAfter(hoje)) {
      return STATUS_EM_ANDAMENTO;
    } else if (dataFim.isBefore(hoje)) {
      return STATUS_FINALIZADO;
    }

    return undefined;
  }
}

module.exports = new Eventos();
