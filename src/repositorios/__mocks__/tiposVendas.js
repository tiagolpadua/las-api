const tipoVendaMock = require("./tiposVendasMock.json");

class TiposVendasRepositorio {
  listar() {
    return Promise.resolve(tipoVendaMock);
  }

  buscarPorId(id) {
    const tipoVenda = tipoVendaMock.find((tipoVenda) => tipoVenda.id === id);
    return tipoVenda ? Promise.resolve([tipoVenda]) : Promise.resolve([]);
  }

  adicionar() {
    return Promise.resolve([]);
  }

  alterar() {
    return Promise.resolve([]);
  }

  excluir() {
    return Promise.resolve([]);
  }
}

module.exports = new TiposVendasRepositorio();
