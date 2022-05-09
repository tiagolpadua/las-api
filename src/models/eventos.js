const repositorio = require("../repositorios/eventos");
const moment = require("moment");
const valida = require("./validacoes");

const dataAtual = moment().format("YYYY-MM-DD");

class Eventos {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(evento) {
    if (this.isDatasValidas(evento)) {
      const eventoAdicionado = await repositorio.adicionar(evento);
      const eventoStatus = this.dataStatus(evento);
      return { ...eventoAdicionado, status: eventoStatus };
    } else {
      return Promise.reject({ error: "Entrada inválida" });
    }
  }

  buscarPorStatus(status) {
    if (valida.isStatusValidos(status)) {
      return repositorio.buscarStatus(status, dataAtual);
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

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

  dataStatus(evento) {
    const dataFim = moment(evento.dataFim, "YYYY-MM-DD");
    const dataInicio = moment(evento.dataInicio, "YYYY-MM-DD");

    let status;
    if (moment(dataAtual).isBetween(dataFim, dataInicio)) {
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

  isDatasValidas(evento) {
    return (
      moment(evento.dataInicio).isAfter(dataAtual) &&
      moment(evento.dataFim).isAfter(evento.dataInicio)
    );
  }
}

module.exports = new Eventos();
