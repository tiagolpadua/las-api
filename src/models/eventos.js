const repositorio =require("../repositorios/eventos");

class Eventos{
    listar(){
        return repositorio.listar();
    }

    buscarPorId(id){
        return repositorio.buscarPorId(id);
    }

    adicionar(evento) {
        return repositorio.adicionar(evento);
    }

    alterar(id, valores) {
        return repositorio.alterar(id, valores);
    }
    
    excluir(id) {
        return repositorio.excluir(id);
    }
}
module.exports = Eventos;