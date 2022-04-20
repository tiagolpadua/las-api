//const moment = require("moment");
const conexao = require("../infraestrutura/conexao");

class Usuario {
  // adiciona(usuario, res) {
  //   const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
  //   const data = moment(usuario.data, "DD/MM/YYYY").format(
  //     "YYYY-MM-DD HH:mm:ss"
  //   );

  //   const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
  //   const clienteEhValido = usuario.cliente.length >= 5;

  //   const validacoes = [
  //     {
  //       nome: "data",
  //       valido: dataEhValida,
  //       mensagem: "Data deve ser maior ou igual a data atual",
  //     },
  //     {
  //       nome: "cliente",
  //       valido: clienteEhValido,
  //       mensagem: "Cliente deve ter pelo menos cinco caracteres",
  //     },
  //   ];

  //   const erros = validacoes.filter((campo) => !campo.valido);
  //   const existemErros = erros.length;

  //   if (existemErros) {
  //     res.status(400).json(erros);
  //   } else {
  //     const atendimentoDatado = { ...usuario, dataCriacao, data };

  //     const sql = "INSERT INTO atendimentos SET ?";

  //     conexao.query(sql, atendimentoDatado, (erro, resultados) => {
  //       if (erro) {
  //         res.status(400).json(erro);
  //       } else {
  //         res.status(201).json(usuario);
  //       }
  //     });
  //   }
  // }

  lista(res) {
    const sql = "SELECT * FROM usuarios";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM usuarios WHERE id = ${id}`;

    conexao.query(sql, (erro, resultados) => {
      const usuario = resultados[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuario);
      }
    });
  }

  // altera(id, valores, res) {
  //   if (valores.data) {
  //     valores.data = moment(valores.data, "DD/MM/YYYY").format(
  //       "YYYY-MM-DD HH:mm:ss"
  //     );
  //   }
  //   const sql = "UPDATE atendimentos SET ? WHERE id =?";

  //   conexao.query(sql, [valores, id], (erro, resultados) => {
  //     if (erro) {
  //       res.status(400).json(erro);
  //     } else {
  //       res.status(200).json({ ...valores, id });
  //     }
  //   });
  // }

  // deleta(id, res) {
  //   const sql = "DELETE FROM atendimentos WHERE id = ?";

  //   conexao.query(sql, id, (erro, resultados) => {
  //     if (erro) {
  //       res.status(400).json(erro);
  //     } else {
  //       res.status(200).json({ id });
  //     }
  //   });
  // }
}

module.exports = new Usuario();
