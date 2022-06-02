const repositorio = require("../repositorio/ufs");

class Ufs {
  async listar() {
    const ufs = await repositorio.listar();
    return ufs.map((uf) => uf.sigla);
  }

  async buscarMunicipiosPorUf(uf) {
    const municipios = await repositorio.buscarMunicipiosPorUf(uf);
    if (!municipios.length) {
      return municipios;
    }
    return municipios.map((municipio) => municipio.nome);
  }
}

module.exports = new Ufs();
