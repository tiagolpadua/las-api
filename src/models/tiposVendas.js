const repositorio = require("../repositorio/tiposVendas");

class TiposVendas {
  listar() {
    return repositorio.listar();
  }

  async adicionar(evento) {
    const resp = await repositorio.adicionar(evento);
    return { id: resp.insertId, ...evento };
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
