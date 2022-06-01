const query = require("../infraestrutura/database/queries");

class UF {
  listar() {
      const sql ="SELECT sigla FROM UFs ORDER BY sigla";
      return query(sql).then((respostas) => respostas.map((resposta) => resposta.sigla));
  }

  listarMunicipio() {
    const sql = "SELECT nome FROM municipios";
    return query(sql).then((respostas) => respostas.map((resposta) => resposta.nome));
  }
 }

module.exports = new UF();