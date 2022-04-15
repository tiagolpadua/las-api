class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarUsuarios();
  }

  criarUsuarios() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Usuarios (id int NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, urlFotoPerfil varchar(100), PRIMARY KEY(id))";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log("erro");
      } else {
        console.log("Tabela usuarios criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
