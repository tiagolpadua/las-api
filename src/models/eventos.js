const repositorio =require("../repositorios/evento");
const moment = require("moment");
const fetch = require("node-fetch");

class Eventos{
    //ok
    listar(){
        return repositorio.listar();
    }

    //ok
    buscarPorId(id){
        return repositorio.buscarPorId(id);
    }

    //ok
    async adicionar(evento) {
        const dataEvento = this.isDataValidas(evento.dataInicio,evento.dataFim);
        const urlEhValida = await this.validarURLFotoPerfil(evento.urlFoto);
        let nomeEhValido = false;
        let descricaoEhValida = false;

        if(evento?.nome?.length>4){
            nomeEhValido = true;
        }
        if(evento?.descricao?.length>4){
            descricaoEhValida = true;
        }
        const validacoes = [
            {
              nome: "nomeEvento",
              valido: nomeEhValido,
              mensagem: "Nome do Evento deve ser informado e deve ser único",
            },
            {
              nome: "urlFotoPerfil",
              valido: urlEhValida,
              mensagem: "URL deve uma URL válida",
            },{
              nome: "descricao",
              valido: descricaoEhValida,
              mensagem: "Descricao do Evento deve ser informado e deve ser único",
            },{
                nome: "Data",
                valido: dataEvento,
                mensagem: "Data do Evento deve ser Valida",
            }
        ];
        const erros = validacoes.filter((campo) => !campo.valido);
        const existemErros = erros.length > 0;
        
        if (existemErros) {
            console.log(erros);
            throw { erroApp: erros };
        } else {
            const resp = await repositorio.adicionar(evento);
            return { id: resp.insertId, ...evento };
        }
    }

    //ok
    async alterar(id, valores) {
        const dataEvento = this.isDataValidas(valores.dataInicio,valores.dataFim);
        const urlEhValida = await this.validarURLFotoPerfil(valores.urlFoto);
        let nomeEhValido = false;
        let descricaoEhValida = false;

        if(valores?.nome?.length>4){
            nomeEhValido = true;
        }
        if(valores?.descricao?.length>4){
            descricaoEhValida = true;
        }
        const validacoes = [
            {
              nome: "nomeEvento",
              valido: nomeEhValido,
              mensagem: "Nome do Evento deve ser informado e deve ser único",
            },
            {
              nome: "urlFotoPerfil",
              valido: urlEhValida,
              mensagem: "URL deve uma URL válida",
            },{
              nome: "descricao",
              valido: descricaoEhValida,
              mensagem: "Descricao do Evento deve ser informado e deve ser único",
            },{
                nome: "Data",
                valido: dataEvento,
                mensagem: "Data do Evento deve ser Valida",
            }
        ];
        const erros = validacoes.filter((campo) => !campo.valido);
        const existemErros = erros.length > 0;
        
        if (existemErros) {
            console.log(erros);
            throw { erroApp: erros };
        } else {
            const resp = await repositorio.alterar(id, valores);
            return { id: resp.insertId, ...valores };
        }
    }
    
    //ok
    excluir(id) {
        return repositorio.excluir(id);
    }

    //ok
    listarPorStatus(status){
        if(status ==="agendado"){
            return repositorio.listarAgendado();
        }
        if(status ==="em-andamento"){
            return repositorio.listarEmAndamento();
        }
        if(status ==="finalizado"){
            return repositorio.listarFinalizado();
        }

        return Promise.reject(`Status inválido: ${status}`); 
    }

    //ok
    isDataValidas({dataInicio,dataFim}){
        const dataCricaoEvento = moment().format("YYYY-MM-DD");
        const dataInicioEvento =moment(dataInicio).format("YYYY-MM-DD");
        const dataFimEvento = moment(dataFim).format("YYYY-MM-DD");
        
        const isDataEhValida= moment(dataInicioEvento).isSameOrAfter(dataCricaoEvento) &&
        moment(dataFimEvento).isSameOrAfter(dataInicioEvento);

        return isDataEhValida;
    }

    async validarURLFotoPerfil(url) {
        try {
          const regex =
            /https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/gm;
          const verificaUrl = url.match(regex);
          if (!verificaUrl) {
            return false;
          }
          const response = await fetch(url);
          if (response.status !== 200) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      }
}
module.exports = new Eventos();