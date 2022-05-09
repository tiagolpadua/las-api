const repositorio = require("../repositorios/evento");
const moment = require("moment");
const Validacoes = require("../models/validacoes");

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
    const dataEhValida = this.isDatasValidas(evento.dataInicio, evento.dataFim);

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
        mensagem: "",
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

  isDatasValidas({ dataInicio, dataFim }) {
    const dataCriacao = moment().format("YYYY-MM-DD");
    const dataInicioEvento = moment(dataInicio).format("YYYY-MM-DD");
    const dataFimEvento = moment(dataFim).format("YYYY-MM-DD");

    const dataEhValida =
      moment(dataInicioEvento).isSameOrAfter(dataCriacao) &&
      moment(dataFimEvento).isSameOrAfter(dataInicioEvento);

      return dataEhValida;
  }
}

module.exports = new Eventos();
