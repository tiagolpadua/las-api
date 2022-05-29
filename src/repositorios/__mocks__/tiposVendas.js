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

  //   alterarTiposVendas(id, valores) {
  //     const sql = "UPDATE tiposVendas SET ? WHERE id = ?";
  //     return query(sql, [valores, id]);
  //   }

  //   excluirTiposVendas(id) {
  //     const sql = "DELETE FROM tiposVendas WHERE id = ?";
  //     return query(sql, id);
  //   }
}

module.exports = new TiposVendas();
