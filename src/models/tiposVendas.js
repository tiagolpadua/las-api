const repositorio = require("../repositorios/tiposVendas");

class TiposVendas {
  listar() {
    return repositorio.listarTiposVendas().then((resultados) => resultados);
  }

  incluir(TiposVendas) {
    return repositorio.incluirTiposVendas(TiposVendas).then((TiposVendas) => TiposVendas);
  }

  alterar(id, valores) {
    return repositorio.alterarTiposVendas(id, valores).then((TiposVendas) => TiposVendas);
  }

  excluir(id) {
    return repositorio.excluirTiposVendas(id);
  }
}

module.exports = new TiposVendas();
