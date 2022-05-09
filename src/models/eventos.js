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
      return new Promise((resolve, reject) =>
        reject({ erro: "Datas inválidas" })
      );
    }
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
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
}

module.exports = new Eventos();
