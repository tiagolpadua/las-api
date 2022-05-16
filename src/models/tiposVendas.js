const repositorio = require("../repositorios/tipoVenda");
//const moment = require("moment");

class TiposVendas {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(tipoVenda) {
    return repositorio.adicionar(tipoVenda);
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }
}

module.exports = new TiposVendas();
