const repositorio =require("../repositorios/eventos");

class Eventos{
    listar(){
        return repositorio.listar();
    }

    buscarPorId(id){
        return repositorio.buscarPorId(id);
    }
}
module.exports = Eventos;