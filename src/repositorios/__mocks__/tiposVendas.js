const tiposVendasMock = require("./tiposVendas.json");

class TiposVendas {
    listar() {
        return Promise.resolve(tiposVendasMock);
    }
    buscarPorId(id) {
        return Promise.resolve(tiposVendasMock.find((tiposVendas) => tiposVendas.id === id));
    }
    adicionar(tipoVenda) {
        return Promise.resolve(tipoVenda && { insertId: 99 });
    }
    alterar(valores, id) {
        if (valores.descricao) {
            tiposVendasMock[id - 1].descricao = valores.descricao;
        }
        return Promise.resolve(tiposVendasMock.find((usuario) => usuario.id === id));
    }
    excluir(id) {
        const novaLista = tiposVendasMock.filter((tipoVenda) => tipoVenda.id !== id);
        return Promise.resolve(novaLista);
    }
}

module.exports = new TiposVendas();