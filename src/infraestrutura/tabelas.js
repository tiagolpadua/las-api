class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarUsuario();
  }

  criarUsuario() {
    const sql = `CREATE TABLE IF NOT EXISTS Usuario 
        (id int NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, urlFotoPerfil text, PRIMARY KEY(id))`;

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
