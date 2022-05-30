const repositorio = require("../repositorios/uf");

class Ufs {
    listar() {
      return repositorio.listar();
  }

  async buscarMunicipiosPorUf(uf, res) {
    return repositorio.buscarMunicipiosPorUf(uf, res);
    // const municipios = await repositorio.buscarMunicipiosPorUf(uf);
    // return municipios.map((municipio) => municipio.nome);
  }
}

module.exports = new Ufs();
