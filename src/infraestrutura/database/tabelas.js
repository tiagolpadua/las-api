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
      "CREATE TABLE IF NOT EXISTS Usuarios(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, urlFotoPerfil text, UNIQUE (nome), nomeCompleto varchar(100), dataNascimento DATE, rg varchar(50), cpf varchar(11), cep varchar(10), endereco varchar (100), numero integer, complemento varchar (50), bairro varchar (50), telefone varchar (10), celular varchar (11), email varchar (50), senha text, documento varchar (150), PRIMARY KEY(id))";
    executaQuery(sql)
      .then(console.log("tabela Usuarios criada com sucesso"))
      .catch((erros) => console.log(erros));
  }

  criarEventos() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Eventos(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, descricao text,urlFoto text, dataInicio DATE, dataFim DATE,PRIMARY KEY(id))";
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
