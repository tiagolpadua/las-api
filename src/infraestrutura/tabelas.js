class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criarUsuarios();
  }

  criarUsuarios() {
    const sql =
      "CREATE TABLE IF NOT EXISTS usuario (id INT NOT NULL AUTO_INCREMENT, nome VARCHAR(50) NOT NULL, urlFotoPerfil VARCHAR(150), PRIMARY KEY(id) )";

    this.conexao.query(sql, (erro) => {
      if (erro) console.log(erro);
      else console.log("Tabela criada com sucesso!");
    });
  }
}

module.exports = new Tabelas();
