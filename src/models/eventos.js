const repositorio = require("../repositorios/evento");
const moment = require("moment");
const dataAtual = moment().format("YYYY-MM-DD");

class Eventos{

    async listar(){
        const eventosListados = await repositorio.listar();
            const eventosComStatus = eventosListados.map (event => {
                return {...event , status:this.dataStatus(event)};
            });

            return eventosComStatus;
        }       
          
    async buscarPorId(id){
        const eventosListadoID = await repositorio.buscarPorId(id);
            const eventosComStatus = eventosListadoID.map (event => {
                return {...event , status:this.dataStatus(event)};
            });

            return eventosComStatus;
    }

    async incluir(evento){  
         if(!this.isDatasValidas(evento)){
            return Promise.reject("Data Inválida");
         } else{
             const eventoAdicionado = await repositorio.incluir(evento);
             const eventoStatus = this.dataStatus(evento);
             return {...eventoAdicionado, status: eventoStatus};
        }
                
    }

    alterar(id, valores) {
        return repositorio.alterar(id, valores);
     }
    
    excluir(id) {
        return repositorio.excluir(id);
      }

     async buscaPorStatus(status){
        if(!this.validadeStatus(status))  {
            return Promise.reject("Status não é válido");            
        }else{
            const eventosProcurados = await repositorio.buscaPorStatus(status);
            const eventosComStatus = eventosProcurados.map (event => {
                return {...event , status:this.dataStatus(event)};
            });

            return eventosComStatus;
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

     dataStatus(evento) {
        const dataFim = moment(evento.dataFim, "YYYY-MM-DD");
        const dataInicio = moment(evento.dataInicio, "YYYY-MM-DD");
    
        let status;
        if (moment(dataAtual).isBefore(dataInicio)) {
            status = "agendado";
         }
        if (moment(dataAtual).isBetween(dataFim, dataInicio)) {
          status = "em-andamento";
        }
        if (moment(dataAtual).isAfter(dataFim)) {
          status = "finalizado";
        }       
        return status;        
      }
    
 }  
  
module.exports =new Eventos;