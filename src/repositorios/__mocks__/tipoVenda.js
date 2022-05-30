const tiposVendasMock = require("../../../dados-mock/tiposVendas.json");

class TipoVenda {
  adicionar(tipoVenda) {
    return Promise.resolve(tipoVenda && { insertId: 4 });
  }

  listar() {
    return Promise.resolve(tiposVendasMock);
  }

  buscarPorId(id) {
    return Promise.resolve(
      tiposVendasMock.find((tipoVenda) => tipoVenda.id === id)
    );
  }

  alterar(id) {
    return Promise.resolve(tiposVendasMock[0] && { ...id });
  }

  excluir(id) {
    return Promise.resolve(
      tiposVendasMock.find((tipoVenda) => tipoVenda.id == id)
    );
  }
}

module.exports = new TipoVenda();
