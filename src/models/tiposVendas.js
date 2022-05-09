const repositorio = require("../repositorios/tiposVendas");

class TiposVendas{
    listarTiposVendas(){
        return repositorio.listar();
    }
}

module.exports = new TiposVendas();