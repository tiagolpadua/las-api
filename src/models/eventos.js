const repositorio = require("../repositorios/eventos");
const moment = require("moment");

const STATUS_AGENDADO = "agendado";
const STATUS_EM_ANDAMENTO = "em-andamento";
const STATUS_FINALIZADO = "finalizado";

class Eventos {
  listar() {
    return repositorio.listar();
  }

  async adicionar(evento) {
    return repositorio.adicionar(evento);
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscarPorId(id) {
    return repositorio.buscaPorId(id);
  }

  buscaPorStatus(status) {
    return repositorio.buscaPorStatus(status);
  }

  buscarPorNome(nome) {
    return repositorio.buscaPorNome(nome);
  }

  isDatasValidas(datas) {
    const { dataInicio, dataFim } = datas;
    return (
      moment().isBefore(dataInicio) && moment(dataInicio).isBefore(dataFim)
    );
  }

  listaStatus(status) {
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
