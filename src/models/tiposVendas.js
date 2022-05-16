const repositorio = require("../repositorios/tipoVenda");
//const moment = require("moment");

class TiposVendas {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  //   async adicionar(evento) {
  //     const dataEhValida = this.isDatasValidas(evento.dataInicio, evento.dataFim);

  //     const validacoes = [
  //       {
  //         nome: "data",
  //         valido: dataEhValida,
  //         mensagem:
  //           "Data de inicio do evento deve ser maior ou igual a data atual",
  //       },
  //     ];

  //     const erros = validacoes.filter((campo) => !campo.valido);
  //     const existemErros = erros.length;

  //     if (existemErros) {
  //       return new Promise((resolve, reject) => reject(erros));
  //     } else {
  //       return evento.adicionar(evento);
  //     }
  //   }

  //   alterar(id, valores) {
  //     return repositorio.alterar(id, valores);
  //   }

  //   excluir(id) {
  //     return repositorio.excluir(id);
  //   }

  //   buscaPorStatus(status) {
  //     return repositorio.buscaPorStatus(status);
  //   }

  //   isDatasValidas(dataInicio, dataFim) {
  //     //Obter a data atual - var now = moment();
  //     //var day = moment("1995-12-25")
  //     const day = moment().format("YYYY-MM-DD");
  //     const objDataInicio = moment(dataInicio).format("YYYY-MM-DD");
  //     const objDataFim = moment(dataFim).format("YYYY-MM-DD");

  //     return (
  //       moment(objDataInicio).isSameOrAfter(day) &&
  //       moment(objDataFim).isSameOrAfter(objDataInicio)
  //     );
  //   }
}

module.exports = new TiposVendas();
