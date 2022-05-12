const repositorio = require("../repositorios/tiposVendas");
const funcoesValidacoes = require("../validacoes/validacoes");
const ListaValidacoes = require("../validacoes/listaValidacoes");

class TiposVendas {
  constructor() {
    this.valida = funcoesValidacoes.valida;

    this.validacoes = ListaValidacoes;
  }

  async incluirTipoVenda(retornoForm) {
    const parametros = {
      nomeTipoVenda: retornoForm.descricao.length,
      existeVenda: retornoForm.descricao,
    };

    const erros = await this.valida(parametros);

    console.log(erros);
    const existemErros = erros.length;

    if (existemErros) {
      return new Promise((resolve, reject) => reject(erros));
    }

    return repositorio.incluirTipoVenda(retornoForm).then((results) => results);
  }

  listarTipoVenda() {
    return repositorio.listarTipoVenda().then((resultado) => resultado);
  }

  buscaTipoVendaId(retornoForm) {
    return repositorio
      .buscaTipoVendaId(retornoForm)
      .then((resultado) => resultado);
  }

  buscaTipoVendaPeloNome(retornoForm) {
    return repositorio
      .buscaTipoVendaPeloNome(retornoForm)
      .then((resultado) => resultado);
  }

  async alterarTipoVenda(id, retornoForm) {
    // const parametros = {
    //   nomeTipoVenda: retornoForm.descricao.length,
    // };

    const tamanhoNomeEvento = retornoForm.descricao.length;

    const erros = await this.valida(tamanhoNomeEvento);

    const existemErros = erros.length;

    if (existemErros) {
      return new Promise((resolve, reject) => reject(erros));
    }

    return repositorio
      .alterarTipoVenda(id, retornoForm)
      .then((resultado) => resultado);
  }

  excluirTipoVenda(retornoForm) {
    return repositorio.excluirTipoVenda(retornoForm);
  }
}

module.exports = new TiposVendas();
