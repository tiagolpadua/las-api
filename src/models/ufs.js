const repositorio = require("../repositorios/uf");

class Ufs {
  async listar() {
    //    return repositorio.listar();
    const sigla = await repositorio.listar();
    return sigla.map((uf) => uf.sigla);
  }

  async buscarMunicipio(listaUf) {
    //return repositorio.buscarMunicipios(id);

    const listaMunicipio = await repositorio.listar(listaUf);
    return listaMunicipio.map((municipio) => municipio.nome);
  }
}

module.exports = new Ufs();
