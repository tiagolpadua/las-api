const tiposVendasMockados = require("./dados_mockados/tiposVendasMockados.json");

class TiposVendas {
  listar() {
    return Promise.resolve(tiposVendasMockados);
  }

  adicionar(tipoVenda) {
    return Promise.resolve(tipoVenda && { insertId: 99 });
  }

  buscaPorId(id) {
    return tiposVendasMockados[id - 1]
      ? Promise.resolve(tiposVendasMockados[id - 1])
      : Promise.reject();
  }

  alterar(id, tipoVendaAtualizada) {
    return id && tipoVendaAtualizada && tiposVendasMockados[id - 1]
      ? Promise.resolve({ affectedRows: 1 })
      : Promise.resolve({ affectedRows: 0 });
  }

  excluir(id) {
    return id <= tiposVendasMockados.length
      ? Promise.resolve({ affectedRows: 1 })
      : Promise.resolve({ affectedRows: 0 });
  }
}

module.exports = new TiposVendas();
