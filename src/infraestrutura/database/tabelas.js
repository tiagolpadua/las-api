class Tabelas {
  init(pool) {
    this.pool = pool;
    this.criarUsuarios();
    this.criarEventos();
    this.criarTiposVenda();
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

  criarEventos() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Eventos(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL,descricao text,dataInicio DATE, dataFim DATE,status varchar(20),PRIMARY KEY(id))";
    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Eventos criada com sucesso");
      }
    });
  }

  criarTiposVenda() {
    const sql =
      "CREATE TABLE IF NOT EXISTS TiposVenda(id INT AUTO_INCREMENT NOT NULL,descricao text,PRIMARY KEY(id))";
    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela TiposVenda criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
