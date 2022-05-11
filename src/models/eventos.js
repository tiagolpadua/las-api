const repositorio = require("../repositorios/evento");
const moment = require("moment");
const {EM_ANDAMENTO, AGENDADO, FINALIZADO} = require ("../enums/eventoStatus");


class Eventos{

    async listar(){
      const eventosListados = await repositorio.listar();
      return this.listarStatus(eventosListados);
     }
        
    async buscarPorId(id){
        const eventosListadoID = await repositorio.buscarPorId(id);
            return this.listarStatus(eventosListadoID);
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
            return this.listarStatus(eventosProcurados);
        }
      }

     listarStatus(eventos){
      return eventos.map( (event) =>{
        return {...event, status: this.dataStatus(event)};
     });           
      }    
      
    validadeStatus(status){
         return [AGENDADO, FINALIZADO, EM_ANDAMENTO].includes(status);
      }         
                    
     isDatasValidas(evento) {
        const dataAtual = moment().format("YYYY-MM-DD");
        return (
          moment(evento.dataInicio).isAfter(dataAtual) &&
          moment(evento.dataFim).isAfter(evento.dataInicio)
        );
      }

     dataStatus(evento) {
        const dataAtual = moment().format("YYYY-MM-DD");
        const dataFim = moment(evento.dataFim, "YYYY-MM-DD");
        const dataInicio = moment(evento.dataInicio, "YYYY-MM-DD");
    
        let status;
        if (moment(dataAtual).isBefore(dataInicio)) {
            status = AGENDADO;
         }
        if (moment(dataAtual).isBetween(dataFim, dataInicio)) {
          status = EM_ANDAMENTO;
        }
        if (moment(dataAtual).isAfter(dataFim)) {
          status = FINALIZADO;
        }       
        return status;        
      }
    
 }  
  
module.exports =new Eventos;