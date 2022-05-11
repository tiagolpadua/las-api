const repositorio = require("../repositorios/tipos-vendas");

class tipoVendas {
  listar() {
    return repositorio.listar();
  }
}
module.exports = new tipoVendas();
