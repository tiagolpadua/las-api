const repositorio = require("../repositorios/uf");

class Ufs {
  async listar() {
    //    return repositorio.listar();
    return repositorio.listar();
  }
}

module.exports = new Ufs();
