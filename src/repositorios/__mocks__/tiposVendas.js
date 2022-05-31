// const query = require("../infraestrutura/database/queries");

const tiposVendasMock = require("./tiposVendass");

class TiposVendas {
    listar() {
        return Promise.resolve(tiposVendasMock);
    }

    buscarPorId(id) {
        return Promise.resolve(tiposVendasMock.find((tipoVenda) => tipoVenda.id === id));
    }

    adicionar(tipoVenda) {
        return Promise.resolve(tipoVenda);
    }
    
    // alterar(valores, id) {
    //     return Promise.resolve(tiposVendasMock.find((tipoVenda) => tipoVenda.id === id))
    // }

    excluir(id) {
        return Promise.resolve(tiposVendasMock.find((tipoVenda) => tipoVenda.id === id));
    }
}

module.exports = new TiposVendas();