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
  async buscarPorId(id) {
    let evento = await repositorio.buscarPorIdEvento(id);
    if (evento) {
      return this.insereStatusNoEvento(evento);
    } else {
      return undefined;
    }
  }
  async adicionar(evento) {
    const dataEhValida = this.isDatasValidas(evento.dataInicio, evento.dataFim);
    if (dataEhValida) {
      const resp = await repositorio.adicionar(evento);
      return { id: resp.insertId, ...evento };
    } else {
      return Promise.reject({ erro: "Data inválida, insira novamente com uma data válida" });
    }

  }
  alterar(valores, id) {
    return repositorio.alterar(valores, id);
  }
  excluir(id) {
    return repositorio.excluir(id);
  }
  isDatasValidas({ dataInicio, dataFim }) {
    const dataCriacao = moment().format("YYYY-MM-DD");
    const dataInicioFormatada = moment(dataInicio).format("YYYY-MM-DD");
    const dataFimFormatada = moment(dataFim).format("YYYY-MM-DD");

    const dataEhValida = moment(dataInicioFormatada).isSameOrAfter(dataCriacao) && moment(dataFimFormatada).isSameOrAfter(dataInicioFormatada);

    return dataEhValida;
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
    throw new Error(`Status inválido: ${status} `);
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