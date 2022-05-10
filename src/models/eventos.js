const repositorio = require("../repositorios/eventos");
const moment = require("moment");
const valida = require("./validacoes");

const dataAtual = moment().format("YYYY-MM-DD");

class Eventos {
  async listar() {
    const eventosListados = await repositorio.listar();
    return this.adicionaStatus(eventosListados);
  }

  async buscarPorId(id) {
    const eventoListado = await repositorio.buscarPorId(id);
    return this.adicionaStatus(eventoListado);
  }

  async adicionar(evento) {
    if (this.isDatasValidas(evento)) {
      const eventoAdicionado = await repositorio.adicionar(evento);
      return this.adicionaStatus(eventoAdicionado);
    } else {
      return Promise.reject({ error: "Entrada inválida" });
    }
  }

  async buscarPorStatus(status) {
    if (valida.isStatusValidos(status)) {
      const eventosListados = await repositorio.buscarStatus(status);
      return this.adicionaStatus(eventosListados);
    } else {
      return Promise.reject({ error: "Status inválido fornecido" });
    }
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  dataStatus(evento) {
    const dataFim = moment(evento.dataFim).format("YYYY-MM-DD");
    const dataInicio = moment(evento.dataInicio).format("YYYY-MM-DD");

    let status;
    if (moment(dataAtual).isBetween(dataInicio, dataFim)) {
      status = "em-andamento";
    }
    if (moment(dataAtual).isAfter(dataFim)) {
      status = "finalizado";
    }
    if (moment(dataAtual).isBefore(dataInicio)) {
      status = "agendado";
    }

    return status;
  }

  adicionaStatus(eventos) {
    return eventos.map((event) => {
      return { ...event, status: this.dataStatus(event) };
    });
  }

  isDatasValidas(evento) {
    return (
      moment(evento.dataInicio).isAfter(dataAtual) &&
      moment(evento.dataFim).isAfter(evento.dataInicio)
    );
  }
}

module.exports = new Eventos();
