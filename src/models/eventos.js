const repositorio = require("../repositorio/evento");
const moment = require("moment");

class Eventos {
  listar() {
    return repositorio.listar();
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

  buscaPorId(id) {
    return repositorio.buscaPorId(id);
  }

  buscaPorStatus(status) {
    return repositorio.buscaPorStatus(status);
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

    const dataEventoEhValida =
      moment(dataInicioEvento).isSameOrAfter(dataCriacao) &&
      moment(dataFimEvento).isSameOrAfter(dataInicioEvento);
    return dataEventoEhValida;
  }
}

module.exports = new Eventos();
