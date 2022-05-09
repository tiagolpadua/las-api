
const pool = require("../infraestrutura/database/conexao");
//const fetch = require("node-fetch");
const repositorio = require("../repositorios/eventos");

class Eventos {
  listar() {
    return repositorio.listaEventos();
  }


buscarPorId(id, res, next) {
  const sql = "SELECT * FROM Eventos WHERE id = ?";
  pool.query(sql, id, (erro, resultados) => {
    const evento = resultados[0];
    if (erro) {
      next(erro);
    } else {
      if (evento) {
        res.status(200).json(evento);
      } else {
        res.status(404).end();
      }
    }
  });
}
  

 async incluir(evento,res,next) {
  const nomeEhValido = evento.nome.length >= 5;
  (await this.validarNomeEvento(evento.nome));

  const urlEhValida = await this.validarURLFotoPerfil(evento.urlFotoPerfil);

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

  listaEventosPorStatus(status) {
    return repositorio.listaEventosPorStatus(status);
  }

 } 



module.exports = new Eventos();