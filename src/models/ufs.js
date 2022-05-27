const repositorio = require("../repositorios/ufs");

class UFs {
    listar() {
        return repositorio.listar();
    }
    listarMunicipios(uf) {
        return repositorio.listarMunicipios(uf);
    }
}

module.exports = new UFs();