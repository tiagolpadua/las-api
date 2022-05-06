const repositorio = require("../repositorios/eventos");
const moment = require("moment");
const valida = require("./validacoes");

class Eventos {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(evento) {
    if (this.isDatasValidas(evento)) {
      return repositorio.adicionar(evento);
    } else {
      return Promise.reject({ error: "Entrada inválida" });
    }
  }

  buscarPorStatus(status) {
    if (valida.isStatusValidos(status)) {
      repositorio.buscarStatus(status);
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

  isDatasValidas(evento) {
    const dataAtual = moment().format("YYYY-MM-DD");
    return (
      moment(evento.dataInicio).isAfter(dataAtual) &&
      moment(evento.dataFim).isAfter(evento.dataInicio)
    );
  }
}

module.exports = new Eventos();
