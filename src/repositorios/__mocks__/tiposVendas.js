const tiposVendasMock = require("./tiposVendas.json");

class TiposVendas {
  listarTiposVendas() {
    return Promise.resolve(tiposVendasMock);
  }

  buscarPorIdTiposVendas(id) {
    return Promise.resolve(
      tiposVendasMock.find((tipoVenda) => tipoVenda.id === id)
    );
  }

  incluirTiposVendas(tipoVenda) {
    return Promise.resolve(tipoVenda);
  }

  alterarTiposVendas(id, valores) {
    if (!!id && !!valores) {
      return Promise.resolve({ changedRows: 1 });
    }
  }

  excluirTiposVendas(id) {
    return Promise.resolve(id);
  }
}

module.exports = new TiposVendas();
