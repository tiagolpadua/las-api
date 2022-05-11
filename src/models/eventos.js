const repositorio = require("../repositorios/eventos");
const moment = require("moment");

class Eventos {
  listar() {
    return repositorio.listarEventos().then((resultados) => resultados);
  }

  buscarPorId(id) {
    return repositorio.buscarPorIdEvento(id).then((evento) => evento);
  }

  async incluir(evento) {
    const dataInicio = moment(evento.dataInicio, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );
    const dataFim = moment(evento.dataFim, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );

    const eventoDatasFormatadas = { ...evento, dataInicio, dataFim };

    const isDatasValidas =
      (await this.dataInicioEhValida(eventoDatasFormatadas.dataInicio)) &&
      (await this.dataFimEhValida(
        eventoDatasFormatadas.dataInicio,
        eventoDatasFormatadas.dataFim
      ));

    if (isDatasValidas) {
      return repositorio
        .incluirEvento(eventoDatasFormatadas)
        .then((evento) => evento);
    } else {
      return { erro: "Data invalida" };
    }
  }

  alterar(id, valores) {
    return repositorio.alterarEvento(id, valores).then((evento) => evento);
  }

  excluir(id) {
    return repositorio.excluirEvento(id);
  }

  async dataInicioEhValida(dataInicio) {
    return new Promise((resolve) => {
      if (moment(dataInicio) > moment()) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  async dataFimEhValida(dataInicio, dataFim) {
    return new Promise((resolve) => {
      if (moment(dataFim) > moment(dataInicio)) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  listarPorStatus(status) {
    if (status === "agendado") {
      return repositorio.statusAgendado().then((eventos) => eventos);
    }
    if (status === "em-andamento") {
      return repositorio.statusEmAndamento().then((eventos) => eventos);
    }
    if (status === "finalizado") {
      return repositorio.statusFinalizado().then((eventos) => eventos);
    }
  }
}

module.exports = new Eventos();
