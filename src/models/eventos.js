const pool = require("../infraestrutura/database/conexao");
// const fetch = require("node-fetch");
const repositorio = require("../repositorios/eventos");

class Eventos {
  listar() {
    return repositorio.listaEventos();
  }


buscarEventosPorId(id, res, next) {
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
}

module.exports = new Eventos();