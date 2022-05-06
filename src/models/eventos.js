const repositorio = require("../repositorios/eventos");
const moment = require("moment");

class Eventos {
  listar() {
    return repositorio.listar();
  }

  async adicionar(evento) {
    return repositorio.adiciona(evento);
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
}

module.exports = new Eventos();
