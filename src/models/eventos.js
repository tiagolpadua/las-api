const repositorio = require("../repositorios/evento");
const moment = require("moment");

class Eventos {
  listar() {
    return repositorio.listar();
  }

  buscaPorId(id) {
    return repositorio.buscaPorId(id);
  }

  adicionar(evento) {
    if (this.isDatasValidas(evento)) {
      const eventoComStatus = this.inserirStatus(evento);
      return repositorio.adicionar(eventoComStatus);
    }
    
    return Promise.reject("Datas inválidas, tente novamente.");
  }

  alterar(valores, id) {
    return repositorio.alterar(valores, id);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  isDatasValidas(evento) {
    let eventoValido = false;

    if (evento.dataFim && evento.dataInicio) {
      const hoje = moment();
      const dataInicio = moment(evento.dataInicio);
      const dataFim = moment(evento.dataFim);

      if (dataInicio.isAfter(hoje) && dataFim.isSameOrAfter(dataInicio)) {
        eventoValido = true;
      }
    }
    return eventoValido;
  }

  obterStatus(evento) {
    let status;

    const hoje = moment();
    const dataInicio = moment(evento.dataInicio);
    const dataFim = moment(evento.dataFim);
    if (dataInicio.isAfter(hoje)) {
      status = "agendado";
    } else if (dataInicio.isSameOrBefore(hoje) && dataFim.isAfter(hoje)) {
      status = "em-andamento";
    } else if (dataFim.isBefore(hoje)) {
      // será seguro quando haver validação na criação do objeto
      status = "finalizado";
    }
    return status;
  }

  inserirStatus(evento) {
    const status = this.obterStatus(evento);
    return { ...evento, status: status };
  }

  listarPorStatus(status) {
    switch (status) {
      case "agendado":
        return repositorio.listarEventosAgendados();
      case "em-andamento":
        return repositorio.listarEventosEmAndamento();
      case "finalizado":
        return repositorio.listarEventosFinalizados();
      default:
        throw new Error(`Status inválido: ${status}`);
    }
  }
}
module.exports = new Eventos();
