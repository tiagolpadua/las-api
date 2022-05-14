const moment = require("moment");
const repositorios = require("../repositorios/eventos");
const { validarURLFoto } = require("./validações");

const STATUS_AGENDADO = "agendado";
const STATUS_EM_ANDAMENTO = "em-andamento";
const STATUS_FINALIZADO = "finalizado";
const hoje = moment().format("YYYY-MM-DD");

class Eventos {
  async listar() {
    const eventos = await repositorios.listar();
    return this.insereStatus(eventos[0]);
  }
  buscarPorId(id) {
    return repositorios.buscarPorId(id);
  }

  deletar(id) {
    return repositorios.deletar(id);
  }

  async atualizar(evento, id) {
    const dataValida = this.isDatasValidas(evento.dataInicio, evento.dataFim);
    const validarUrl = await validarURLFoto(evento.urlFoto);
    if (validarUrl && dataValida) {
      return repositorios.atualizar(evento, id);
    } else {
      return Promise.reject(evento);
    }
  }
  async adicionar(evento) {
    const dataValida = this.isDatasValidas(evento);
    const validarUrl = await validarURLFoto(evento.urlFoto);
    if (validarUrl && dataValida) {
      return repositorios.adicionar(evento);
    } else {
      return Promise.reject(evento);
    }
  }

  isDatasValidas(dados) {
    const dataInicio = dados.dataInicio;
    const dataFim = dados.dataFim;
    if (dataInicio >= hoje && dataFim >= dataInicio) {
      return true;
    } else {
      return false;
    }
  }

  buscarPorStatus(status) {
    if (status.toLowerCase() === STATUS_AGENDADO) {
      return repositorios.listarEventoAgendados();
    } else if (
      status.toLowerCase() === STATUS_EM_ANDAMENTO ||
      status.toLowerCase() === "em andamento"
    ) {
      return repositorios.listarEventoEmAadamento();
    } else if (status.toLowerCase() === STATUS_FINALIZADO) {
      return repositorios.listarEventoFinalizado();
    }
  }

  insereStatus(evento) {
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
