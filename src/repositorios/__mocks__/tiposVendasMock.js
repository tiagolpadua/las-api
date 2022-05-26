const tiposVendasMock = require("./mockTiposVendas.json");

class TiposVendas {
  listar() {
    return Promise.resolve(tiposVendasMock);
  }
  adicionar(venda) {
    return Promise.resolve(venda && { insertId: 3 });
  }
  alterar(id) {
    return Promise.resolve(tiposVendasMock.find((usuario) => usuario.id == id));
  }
  excluir(id) {
    return Promise.resolve(tiposVendasMock.find((usuario) => usuario.id == id));
  }
  buscaPorId(id) {
    return Promise.resolve(
      tiposVendasMock.find((usuario) => usuario.id === id)
    );
  }
}

module.exports = new TiposVendas();
