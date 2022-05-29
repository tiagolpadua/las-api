const repositorio = require("../repositorios/eventos");
const moment = require("moment");

class Eventos {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  adicionar(evento) {
    const dataEValida = this.isDatasValidas(evento.dataInicio, evento.dataFim);

    if (!dataEValida) {
      throw { erro: "Datas inválidas" };
    } else {
      return repositorio.adicionarEvento(evento);
    }
  }

  alterar(id, valores) {
    return repositorio.alterarId(id, valores);
  }

  excluir(id) {
    return repositorio.excluirEvento(id);
  }
  isDatasValidas({ dataInicio, dataFim }) {
    const dataCriacao = moment().format("YYYY-MM-DD");
    const dataInicioEvento = moment(dataInicio).format("YYYY-MM-DD");
    const dataFimEvento = moment(dataFim).format("YYYY-MM-DD");

    const dataEValida =
      moment(dataInicioEvento).isSameOrAfter(dataCriacao) &&
      moment(dataFimEvento).isSameOrAfter(dataInicioEvento);
    return dataEValida;
  }
  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }
  buscaPorStatus(status) {
    return repositorio.buscaPorStatus(status);
  }
}

module.exports = new Eventos();
