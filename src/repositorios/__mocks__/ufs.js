const ufMock = require("./uf.json");
const municipioMock = require("./municipio.json");

class UFs {
  listar(){
    return Promise.resolve(ufMock);
  }

  listarMunicipiosPorUf(uf){
    if(uf.toUpperCase() === "RR"){
      return Promise.resolve(municipioMock);
    }
    return Promise.reject();
  }
}

module.exports = new UFs();