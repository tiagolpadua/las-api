const repositorioUsuario = require("../repositorios/usuarios");
const repositorioTipoVenda = require("../repositorios/tiposVendas");
const repositorioEventos = require("../repositorios/eventos");
const fetch = require("node-fetch");
const moment = require("moment");
const validadorCPF = require("cpf-cnpj-validator");

const EVENTO_AGENDADO = "agendado";
const EVENTO_ANDAMENTO = "em-andamento";
const EVENTO_FINALIZADO = "finalizado";

class Validacao {
  async validarURLFotoPerfil(retornoForm) {
    const validadorUrl =
      /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;
    const urlEhValida = validadorUrl.test(retornoForm);

    if (urlEhValida) {
      const response = await fetch(retornoForm);

      return response.status === 200;
    }

    return false;
  }

  verificaTamanhoNome(tamanho) {
    if (tamanho === undefined) return true;
    return tamanho > 4;
  }

  //Validacoes Usuarios

  async validarNomeUsuarioNaoUtilizadoPUT({ id, retornoForm }) {
    const existeUsuarioPUT =
      await repositorioUsuario.validarNomeUsuarioNaoUtilizadoPUT(
        id,
        retornoForm
      );

    return existeUsuarioPUT[0]?.nome !== retornoForm.trim();
  }

  async validaSeNomeFoiUtilizado(retornoForm) {
    const existeUsuario =
      await repositorioUsuario.validarNomeUsuarioNaoUtilizado(retornoForm);

    return existeUsuario[0]?.nome !== retornoForm?.trim();
  }

  // fim validacao usuarios

  //Validacoes Tipo vendas

  async validaSeDescricaoFoiUtilizado(retornoForm) {
    const existeUsuario =
      await repositorioTipoVenda.validarNomeVendasNaoUtilizado(retornoForm);

    return existeUsuario[0]?.descricao !== retornoForm.trim();
  }

  // fim validacao Tipo vendas

  //Validacoes Eventos

  async validaSeNomeEventoFoiUtilizado(retornoForm) {
    const existeEvento = await repositorioEventos.validarNomeEventoNaoUtilizado(
      retornoForm
    );

    return existeEvento[0]?.nome !== retornoForm?.trim();
  }

  async validarNomeEventoNaoUtilizadoPUT({ id, retornoForm }) {
    const existeEvento =
      await repositorioEventos.validaNomeEventoNaoUtilizadoPUT(id, retornoForm);

    return existeEvento[0]?.nome !== retornoForm.trim();
  }

  isDatasValidas({ dataInicio, dataFim }) {
    const currentDate = moment().format("YYYY-MM-DD");

    return (
      moment(currentDate).isSameOrBefore(dataInicio) &&
      moment(dataInicio).isSameOrBefore(dataFim)
    );
  }

  insereStatus(evento) {
    const status = this.exibeStatus(evento);

    return { ...evento, status };
  }

  exibeStatus(evento) {
    const dataInicio = moment(evento.dataInicio);
    const dataFim = moment(evento.dataFim);

    const currentDate = moment();

    if (dataInicio.isAfter(currentDate)) {
      return EVENTO_AGENDADO;
    } else if (
      dataInicio.isSameOrBefore(currentDate) &&
      dataFim.isSameOrAfter(currentDate)
    ) {
      return EVENTO_ANDAMENTO;
    } else if (dataFim.isBefore(currentDate)) {
      return EVENTO_FINALIZADO;
    }

    return undefined;
  }

  // fim validacao Eventos

  // Validacoes Dados Pessoais

  validaCPF(cpf) {
    return validadorCPF.cpf.isValid(cpf);
  }

  // fim Validacoes Dados Pessoais

  // validação UF

  validaUF(UF) {
    const UFs = [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ];

    return UFs.includes(UF);
  }

  // fim validação UF

  async valida(parametros) {
    const validacoesComResultado = await Promise.all(
      this.validacoes.map(async (campo) => {
        const { nome } = campo;
        const parametro = parametros[nome];

        if (!(nome in parametros)) return { ...campo, resultado: false };

        const resposta = await campo.valido(parametro);

        return { ...campo, resultado: !resposta };
      })
    );

    return validacoesComResultado.filter((campo) => campo.resultado);
  }
}

module.exports = new Validacao();
