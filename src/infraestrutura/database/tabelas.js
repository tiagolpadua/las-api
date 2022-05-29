class Tabelas {
  init(pool) {
    this.pool = pool;

    this.criarUsuarios();
    this.criarEventos();
    this.criarTiposVendas();
  }

  criarUsuarios() {
    const sql = `CREATE TABLE IF NOT EXISTS Usuarios(
      id int NOT NULL AUTO_INCREMENT,
      nome varchar(100) NOT NULL,
      urlFotoPerfil text,
      
      
      nomeCompleto varchar(100),
      dataNascimento date,
      rg varchar(20),
      cpf varchar(11),

    
      telefone varchar(11),
      celular varchar(11),
      email varchar (50),

     
      senha varchar(10),

      
      cep varchar(8),
      endereco varchar(100),
      numero int,
      complemento varchar (100),
      bairro varchar(100),

     
      UNIQUE (nome),
      PRIMARY KEY (id))`;

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
      "CREATE TABLE IF NOT EXISTS Eventos (id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, descricao text, urlFoto text, dataInicio date, dataFim date, status ENUM('agendado', 'em-andamento', 'finalizado'), UNIQUE (nome), PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Eventos criada com sucesso");
      }
    });
  }
  criarTiposVendas() {
    const sql =
      "CREATE TABLE IF NOT EXISTS TiposVendas(id INT AUTO_INCREMENT NOT NULL, descricao text, PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Tipo Vendas criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
