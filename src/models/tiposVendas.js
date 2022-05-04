const pool = require("../infraestrutura/database/conexao");
// const fetch = require("node-fetch");
const repositorio = require("../repositorios/tiposVendas");

class Vendas {
  listar() {
    return repositorio.tiposVendas();
  }

  buscarTiposDeVendaPorId(id, res, next) {
    const sql = "SELECT * FROM tiposVendas WHERE id = ?";
    pool.query(sql, id, (erro, resultados) => {
      const venda = resultados[0];
      if (erro) {
        next(erro);
      } else {
        if (venda) {
          res.status(200).json(venda);
        } else {
          res.status(404).end();
        }
      }
    });
  }


}

module.exports = new Vendas();