class Tabelas {
  init(pool) {
    this.pool = pool;

    this.criarUsuarios();
    this.criarEventos();
    this.criarTiposVendas();
  }

  criarUsuarios() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Usuarios(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, urlFotoPerfil text, UNIQUE (nome), PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Usuarios criada com sucesso");
      }
    });
  }

  criarEventos(){
    const sql = "CREATE TABLE IF NOT EXISTS Eventos(id INT AUTO_INCREMENT NOT NULL, nome VARCHAR(100) NOT NULL, descricao text, urlFoto text, dataInicio DATE, dataFim DATE, PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      console.log((erro) ? erro : "Tabela Eventos criada com sucesso");
    });
  }

  criarTiposVendas(){
    const sql = "CREATE TABLE IF NOT EXISTS  TipoVendas(id INT NOT NULL, descricao text)";

    this.pool.query(sql, (erro) => {
      console.log((erro) ? erro : "Tabela TipoVendas criada com sucesso");
    });
  }
}

module.exports = new Tabelas();
