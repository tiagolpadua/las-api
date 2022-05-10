const repositorio = require("../repositorios/tiposVendas");

class TiposVendas {
  listar() {
    return repositorio.listarTiposVendas().then((resultados) => resultados);
  }

  buscarPorId(id) {
    return repositorio
      .buscarPorIdTiposVendas(id)
      .then((tipoVenda) => tipoVenda);
  }

  incluir(tipoVenda) {
    return repositorio
      .incluirTiposVendas(tipoVenda)
      .then((tipoVenda) => tipoVenda);
  }

  alterar(id, valores) {
    return repositorio
      .alterarTiposVendas(id, valores)
      .then((tipoVenda) => tipoVenda);
  }

  excluir(id) {
    return repositorio.excluirTiposVendas(id);
  }
}

module.exports = new TiposVendas();
