const repositorio = require("../repositorios/eventos");
const moment = require("moment");
class Eventos {
  listar() {
    return repositorio.listar;
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(eventos) {

    const descricaoEhValida = eventos.descricao.length>=5;

    const validacoes = [
      {
        nome: "descricao",
        valido: descricaoEhValida,
        mensagem: "A descricao deve ser informada e possuir no minimo 5 caracteres",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      return Promise.reject(erros);
    } else {
      return repositorio.adicionar(eventos).then((resultado)=>{
        return {...eventos, id:resultado.insertId};
      });
    }
  }

  alterar(id) {
    return repositorio.alterar(id);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }


  isDatasValidas({ dataInicio, dataFim }) {
    const currentDate = moment().format("YYYY-MM-DD");

    const validEvent =
      moment(currentDate).isSameOrBefore(dataInicio) &&
      moment(dataInicio).isSameOrBefore(dataFim);

    if (validEvent) return true;
    else return false;
  }
  
  listarPorStatus(status) {
    switch (status) {
      case "agendado" : 
        return repositorio.listarEventosAgendados();
      case "em-andamento" : 
        return repositorio.listarEventosEmAndamento();
      case "finalizados" : 
        return repositorio.listarEventosFinalizados();
      default : 
        throw new Error(`status invalido: ${status}`);
    }
  }

}

module.exports = new Eventos();
