const tiposVendasMock = require("../__mocks__/dados-mockados/tipos-vendas.json");

class TipoVenda {
  listar() {
    return Promise.resolve(tiposVendasMock);
  }

  buscaPorId(id) {
    return Promise.resolve(
        tiposVendasMock.find((tiposVendas) => tiposVendas.id === id)
    );
  }

  adicionar(tiposVendasMock) {
    return Promise.resolve(tiposVendasMock && { insertId: 4 });
  }

  alterar(id, valores) {
    return Promise.resolve(tiposVendasMock && [valores, id]);
  }

  excluir(id) {
    return Promise.resolve(tiposVendasMock && id);
  }
}
module.exports = new TipoVenda();
