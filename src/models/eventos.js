const repositorio = require("../repositorios/eventos");
const moment = require("moment");

class Eventos {
  listar() {
    return repositorio.listarEventos();
  }
  detalharEvento(id) {
    return repositorio.buscarEvento(id);
  }
  incluirEvento(evento) {
    return repositorio.incluir(evento);
  }
  alterarEvento(id, valores) {
    return repositorio.alterar(id, valores);
  }
  excluirEvento(id) {
    return repositorio.excluir(id);
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
  listarEventosPorStatus(status) {
    switch (status) {
      case "agendado":
        return this.inserirStatus(repositorio.listarEventosAgendados());
      case "em-andamento":
        return this.inserirStatus(repositorio.listarEventosEmAndamento());
      case "finalizado":
        return this.inserirStatus(repositorio.listarEventosFinalizados());
      default:
        throw new Error(`Status inválido: ${status}`);
    }
  }
}

module.exports = new Eventos();
