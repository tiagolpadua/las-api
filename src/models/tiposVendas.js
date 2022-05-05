const repositorio = require("../repositorio/tiposVendas");

class TiposVendas {
  listar() {
    return repositorio.listar();
  }
}

module.exports = new TiposVendas();
