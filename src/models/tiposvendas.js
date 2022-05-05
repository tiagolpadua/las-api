const repositorio = require("../repositorios/tiposVendas");

class TiposVendas {
  listar() {
    return repositorio.listar();
  }

  async adicionar(venda) {
    return repositorio.adiciona(venda);
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscarPorId(id) {
    return repositorio.buscaPorId(id);
  }

  buscarPorNome(nome) {
    return repositorio.buscaPorNome(nome);
  }
}

module.exports = new TiposVendas();
