const repositorio = require("../repositorios/evento");
const moment = require("moment");
const Validacoes = require("../infraestrutura/validacoes");

class Eventos {
  listar() {
    return repositorio.listar();
  }

  buscaPorId(id) {
    return repositorio.buscaPorId(id);
  }

  async adicionar(evento) {
    const eventoEhValido = evento.nome.length > 4;
    const descricaoEhValida = evento.descricao.length > 4;
    const urlEhValida = await Validacoes.validarUrl(evento.urlFoto);
    const dataEhValida = this.isDatasValidas(evento);

    const validacoes = [
      {
        nome: "nome",
        valido: eventoEhValido,
        mensagem:
          "Nome do Evento deve ser informado, e possuir no mínimo 5 caracteres",
      },
      {
        nome: "descricao",
        valido: descricaoEhValida,
        mensagem:
          "Uma descrição deve ser informada, e possuir no mínimo 5 caracteres",
      },
      {
        nome: "urlFoto",
        valido: urlEhValida,
        mensagem: "URL deve ser válida",
      },
      {
        nome: "datas",
        valido: dataEhValida,
        mensagem: "As datas informadas devem ser válidas.",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      return Promise.reject(erros);
    } else {
      return repositorio.adicionar(evento).then((resultado) => {
        const id = resultado.insertId;
        return { ...evento, id };
      });
    }
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscaPorStatus(status) {
    return repositorio.buscaPorStatus(status);
  }

  isDatasValidas(evento) {
    let datasSaoValidas = false;

    if (evento.dataInicio && evento.dataFim) {
      const dataInicio = moment(evento.dataInicio).format("YYYY-MM-DD");
      const dataFim = moment(evento.dataFim).format("YYYY-MM-DD");
      const hoje = moment().format("YYYY-MM-DD");

      datasSaoValidas =
        moment(dataInicio).isAfter(hoje) && moment(dataFim).isAfter(dataInicio);
      return datasSaoValidas;
    }
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
        throw new Error(`Status Inválido: ${status}`);
    }
  }
}

module.exports = new Eventos();
