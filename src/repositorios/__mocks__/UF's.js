const ufsMock = require("./UFsTratadas.json");

class UFs {
  listar() {
    return Promise.resolve(ufsMock);
  }

  buscaCidade(cidade) {
    return Promise.resolve((ufsMock.cidade = { cidade }));
  }

  buscaSigla(sigla) {
    return Promise.resolve((ufsMock.sigla = { sigla }));
  }
}

module.exports = new UFs();
