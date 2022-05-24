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
      return Promise.reject(erros);
    }

    return repositorio.incluirTipoVenda(retornoForm).then((results) => results);
  }

  listarTipoVenda() {
    return repositorio.listarTipoVenda();
  }

  buscaTipoVendaId(retornoForm) {
    return repositorio.buscaTipoVendaId(retornoForm);
  }

  buscaTipoVendaPeloNome(retornoForm) {
    return repositorio.buscaTipoVendaPeloNome(retornoForm);
  }

  async alterarTipoVenda(id, retornoForm) {
    const parametros = {
      nomeTipoVenda: retornoForm.descricao.length,
    };

    const erros = await this.valida(parametros);

    console.log("tipo venda erros", erros);

    const existemErros = erros.length;

    if (existemErros) {
      return Promise.reject(erros);
    }

    return repositorio.alterarTipoVenda(id, retornoForm);
  }

  excluirTipoVenda(retornoForm) {
    return repositorio.excluirTipoVenda(retornoForm);
  }
}

module.exports = new TiposVendas();
