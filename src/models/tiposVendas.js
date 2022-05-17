const repositorio = require("../repositorios/tiposVendas");

class TiposVendas {
  listar() {
    return repositorio.listar();
  }
  buscaPorId(id) {
    return repositorio.buscaPorId(id);
  }
  incluir(TipoDeVenda) {
    return repositorio.incluir(TipoDeVenda);
  }
  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }
  excluir(id) {
    return repositorio.excluir(id);
  }
}

module.exports = new TiposVendas();
