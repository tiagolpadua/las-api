const repositorio = require("../repositorios/eventos");
const moment = require("moment");

const STATUS_AGENDADO = "agendado";
const STATUS_EM_ANDAMENTO = "em-andamento";
const STATUS_FINALIZADO = "finalizado";

class Eventos {
  async listar() {
    const eventos = await repositorio.listar();
    return eventos.map((evento) => this.insereStatusNoEvento(evento));
  }

  adicionar(evento) {
    const dataEventoEhValida = this.isDatasValidas(
      evento.dataInicio,
      evento.dataFim
    );

    if (!dataEventoEhValida) {
      return new Promise((resolve, reject) =>
        reject({ erro: "Evento com datas inválidas" })
      );
    }

    return repositorio.adicionar(evento);
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  async buscaPorId(id) {
    const resultado = await repositorio.buscaPorId(id);
    return this.insereStatusNoEvento(resultado);
  }

  buscaPorStatus(status) {
    switch (status) {
      case STATUS_AGENDADO:
        return repositorio.buscarEventosAgendado();
      case STATUS_EM_ANDAMENTO:
        return repositorio.buscarEventosEmAndamento();
      case STATUS_FINALIZADO:
        return repositorio.buscarEventosFinalizado();
      default:
        return new Promise((resolve, reject) =>
          reject({ erro: `O Status ${status} não é válido` })
        );
    }
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

  insereStatusNoEvento(evento) {
    const status = this.obterStatusEvento(evento);
    return { ...evento, status };
  }

  obterStatusEvento(evento) {
    const dataInicio = moment(evento.dataInicio);
    const dataFim = moment(evento.dataFim);
    const dataAtual = moment();

    if (dataInicio.isAfter(dataAtual)) {
      return STATUS_AGENDADO;
    } else if (dataAtual.isBetween(dataInicio, dataFim)) {
      return STATUS_EM_ANDAMENTO;
    } else if (dataFim.isBefore(dataAtual)) {
      return STATUS_FINALIZADO;
    }

    return undefined;
  }
}

module.exports = new Eventos();
