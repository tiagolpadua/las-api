const repositorio = require("../repositorios/tiposVendas");

class TiposVendas {
  listar() {
    return repositorio.listarTiposVendas().then((resultados) => resultados);
  }
}

module.exports = new TiposVendas();
