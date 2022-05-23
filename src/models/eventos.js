const repositorio = require("../repositorios/eventos");
const moment = require("moment");
const valida = require("./validacoes");
const { EM_ANDAMENTO, AGENDADO, FINALIZADO } = require("../enums/eventoStatus");

class Eventos {
  async listar() {
    const eventosListados = await repositorio.listar();
    return this.adicionaStatus(eventosListados);
  }

  async buscarPorId(id) {
    const eventoListado = await repositorio.buscarPorId(id);
    return this.adicionaStatus(eventoListado)[0];
  }

  async adicionar(evento) {
    if (
      this.isDatasValidas(evento) &&
      valida.isFormatoUrlFotoValido(evento.urlFoto) &&
      (await valida.isStatusFotoValido(evento.urlFoto))
    ) {
      const eventoAdicionado = await repositorio.adicionar(evento);
      return this.adicionaStatus(eventoAdicionado)[0];
    } else {
      return Promise.reject({ error: "Entrada inválida" });
    }
  }

  async buscarPorStatus(status) {
    if (valida.isStatusValidos(status)) {
      const eventosListados = await repositorio.buscarStatus(status);
      return this.adicionaStatus(eventosListados)[0];
    } else {
      return Promise.reject({ error: "Status fornecido inválido " });
    }
  }

  async alterar(id, valores) {
    const eventoAlterado = await repositorio.alterar(id, valores);
    return this.adicionaStatus(eventoAlterado)[0];
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  dataStatus(evento) {
    const dataAtual = moment().format("YYYY-MM-DD");
    const dataFim = moment(evento.dataFim).format("YYYY-MM-DD");
    const dataInicio = moment(evento.dataInicio).format("YYYY-MM-DD");

    let status;
    if (moment(dataAtual).isBetween(dataInicio, dataFim)) {
      status = EM_ANDAMENTO;
    }
    if (moment(dataAtual).isAfter(dataFim)) {
      status = FINALIZADO;
    }
    if (moment(dataAtual).isBefore(dataInicio)) {
      status = AGENDADO;
    }

    return status;
  }

  adicionaStatus(eventos) {
    return eventos.map((event) => {
      return { ...event, status: this.dataStatus(event) };
    });
  }

  isDatasValidas(evento) {
    const dataAtual = moment().format("YYYY-MM-DD");
    return (
      moment(evento.dataInicio).isAfter(dataAtual) &&
      moment(evento.dataFim).isAfter(evento.dataInicio)
    );
  }
}

module.exports = new Eventos();
