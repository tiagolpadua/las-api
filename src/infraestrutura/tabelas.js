class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarUsuarios();
  }

  criarUsuarios() {
    const sql = `CREATE TABLE IF NOT EXISTS usuarios
    (id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    urlFotoPerfil VARCHAR(200) NOT NULL)`;

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela 'usuarios' criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
