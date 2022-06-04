
const moment = require("moment");
const pool = require("../infraestrutura/database/conexao");
const fetch = require("node-fetch");
const repositorio = require("../repositorios/eventos");

class Eventos {
  listar() {
    return repositorio.listarEventos();
  }

  buscarPorId(id) {
  return repositorio.buscarPorId(id);
}

async isURLValida(url) {
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

 async incluir(evento,res,next) {
  let nomeEhValido = false;
     if(evento?.nome?.length > 0) {
       const nomeJaUtilizado = await repositorio.isNomeEventoUtilizado(evento.nome);

       if(!nomeJaUtilizado) {
         nomeEhValido = true;
       }
     }
  const urlEhValida = await this.isURLValida(evento.urlFotoPerfil);

  const validacoes = [
    {
      nome: "nome",
      valido: nomeEhValido,
      mensagem: "Nome deve ser informado e deve ser único",
    },
    {
      nome: "urlFotoPerfil",
      valido: urlEhValida,
      mensagem: "URL deve uma URL válida",
    },
  ];
  const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
     // Eventos.adicionar(evento)
      const sql = "INSERT INTO Eventos SET ?";

      pool.query(sql, evento, (erro) => {
        if (erro) {
          next(erro);
        } else {
          res.status(201).json(evento);
        }
      });
    }
  }
  
  alterar(id, valores, res, next) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    pool.query(sql, [valores, id], (erro) => {
      if (erro) {
        next(erro);
      } else {
        res.status(200).json(valores);
      }
    });
  }

  excluir(id, res, next) {
    const sql = "DELETE FROM Eventos WHERE id = ?";
    pool.query(sql, id, (erro) => {
      if (erro) {
        next(erro);
      } else { 
        res.status(200).json({ id });
      }
    });
  }

  isDatasValidas(evento) {
    let datasValidas = false;
    
    if(evento.dataInicio && evento.dataFim) {
      const dataInicio = moment(evento.dataInicio);
      const dataFim = moment(evento.dataFim);
      const hoje = moment();

    if(evento.dataInicio && evento.dataFim && 
        dataInicio.isAfter(hoje) && dataFim.isAfter(dataInicio)
        )  {
          datasValidas = true;
        }
      } 
      return datasValidas;
    }
    
    listarEventosPorStatus(status) {
      switch(status) {
        case "agendado":
          return repositorio.listarEventosAgendados();
        case "em-andamento":
          return repositorio.listarEventosEmAndamento();
        case "finalizado":
          return repositorio.listarEventosFinalizados();
        default:
          throw new Error(`Status inválido: ${status}`);  
      }
    }
 } 

module.exports = new Eventos();