const vendasMock = require("./tipoVendasMock.json");

class TipoVendasRepositorio {
  listar() {
    return Promise.resolve(vendasMock);
  }
  buscaPorId(id) {
    return Promise.resolve(vendasMock.find((venda) => venda.id === id));
  }
  adicionar(tipoVenda) {
    return Promise.resolve({id: 3, ...tipoVenda});
  }
  alterar(valores, id) {
    const venda = vendasMock.find((venda) => venda.id === id);
    venda.descricao = valores.descricao;
    return Promise.resolve(venda);
  }
  excluir(id) {
    const vendasFiltradas = vendasMock.filter((venda) => venda.id !== id);
    return Promise.resolve(vendasFiltradas);
  }
}

module.exports = new TipoVendasRepositorio();
