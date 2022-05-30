const repositorio = require("../repositorios/UF");

class UFs {
  listar() {
    return repositorio.listar();
  }
}
module.exports = new UFs();
