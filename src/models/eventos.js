// const fetch = require("node-fetch");
const repositorio = require("../repositorios/eventos");
const moment = require("moment");
const funcoesValidacoes = require("../validacoes/validacoes");
const listaValidacoes = require("../validacoes/listaValidacoes");

class Evento {
  constructor() {
    this.exibeStatus = funcoesValidacoes.exibeStatus;

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

    // const status = this.isDatasValidas({ dataInicio, dataFim });

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

    return repositorio.incluirEvento(retornoDatado).then((results) => {
      const { dataInicio, dataFim } = retornoDatado;
      const status = this.exibeStatus({ dataInicio, dataFim });

      console.log(results);
      return { results, ...retornoDatado, status };
    });
  }

  listarEvento() {
    return repositorio.listarEvento().then((resultado) =>
      resultado.map((item) => {
        const { dataInicio, dataFim } = item;
        const status = this.exibeStatus({ dataInicio, dataFim });

        return { ...item, status };
      })
    );
  }

  buscaEventoId(retornoForm) {
    return repositorio.buscaEventoId(retornoForm).then((resultado) => {
      const { dataInicio, dataFim } = resultado[0];
      const status = this.exibeStatus({ dataInicio, dataFim });

      const retornoConsulta = resultado ? [{ resultado, status }] : [];

      return retornoConsulta;
    });
  }

  buscaEventoPeloStatus(retornoForm) {
    switch (retornoForm.trim()) {
      case "agendado":
        return repositorio.listarEventosAgendados();
      case "em-andamento":
        return repositorio.listarEventosEmAndamento();
      case "finalizado":
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

    return repositorio.alterarEvento(id, retornoDatado).then((resultado) => {
      const { dataInicio, dataFim } = retornoDatado;
      const status = this.exibeStatus({ dataInicio, dataFim });

      console.log(resultado);
      return { ...retornoDatado, status };
    });
  }

  excluirEvento(retornoForm) {
    return repositorio
      .excluirEvento(retornoForm)
      .then((resultado) => resultado);
  }
}

module.exports = new Evento();
