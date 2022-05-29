class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarUsuarios();
  }

  criarUsuarios() {
    const sql = `CREATE TABLE IF NOT EXISTS Usuarios(
      id int NOT NULL AUTO_INCREMENT,
      nome varchar(100) NOT NULL,
      urlFotoPerfil text,
      
      --dados pessoais
      nomeCompleto varchar(100),
      dataNascimento date,
      rg varchar(20),
      cpf varchar(11),

      --contatos
      telefone varchar(11),
      cellar varchar(11),
      emaill varchar (50),

      --senha
      senha varchar(10),

      --endereco
      cep varchar(8),
      endereco varchar(100),
      numero int,
      complemento varchar (100),
      bairro varchar(100),

      --restrições
      UNIQUE (nome),
      PRIMARY KEY (id))`;

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
