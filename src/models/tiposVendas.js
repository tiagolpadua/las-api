const repositorio = require("../repositorios/tiposVendas");

class TiposVendas {
  constructor() {
    this.verificaTamanhoNome = (tamanho) => {
      return tamanho > 4;
    };

    this.valida = (parametros) =>
      this.validacoes.filter((campo) => {
        return !campo.valido(parametros);
      });

    this.validacoes = [
      {
        nome: "nomeTipoVenda",
        valido: this.verificaTamanhoNome,
        mensagem: "tipoVenda deve ter pelo menos cinco caracteres",
      },
    ];
  }

  incluirTipoVenda(retornoForm) {
    // const parametros = {
    //   nometipoVenda: retornoForm.descricao.length,
    // };

    const tamanhoNomeEvento = retornoForm.descricao.length;

    const erros = this.valida(tamanhoNomeEvento);

    const existemErros = erros.length;

    // console.log(retornoForm, existemErros, erros);

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

  alterarTipoVenda(id, retornoForm) {
    // const parametros = {
    //   nomeTipoVenda: retornoForm.descricao.length,
    // };

    const tamanhoNomeEvento = retornoForm.descricao.length;

    const erros = this.valida(tamanhoNomeEvento);

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
