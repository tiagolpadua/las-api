const repositorio = require("../repositorios/eventos");

class Eventos{
    listar(){
        return repositorio.listar();
    }
    buscarPorId(id) {   
        return repositorio.buscarPorId(id)
        .then(resultados => resultados[0]);
    }
    alterar(valores, id) {
        return repositorio.alterar(valores, id);
    }
    excluir(id) {
        return repositorio.excluir(id);
    }
}

module.exports = new Eventos();