const getQueries = require("../util/functions");

class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criasTabelas();
  }

  criasTabelas() {
    const createTables = (queries) =>
      queries.forEach((query) =>
        this.conexao.query(query, (err) => console.log(err || "OK"))
      );

    getQueries(createTables);
  }
}

module.exports = Tabelas;
