// const query = require("../infraestrutura/database/queries");
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
    if (id) {
      const affectedRows = { affectedRows: 0 };
      MOCKS_EVENTOS.find((evento) => evento.id === id)
        ? (affectedRows.affectedRows = 1)
        : (affectedRows.affectedRows = 0);
      return Promise.resolve(id && affectedRows);
    }

    return Promise.reject("ID inválido");
  }

  validaNomeEventoNaoUtilizadoPUT(id, retornoForm) {
    const existeEvento = MOCKS_EVENTOS.filter(
      (evento) => evento.nome === retornoForm && evento.id !== id
    );

    return Promise.resolve(existeEvento);
  }

  excluirEvento(id) {
    console.log("retorno id delete", id);
    if (id) {
      const affectedRows = { affectedRows: 0 };
      MOCKS_EVENTOS.find((evento) => evento.id === id)
        ? (affectedRows.affectedRows = 1)
        : (affectedRows.affectedRows = 0);
      return Promise.resolve(id && affectedRows);
    }

    return Promise.reject("ID inválido");
  }

  // // inicio query de validação

  // // fim query de validação
}

module.exports = new Evento();
