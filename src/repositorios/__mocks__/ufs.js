const ufsMock = require("./ufs.json");
const municipiosMock = require("./municipios.json");

class UFs {
    listar() {
        return Promise.resolve(ufsMock);
    }
    listarMunicipios(uf) {
        if (uf) {
            return Promise.resolve(municipiosMock);
        }
    }
}

module.exports = new UFs();