const tiposVendasMock = require("./tiposVendas.json");

class TiposVendas {
    listar() {
        return Promise.resolve(tiposVendasMock);
      }

    buscarPorId(id) {
        return Promise.resolve(tiposVendasMock.find((venda) => venda.id === id));    
      }
      
      alterar(valores, id) {
        const venda = tiposVendasMock.find((venda) => venda.id === id);
        venda.descricao = valores.descricao;
        return Promise.resolve(venda);
      }

      excluir(id) {
        const vendasFiltradas = tiposVendasMock.filter((venda) => venda.id !== id);
        return Promise.resolve(vendasFiltradas);
      }
}

module.exports = new TiposVendas();

