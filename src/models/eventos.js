const repositorio = require("../repositorios/eventos");
const moment = require("moment");

class Eventos {
  listarEventos() {
    return repositorio.listarEventos();
  }
  detalharEvento(id) {
    return repositorio.detalharEvento(id);
  }
  incluirEvento(evento) {
    return repositorio.incluirEvento(evento);
  }
  alterarEvento(id, valores) {
    return repositorio.alterarEvento(id, valores);
  }
  excluirEvento(id) {
    return repositorio.excluirEvento(id);
  }
  isDatasValidas(evento) {
    let checkData = false;
    const dataAtual = moment().format("YYYY-MM-DD");
    const dataInicio = moment(evento.dataInicio);
    const dataFinal = moment(evento.dataFim);
    if (dataInicio.isAfter(dataAtual) && dataFinal.isSameOrAfter(dataInicio)) {
      checkData = true;
    }
    return checkData;
  }
  statusEvento(evento) {
    let status = "";
    const dataAtual = moment().format("YYYY-MM-DD");
    const dataInicio = moment(evento.dataInicio);
    const dataFinal = moment(evento.dataFim);
    if (dataInicio.isAfter(dataAtual)) {
      status = "agendado";
    } else if (dataInicio.isSame(dataAtual) && dataFinal.isAfter(dataAtual)) {
      status = "em-andamento";
    } else if (dataFinal.isBefore(dataAtual)) {
      status = "finalizado";
    }
    return status;
  }
  alterarStatus(evento) {
    const status = this.statusEvento(evento);
    return { ...evento, status: status };
  }
  buscarEventosPorStatus(status) {
    if (status === "agendado") {
      return repositorio.listarEventosAgendados();
    }
    if (status === "em-andamento") {
      return repositorio.listarEventosEmAndamento();
    }
    if (status === "finalizado") {
      return repositorio.listarEventosFinalizados();
    }
    return Promise.reject(`Status inválido: ${status}`);
  }
}

module.exports = new Eventos();
