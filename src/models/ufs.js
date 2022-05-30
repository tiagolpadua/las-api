const repositorio = require("../repositorios/ufs");

class UFs {
  listar() {
    return repositorio.listar();
  }
}
module.exports = new UFs();