const moment = require("moment");

const MOCKS_EVENTOS = require("./EVENTOS.json");

class Evento {
  listarEvento() {
    return Promise.resolve(MOCKS_EVENTOS);
  }

  buscaEventoId(retornoId) {
    return Promise.resolve(
      MOCKS_EVENTOS.filter((evento) => evento.id === retornoId)
    );
  }

  listarEventosAgendados() {
    const agendados = MOCKS_EVENTOS.filter((evento) => {
      const currentDate = moment();
      const dataInicio = moment(evento.dataInicio);

      return dataInicio.isAfter(currentDate);
    });

    return Promise.resolve(agendados);
  }

  listarEventosEmAndamento() {
    const emAndamento = MOCKS_EVENTOS.filter((evento) => {
      const currentDate = moment();
      const dataInicio = moment(evento.dataInicio);
      const dataFim = moment(evento.dataFim);

      return (
        dataInicio.isSameOrBefore(currentDate) &&
        dataFim.isSameOrAfter(currentDate)
      );
    });

    return Promise.resolve(emAndamento);
  }

  listarEventosFinalizados() {
    const finalizados = MOCKS_EVENTOS.filter((evento) => {
      const currentDate = moment();
      const dataFim = moment(evento.dataFim);

      return dataFim.isBefore(currentDate);
    });

    return Promise.resolve(finalizados);
  }

  validarNomeEventoNaoUtilizado(retornoForm) {
    const existeEvento = MOCKS_EVENTOS.filter(
      (evento) => evento.nome === retornoForm
    );

    return Promise.resolve(existeEvento);
  }

  incluirEvento(retornoForm) {
    return Promise.resolve(
      retornoForm && {
        insertId: 4,
        dataInicio: retornoForm.dataInicio,
        dataFim: retornoForm.dataFim,
      }
    );
  }

  alterarEvento(id) {
    return this.checkDataBaseInsertion(id, MOCKS_EVENTOS);
  }

  validaNomeEventoNaoUtilizadoPUT(id, retornoForm) {
    const existeEvento = MOCKS_EVENTOS.filter(
      (evento) => evento.nome === retornoForm && evento.id !== id
    );

    return Promise.resolve(existeEvento);
  }

  excluirEvento(id) {
    return this.checkDataBaseInsertion(id, MOCKS_EVENTOS);
  }

  checkDataBaseInsertion(identifier, list) {
    if (identifier) {
      return list.find((item) => item.id === identifier)
        ? Promise.resolve({ affectedRows: 1 })
        : Promise.resolve({ affectedRows: 0 });
    }

    return Promise.reject("ID inválido");
  }

  // // inicio query de validação

  // // fim query de validação
}

module.exports = new Evento();
