const repositorio = require("../repositorios/evento");

class Eventos {
  listar() {
    return repositorio.listar();
  }
}
module.exports = new Eventos();
