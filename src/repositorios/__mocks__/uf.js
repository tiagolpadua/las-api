const ufsMock = require("../../../dados-mock/uf.json");

class TipoVenda {
  listar() {
    return Promise.resolve(ufsMock);
  }
}

module.exports = new TipoVenda();
