const repositorio = require("../repositorios/tiposVenda");

class TiposVendas{
    //ok
    listar(){
        return repositorio.listar();
    }

    //ok
    adicionar(evento) {
        return repositorio.adicionar(evento);
    }
    
    //ok
    buscaPorId(id) {
        return repositorio.buscaPorId(id);
    }
    
    //ok
    alterar(id, valores) {
        return repositorio.alterar(id, valores);
    }
    
    //ok
    excluir(id) {
        return repositorio.excluir(id);
    }
}
module.exports = new TiposVendas();