const repositorio = require("../repositorios/eventos");
const moment = require("moment");
const funcoesValidacoes = require("../validacoes/validacoes");
const listaValidacoes = require("../validacoes/listaValidacoes");

const EVENTO_AGENDADO = "agendado";
const EVENTO_ANDAMENTO = "em-andamento";
const EVENTO_FINALIZADO = "finalizado";

class Evento {
  constructor() {
    this.isDatasValidas = funcoesValidacoes.isDatasValidas;

    this.valida = funcoesValidacoes.valida;

    this.validacoes = [...listaValidacoes];
  }

  async incluirEvento(retornoForm) {
    const dataInicio = moment(
      retornoForm.dataInicio,
      "DD-MM-YYYY",
      true
    ).format("YYYY-MM-DD");
    const dataFim = moment(retornoForm.dataFim, "DD-MM-YYYY", true).format(
      "YYYY-MM-DD"
    );

    const retornoDatado = { ...retornoForm, dataInicio, dataFim };

    const parametros = {
      nomeEvento: retornoDatado.nome.length,
      url: retornoDatado.urlFoto,
      existeEvento: retornoDatado.nome,
      data: retornoDatado,
    };

    const erros = await this.valida(parametros);

    const existemErros = erros.length;

    console.log("EXISTEM ERROS EVENTO", erros);

    if (existemErros) {
      return Promise.reject(erros);
    }

    return repositorio.incluirEvento(retornoDatado);
  }

  listarEvento() {
    return repositorio
      .listarEvento()
      .then((resultado) =>
        resultado.map((item) => funcoesValidacoes.insereStatus(item))
      );
  }

  buscaEventoId(retornoForm) {
    return repositorio
      .buscaEventoId(retornoForm)
      .then((resultado) => funcoesValidacoes.insereStatus(resultado));
  }

  buscaEventoPeloStatus(retornoForm) {
    switch (retornoForm.trim()) {
      case EVENTO_AGENDADO:
        return repositorio.listarEventosAgendados();
      case EVENTO_ANDAMENTO:
        return repositorio.listarEventosEmAndamento();
      case EVENTO_FINALIZADO:
        return repositorio.listarEventosFinalizados();
      default:
        return Promise.reject(`Status inválido: ${retornoForm}`);
    }
  }

  async alterarEvento(id, retornoForm) {
    const dataInicio = moment(
      retornoForm.dataInicio,
      "DD-MM-YYYY",
      true
    ).format("YYYY-MM-DD");
    const dataFim = moment(retornoForm.dataFim, "DD-MM-YYYY", true).format(
      "YYYY-MM-DD"
    );

    const retornoDatado = { ...retornoForm, dataInicio, dataFim };

    const parametros = {
      nomeEvento: retornoDatado.nome.length,
      url: retornoDatado.urlFoto,
      data: retornoDatado,
      existeEventoPUT: { id, retornoForm: retornoDatado.nome },
    };

    const erros = await this.valida(parametros);

    const existemErros = erros.length;

    if (existemErros) {
      return Promise.reject(erros);
    }

    return repositorio.alterarEvento(id, retornoDatado);
  }

  excluirEvento(retornoForm) {
    return repositorio.excluirEvento(retornoForm);
  }
}

module.exports = new Evento();
