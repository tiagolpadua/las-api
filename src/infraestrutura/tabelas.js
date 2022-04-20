class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarUsuarios();
    //console.log("tabelas foram chamadas mas nao criadas");
  }

  criarUsuarios() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Usuarios (id int(32) NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, urlFotoPerfil TEXT, PRIMARY KEY(id))";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Usuarios criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
