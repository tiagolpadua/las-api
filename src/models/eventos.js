// eslint-disable-next-line no-unused-vars
const pool = require("../infraestrutura/database/conexao");
// eslint-disable-next-line no-unused-vars
const fetch = require("node-fetch");
const evento = require("../repositorios/evento");
//const moment = require("moment");

class Eventos {
  listar() {
    return evento.listar();
  }

  //   buscarPorId(id) {
  //     return evento.buscarPorId(id);
  //   }

  //   async adicionar(usuario) {
  //     const nomeEhValido =
  //       usuario.nome.length > 0 &&
  //       (await this.validarNomeUsuarioNaoUtilizado(usuario.nome));

  //     const urlEhValida = await this.validarURLFotoPerfil(usuario.urlFotoPerfil);

  //     const validacoes = [
  //       {
  //         nome: "nome",
  //         valido: nomeEhValido,
  //         mensagem: "Nome deve ser informado e deve ser único",
  //       },
  //       {
  //         nome: "urlFotoPerfil",
  //         valido: urlEhValida,
  //         mensagem: "URL deve uma URL válida",
  //       },
  //     ];

  //     const erros = validacoes.filter((campo) => !campo.valido);
  //     const existemErros = erros.length;

  //     if (existemErros) {
  //       return new Promise((resolve, reject) => reject(erros));
  //     } else {
  //       // const sql = "INSERT INTO Usuarios SET ?";

  //       // pool.query(sql, usuario, (erro) => {
  //       //   if (erro) {
  //       //     next(erro);
  //       //   } else {
  //       //     res.status(201).json(usuario);
  //       //   }
  //       // });
  //       return evento.adicionar(usuario);
  //     }
  //   }

  //   alterar(id, valores) {
  //     return evento.alterar(id, valores);
  //   }

  //   excluir(id) {
  //     return evento.excluir(id);
  //   }

  //   buscarPorNome(nome) {
  //     return evento.buscarPorNome(nome);
  //   }

  //   async validarURLFotoPerfil(url) {
  //     try {
  //       const regex =
  //         /https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/gm;
  //       const verificaUrl = url.match(regex);
  //       if (!verificaUrl) {
  //         return false;
  //       }
  //       const response = await fetch(url);
  //       if (response.status !== 200) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     } catch {
  //       return false;
  //     }
  //   }

  //   async validarNomeUsuarioNaoUtilizado(nome) {
  //     return new Promise((resolve) => {
  //       const sql = "SELECT * FROM Usuarios WHERE nome = ?";
  //       pool.query(sql, nome, (erro, resultados) => {
  //         if (erro) {
  //           resolve(false);
  //         } else {
  //           if (resultados.length > 0) {
  //             resolve(false);
  //           } else {
  //             resolve(true);
  //           }
  //         }
  //       });
  //     });
  //   }

  // isDatasValidas(dataInicio, dataFim) {
  //   //Obter a data atual - var now = moment();
  //   //var day = moment("1995-12-25")
  //   const objDataInicio = moment(dataInicio);
  //   const objDataFim = moment(dataFim);
  // }
}

module.exports = new Eventos();
