const tiposVendasMock = require("./tiposVendas.json");

class TiposVendas {
    listar() {
        return Promise.resolve(tiposVendasMock);
      }

    buscarPorId(id) {
        return Promise.resolve(tiposVendasMock.find((venda) => venda.id === id));    
      }
         
}

module.exports = new TiposVendas();

