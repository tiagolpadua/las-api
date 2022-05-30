const tiposVendasMock = require("./mockTiposVendas.json");

class TiposVendas {
  listar() {
    return Promise.resolve(tiposVendasMock);
  }
  adicionar(venda) {
    return Promise.resolve(venda && { insertId: 99 });
  }
  alterar(id, venda) {
    return id && venda && tiposVendasMock[id - 1]
      ? Promise.resolve()
      : Promise.reject();
  }
  excluir(id) {
    return Promise.resolve(tiposVendasMock.find((usuario) => usuario.id == id));
  }
  buscaPorId(id) {
    return tiposVendasMock[id - 1]
      ? Promise.resolve(tiposVendasMock[id - 1])
      : Promise.reject();
  }
}

module.exports = new TiposVendas();
