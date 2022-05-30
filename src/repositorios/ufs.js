const query = require("../infraestrutura/database/queries");

class UF {
  listar() {
    const sql = "SELECT sigla FROM Ufs ORDER BY sigla";
    return query(sql).then((respostas) => respostas.map((resposta) => resposta.sigla));
  }
}

module.exports = new UF();
