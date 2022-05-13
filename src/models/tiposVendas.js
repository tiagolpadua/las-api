const repositorio = require("../repositorios/tipoVendas");

class tipoVendas {
  listar() {
    return repositorio.listar();
  }
  buscaPorId(id) {
    return repositorio.buscaPorId(id);
  }
  adicionar(tipoVenda) {
    return repositorio.adicionar(tipoVenda);
  }
  alterar(valores, id) {
    return repositorio.alterar(valores, id);
  }
  excluir(id) {
    return repositorio.excluir(id);
  }
}
module.exports = new tipoVendas();
