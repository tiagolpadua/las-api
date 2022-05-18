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

    if (existemErros) {
      return new Promise((resolve, reject) => reject(erros));
    }

    return repositorio
      .incluirEvento(retornoDatado)
      .then((results) => funcoesValidacoes.insereStatus(results));
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
      .then((resultado) => funcoesValidacoes.insereStatus(resultado[0]));
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
        throw new Error(`Status inválido: ${retornoForm}`);
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

    // const status = this.isDatasValidas({ dataInicio, dataFim });

    const retornoDatado = { ...retornoForm, dataInicio, dataFim };

    const parametros = {
      nomeEvento: retornoDatado.nome.length,
      // existeEvento: retornoDatado.nome,
      url: retornoDatado.urlFoto,
      data: retornoDatado,
      existeEventoPUT: { id, retornoForm: retornoDatado.nome },
    };

    const erros = await this.valida(parametros);

    const existemErros = erros.length;

    if (existemErros) {
      return new Promise((resolve, reject) => reject(erros));
    }

    return repositorio
      .alterarEvento(id, retornoDatado)
      .then((resultado) => funcoesValidacoes.insereStatus(resultado));
  }

  excluirEvento(retornoForm) {
    return repositorio.excluirEvento(retornoForm);
  }
}

module.exports = new Evento();
