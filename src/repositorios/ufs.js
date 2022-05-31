const query = require("../infraestrutura/database/queries");

class UFs {
  listar(){
    const sql = "SELECT sigla FROM UFs ORDER BY sigla";
    return query(sql).then((respostas) => respostas.map((resposta) => resposta.sigla));
  }

  listarMunicipiosPorUf(uf){
    const sql = "SELECT nome FROM Municipios WHERE siglaEstado = ?";
    return query(sql, uf);
  }
}

module.exports = new UFs();