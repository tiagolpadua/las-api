const repositorio = require("../repositorios/tipoVendas");

class tipoVendas {
  listar() {
    return repositorio.listar();
  }
}
module.exports = new tipoVendas();
