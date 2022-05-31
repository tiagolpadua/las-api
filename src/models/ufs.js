const repositorio = require("../repositorios/ufs");

class UFs {
    listar() {
        return repositorio.listar();
    }

    adicionar(uf) {
        return repositorio.adicionar(uf);
    }
}

module.exports = new UFs();