const repositorio = require("../repositorios/evento");
const moment = require("moment");

class Eventos{

    listar(){
        return repositorio.listar();
    }

    buscarPorId(id){
        return repositorio.buscarPorId(id);
    }
    async incluir(evento){  
        console.log(evento.status);
        if(!this.validadeStatus(evento.status))  {
            return Promise.reject({error:"Status não é válido"});
        }if(!this.isDatasValidas(evento)){
            return Promise.reject({error:"Data Inválida"});
         } else{
            return repositorio.incluir(evento);
        }
                
    }

    alterar(id, valores) {
        return repositorio.alterar(id, valores);
     }
    
    excluir(id) {
        return repositorio.excluir(id);
      }

     buscaPorStatus(status){
        if(this.validadeStatus(status))  {
            return repositorio.buscaPorStatus(status);
        }else{
            return Promise.reject({error:"Status não é válido"});
        }          
      }    
      
    validadeStatus(status){
          return (status === "agendado" || status === "em-andamento" || status === "finalizado" );
          }         
                    
     isDatasValidas(evento) {
        const dataAtual = moment().format("YYYY-MM-DD");
        return (
          moment(evento.dataInicio).isAfter(dataAtual) &&
          moment(evento.dataFim).isAfter(evento.dataInicio)
        );
      }
 }  
  
module.exports =new Eventos;