const repositorio = require("../repositorios/tiposVendas");


class TiposVendas{
    listar(){
        return repositorio.listar();
    }
    buscarPorId(id) {   
        return repositorio.buscarPorId(id)
        .then(resultados => resultados[0]);
    }
    adicionar(tipoVenda){
        return repositorio.adicionar(tipoVenda);
    }
    alterar(valores, id) {
        return repositorio.alterar(valores, id);
    }
    excluir(id) {
        return repositorio.excluir(id);
    }
}

module.exports = new TiposVendas();