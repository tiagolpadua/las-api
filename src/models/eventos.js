const fetch = require("node-fetch");
const repositorio = require("../repositorios/eventos");
const moment = require("moment");

class Evento {
  constructor() {
    this.defineStatus = (dataInicio, dataTermino) => {
      const currentDate = moment().format("YYYY-MM-DD");

      const validEvent = moment(currentDate).isSameOrBefore(dataInicio);

      const agendado = moment(dataInicio).isBefore(dataTermino);
      const andamento = moment(currentDate).isSameOrAfter(dataInicio);
      const finalizado = moment(dataTermino).isSameOrBefore(currentDate);

      console.log("data", andamento, "dataInicio", dataInicio);

      if (validEvent) {
        if (andamento) return "em-andamento";
        else if (agendado) return "agendado";
        else if (finalizado) return "finalizado";
      }
    };

    this.dataEhValida = ({ dataInicio }) => {
      const currentDate = moment().format("YYYY-MM-DD");

      const validEvent = moment(currentDate).isSameOrBefore(dataInicio);

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

    this.validarURLFotoPerfil = async (retornoForm) => {
      const validadorUrl =
        /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/gi;
      const urlEhValida = validadorUrl.test(retornoForm);

      if (urlEhValida) {
        const response = await fetch(retornoForm);

        if (response.status === 200) return true;
        else return false;
      }

      return false;
    };

    this.verificaTamanhoNome = async (tamanho) => {
      return tamanho > 4;
    };

    this.valida = async (parametros) => {
      const validacoesComResultado = await Promise.all(
        this.validacoes.map(async (campo) => {
          const { nome } = campo;
          const parametro = parametros[nome];

          if (!parametro) return { ...campo, resultado: !true };

          const resposta = await campo.valido(parametro);

          const novoCampo = { ...campo, resultado: !resposta };

          return novoCampo;
        })
      );

      const verificaErros = validacoesComResultado.filter(
        (campo) => campo.resultado
      );

      return verificaErros;
    };

    this.validacoes = [
      {
        nome: "data",
        valido: this.dataEhValida,
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

    const status = this.defineStatus(dataInicio, dataFim);

    const retornoDatado = { ...retornoForm, dataInicio, dataFim, status };

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

    return repositorio.incluirEvento(retornoDatado).then((results) => results);
  }

  listarEvento() {
    return repositorio.listarEvento().then((resultado) => resultado);
  }

  buscaEventoId(retornoForm) {
    return repositorio
      .buscaEventoId(retornoForm)
      .then((resultado) => resultado);
  }

  buscaEventoPeloStatus(retornoForm) {
    return repositorio
      .buscaEventoPeloStatus(retornoForm)
      .then((resultado) => resultado);
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

    const status = this.defineStatus(dataInicio, dataFim);

    const retornoDatado = { ...retornoForm, dataInicio, dataFim, status };

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
      .then((resultado) => resultado);
  }

  excluirEvento(retornoForm) {
    return repositorio.excluirEvento(retornoForm);
  }
}

module.exports = new Evento();
