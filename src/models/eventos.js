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
    if (evento) {
      return this.insereStatusNoEvento(evento);
    } else {
      return;
    }
  }

  async incluir(evento) {
    const resp = await repositorio.incluirEvento(evento);
    if (this.isDatasValidas(resp)) {
      return { id: resp.insertId, ...evento };
    } else {
      return { erro: "Data invalida" };
    }
  }

  alterar(id, valores) {
    return repositorio
      .alterarEvento(id, valores)
      .then((resultado) =>
        resultado.changedRows > 0
          ? { resultado: "Alteração feita com sucesso" }
          : resultado
      );
  }

  excluir(id) {
    return repositorio.excluirEvento(id);
  }

  //Validações e funções auxiliares

  isDatasValidas(evento) {
    return (
      moment(evento.dataInicio).isAfter(moment()) &&
      moment(evento.dataFim).isAfter(moment(evento.dataInicio))
    );
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
