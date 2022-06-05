const repositorio = require("../repositorios/tiposVendas");

class TiposVendas {
  listar() {
    return repositorio.listar();
  }
  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }
  incluir(tipoVenda) {
    return repositorio.incluir(tipoVenda);
  }
  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }
  excluir(id) {
    return repositorio.excluir(id);
  }
}

module.exports = new TiposVendas();
