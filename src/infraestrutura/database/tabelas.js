const query = require("./queries");


class Tabelas {
  init(pool) {
    this.pool = pool;
    this.criarUsuarios();
    this.criarEventos();
    this.criarTiposVendas();
  }

  criarUsuarios() {//chamar a query ao inves de retornar as respostas aqui?
    const sql =
      "CREATE TABLE IF NOT EXISTS Usuarios(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, urlFotoPerfil text, UNIQUE (nome), PRIMARY KEY(id))";
      query(sql)
      .then(console.log("Tabela Usuarios criada com sucesso."))
    .catch((erros) => console.log(erros));
    }

  criarEventos(){

    const sql= "CREATE TABLE IF NOT EXISTS Eventos(id int NOT NULL AUTO_INCREMENT,nome varchar(100), descricao varchar(100), urlFoto text, dataInicio DATE, dataFim DATE, PRIMARY KEY(id) )";
    query(sql)
    .then(console.log("Tabela Eventos criada com sucesso."))
    .catch((erros) => console.log(erros));
  }
  criarTiposVendas(){
    const sql ="CREATE TABLE IF NOT EXISTS TiposVendas(id int NOT NULL AUTO_INCREMENT, descricao varchar(100),PRIMARY KEY(id) )";
    query(sql)
    .then(console.log("Tabela Tipos de Vendas criada com sucesso."))
    .catch((erros) => console.log(erros));
  }
}

module.exports = new Tabelas();
