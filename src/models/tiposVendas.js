const repositorio = require("../repositorios/tiposVendas");  

class TiposVendas{
  adicionar(tipoVenda){
    return repositorio.adicionar(tipoVenda);
  }

  listar(){
    return repositorio.listar();
  }

  listarPorId(id){
    return repositorio.listarPorId(id);
  }

  alterar(id, dadosAtualizados){
    return repositorio.alterar(id, dadosAtualizados);
  }

  excluir(id){
    return repositorio.excluir(id);
  }
}

module.exports = new TiposVendas();