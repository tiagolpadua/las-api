const repositorio = require("../repositorios/tiposVendas");


class TiposVendas {
    listar() {
        return repositorio.listar();
    }
    buscarPorId(id) {
        return repositorio.buscarPorId(id);
    }
    async adicionar(tipoVenda) {
        const resp = await repositorio.adicionar(tipoVenda);
        return { id: resp.insertId, ...tipoVenda };
    }
    alterar(valores, id) {
        return repositorio.alterar(valores, id);
    }
    excluir(id) {
        return repositorio.excluir(id);
    }
}

module.exports = new TiposVendas();