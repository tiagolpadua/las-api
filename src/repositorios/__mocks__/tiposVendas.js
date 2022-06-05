const tiposVendasMock = require("./tiposVenda.json");

class TiposVendas {
  listar() {
    return Promise.resolve(tiposVendasMock);
  }
  buscarPorId(id) {
    return Promise.resolve(
      tiposVendasMock.find((tipoVenda) => tipoVenda.id === id)
    );
  }
  incluir(tipoVenda) {
    return Promise.resolve(tipoVenda);
  }
  alterar(id, valores) {
    return Promise.resolve(tiposVendasMock && [valores, id]);
  }
  excluir(id) {
    return Promise.resolve(
      tiposVendasMock.find((tipoVenda) => tipoVenda.id === id)
    );
  }
}

module.exports = new TiposVendas();
