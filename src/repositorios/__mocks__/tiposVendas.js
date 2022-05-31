const tiposVendasMock = require("./tiposVenda.json");

class TiposVendas {
  adicionar(tipoVenda){
    return Promise.resolve(tipoVenda && {insertId: 99});
  }

  listar(){
    return Promise.resolve(tiposVendasMock);
  }

  listarPorId(id){
    return Promise.resolve(tiposVendasMock.find((tipoVenda) => tipoVenda.id === id));
  }

  // eslint-disable-next-line no-unused-vars
  alterar(id, dadosAtualizado){
    return Promise.resolve(tiposVendasMock.find((vendas) => vendas.id === id));
  }

  excluir(id){
    return Promise.resolve(tiposVendasMock.find((usuario) => usuario.id === id));
  }
}

module.exports = new TiposVendas();