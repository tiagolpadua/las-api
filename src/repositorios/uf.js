// https://servicodados.ibge.gov.br/api/v1/localidades/municipios

const query = require("../infraestrutura/database/queries");

class UF {
  listar() {
    const sql = "SELECT sigla FROM ufs ORDER BY 1";
    return query(sql).then((respostas) =>
      respostas.map((resposta) => resposta.sigla)
    );
  }

  buscarMunicipio(nomeUF) {
    const sql = "SELECT nome FROM Municipios WHERE uf_sigla = ?";
    return query(sql, nomeUF);
  }
}

module.exports = new UF();
