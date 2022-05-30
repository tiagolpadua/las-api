const repositorio = require("../repositorios/uf");

class Ufs {
  async listar() {
    //    return repositorio.listar();
    return repositorio.listar();
  }

  async buscarMunicipio(listaUf) {
    // return repositorio.buscarMunicipios(listaUf);

    const listaMunicipio = await repositorio.buscarMunicipio(listaUf);
    return listaMunicipio.map((municipio) => municipio.nome);
  }
}

module.exports = new Ufs();
