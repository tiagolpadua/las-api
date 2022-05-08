const repositorio = require("../repositorio/tiposVendas");

class TiposVendas {
  listar() {
    return repositorio.listar();
  }

  adicionar(evento) {
    return repositorio.adicionar(evento);
  }

  buscaPorId(id) {
    return repositorio.buscaPorId(id);
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }
}

module.exports = new TiposVendas();
