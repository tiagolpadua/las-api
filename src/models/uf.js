const repositorio = require("../repositorios/uf");

class UF{
    listar() {
        return repositorio.listar();
    }

    buscarPorMunicipio(uf, res) {
        return repositorio.buscarPorMunicipio(uf, res);
    }
}
module.exports = new UF();