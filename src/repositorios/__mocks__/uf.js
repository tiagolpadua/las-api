const ufMock = require("./ufs");
const municipioMock = require("./municipios");

class UF{
    listar(){
        return Promise.resolve(ufMock);
    }

    buscarPorMunicipio(uf){
        return Promise.resolve(municipioMock.filter((municipio) => municipio.UF === uf).map((nomeMunicipio) => nomeMunicipio.nome));
    }
}
module.exports = new UF();