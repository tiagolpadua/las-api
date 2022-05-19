class Tabelas {
  init(pool) {
    this.pool = pool;

    this.criarUsuarios();
    this.criarEventos();
    this.criarTiposVendas();
  }

  criarUsuarios() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Usuarios"+
      "(id INT AUTO_INCREMENT NOT NULL,"+
      " nomeCompleto varchar(100) NOT NULL,"+                         //dados pessoais
      " rg varchar(13) NOT NULL, "+                                   //dados pessoais
      "cpf varchar(13) NOT NULL,"+                                    //dados pessoais
      " dataNascimento varchar(100),"+                                //dados pessoais
      " telefone varchar(13),"+                                       //contato
      " celular varchar(13), "+                                       //contato
      "email varchar(200),"+                                          //contato
      " urlFotoPerfil text,"+
      " senha varchar(10),"+
      " cep varchar(10),"+                                            //endereço
      " endereco varchar(100),"+                                      //endereço
      " numero int,"+                                                 //endereço
      " complemento varchar(100),"+                                   //endereço
      " bairro varchar(50),"+                                         //endereço
      " UNIQUE (nomeCompleto) , PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Usuarios criada com sucesso");
      }
    });
  }

  criarEventos(){
    const sql =
      "CREATE TABLE IF NOT EXISTS Eventos(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, descricao varchar(100) NOT NULL, urlFoto text, dataInicio varchar(50) NOT NULL, dataFim varchar(50) NOT NULL, status enum('agendado', 'em-andamento', 'finalizado'), PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Eventos criada com sucesso");
      }
    });
  }

  criarTiposVendas(){
    const sql =
      "CREATE TABLE IF NOT EXISTS TiposVendas(id INT AUTO_INCREMENT NOT NULL, descricao varchar(100) NOT NULL, PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela TiposVendas criada com sucesso");
      }
    });
  }
}
module.exports = new Tabelas();
