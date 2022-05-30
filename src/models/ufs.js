const repositorio = require("../repositorios/ufs");

class TiposVendas {
  listar() {
    return repositorio.listar();
  }
}

module.exports = new TiposVendas();
