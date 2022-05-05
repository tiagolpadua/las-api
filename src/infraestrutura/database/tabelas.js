const executaQuery = require("./queries");

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
    executaQuery(sql)
      .then(console.log("tabela Usuarios criada com sucesso"))
      .catch((erros) => console.log(erros));
  }

  criarEventos() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Eventos(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, descricao text,urlFoto text, dataInicio DATE, dataFim DATE,status varchar(20),PRIMARY KEY(id))";
    executaQuery(sql)
      .then(console.log("tabela Eventos criada com sucesso"))
      .catch((erros) => console.log(erros));
  }

  criarTiposVendas() {
    const sql =
      "CREATE TABLE IF NOT EXISTS TiposVendas(id INT NOT NULL,descricao text,PRIMARY KEY(id))";
    executaQuery(sql)
      .then(console.log("tabela TiposVendas criada com sucesso"))
      .catch((erros) => console.log(erros));
  }
}

module.exports = new Tabelas();
