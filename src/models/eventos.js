// const fetch = require("node-fetch");
const repositorio = require("../repositorios/eventos");
const moment = require("moment");
const funcoesValidacoes = require("../validacoes/validacoes");

class Evento {
  constructor() {
    this.exibeStatus = ({ dataInicio, dataFim }) => {
      const currentDate = moment().format("YYYY-MM-DD");

      const validEvent = moment(currentDate).isSameOrBefore(dataInicio);

      const agendado = moment(dataInicio).isBefore(dataFim);
      const andamento = moment(currentDate).isSameOrAfter(dataInicio);
      // const finalizado = moment(dataFim).isSameOrBefore(currentDate);

      console.log("data", andamento, "dataInicio", dataInicio);

      if (validEvent) {
        if (andamento) return "em-andamento";
        else if (agendado) return "agendado";
        else return "finalizado";
        // else if (finalizado) return "finalizado";
      }
      // return false;
      return "finalizado";
    };

    this.isDatasValidas = ({ dataInicio, dataFim }) => {
      const currentDate = moment().format("YYYY-MM-DD");

      const validEvent =
        moment(currentDate).isSameOrBefore(dataInicio) &&
        moment(dataInicio).isSameOrBefore(dataFim);

      if (validEvent) return true;
      else return false;
    };

    this.validaSeNomeFoiUtilizado = async (retornoForm) => {
      const existeEvento = await repositorio.validarNomeEventoNaoUtilizado(
        retornoForm
      );
      if (existeEvento[0]?.nome === retornoForm.trim()) return !true;

      return !false;
    };

    this.validarNomeEventoNaoUtilizadoPUT = async ({ id, retornoForm }) => {
      const existeEvento = await repositorio.validarNomeEventoNaoUtilizadoPUT(
        id,
        retornoForm
      );

      if (existeEvento[0]?.nome === retornoForm.trim()) return !true;

      return !false;
    };

    this.validarURLFotoPerfil = funcoesValidacoes.validarURLFotoPerfil;

    this.verificaTamanhoNome = funcoesValidacoes.verificaTamanhoNome;

    this.valida = funcoesValidacoes.valida;

    this.validacoes = [
      {
        nome: "data",
        valido: this.isDatasValidas,
        mensagem: "Data inválida!",
      },
      {
        nome: "url",
        valido: this.validarURLFotoPerfil,
        mensagem: "URL inválida!",
      },
      {
        nome: "nomeEvento",
        valido: this.verificaTamanhoNome,
        mensagem: "Evento deve ter pelo menos cinco caracteres",
      },
      {
        nome: "existeEvento",
        valido: this.validaSeNomeFoiUtilizado,
        mensagem: "Evento já existe na base de dados",
      },
      {
        nome: "existeEventoPUT",
        valido: this.validarNomeEventoNaoUtilizadoPUT,
        mensagem: "Evento já existe na base de dados",
      },
    ];
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
