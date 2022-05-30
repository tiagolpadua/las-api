const tiposVendasMock = require("./tiposVendas.json");

class TiposVendas {
    listar() {
        return Promise.resolve(tiposVendasMock);
      }

    buscarPorId(id) {
        return Promise.resolve(tiposVendasMock.find((venda) => venda.id === id));    
      }

    adicionarTiposDeVenda() {
        return Promise.resolve(tiposVendasMock);
    }

    
}

module.exports = new TiposVendas();

