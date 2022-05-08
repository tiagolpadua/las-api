const repositorio = require("../repositorios/tipoVenda");

class TiposVendas{
    listar(){
        return repositorio.listar();
    }
    buscarPorId(id){
        return repositorio.buscarPorId(id);
    }
    incluir(evento){
        return repositorio.incluir(evento);
    }
    alterar(id, valores) {
        return repositorio.alterar(id, valores);
      }
    
      excluir(id) {
        return repositorio.excluir(id);
      }

}

module.exports =new TiposVendas;