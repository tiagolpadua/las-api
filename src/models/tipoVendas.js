const repositorio = require("../repositorios/tipoVendas");

class TiposVendas{
    listar(){
        return repositorio.listar();
    }
}
module.exports = TiposVendas;