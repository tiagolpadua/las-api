const repositorio = require("../repositorios/evento");
const moment = require("moment");

class Eventos {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(evento) {
    const dataEhValida = this.isDatasValidas(evento.dataInicio, evento.dataFim);

    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mensagem: "Data do Evento invalida.",
      },
    ];

    // const erros = validacoes.filter((campo) => !campo.valido);
    // const existemErros = erros.length;

    if (!dataEhValida) {
      return new Promise((resolve, reject) => reject(validacoes[0]));
    } else {
      return repositorio.adicionar(evento);
    }
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscaPorStatus(status) {
    return repositorio.buscaPorStatus(status);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

  isDatasValidas({ dataInicio, dataFim }) {
    //Obter a data atual - var now = moment();
    //var day = moment("1995-12-25")
    const day = moment().format("YYYY-MM-DD");
    const objDataInicio = moment(dataInicio).format("YYYY-MM-DD");
    const objDataFim = moment(dataFim).format("YYYY-MM-DD");

    return (
      moment(objDataInicio).isSameOrAfter(day) &&
      moment(objDataFim).isSameOrAfter(objDataInicio)
    );
  }
}

module.exports = new Eventos();
