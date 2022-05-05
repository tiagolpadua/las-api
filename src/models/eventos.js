const repositorio = require("../repositorio/evento");

class Eventos {
  listar() {
    return repositorio.listar();
  }
}

module.exports = new Eventos();
