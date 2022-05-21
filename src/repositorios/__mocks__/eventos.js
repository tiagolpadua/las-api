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
    return Promise.resolve(retornoForm && { insertId: 4 });
  }

  alterarEvento(id, retornoForm) {
    return Promise.resolve(id, retornoForm);
  }

  validarNomeEventoNaoUtilizadoPUT(id) {
    if (id) {
      const affectedRows = { affectedRows: 0 };
      MOCKS_EVENTOS.find((evento) => evento.id === id)
        ? (affectedRows.affectedRows = 1)
        : (affectedRows.affectedRows = 0);
      return Promise.resolve(id && affectedRows);
    }

    return Promise.reject("ID inválido");
  }

  // excluirEvento(id) {
  //   const sql = "DELETE FROM las.evento WHERE id = ?";
  //   return query(sql, id);
  // }

  // // inicio query de validação

  // // fim query de validação
}

module.exports = new Evento();
