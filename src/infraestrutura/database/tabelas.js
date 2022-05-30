class Tabelas {
  init(pool) {
    this.pool = pool;

    this.criarUsuarios();
    this.criarEventos();
    this.criarTiposVendas();
    this.criarUFs();
  }

  criarUsuarios() {
    const sql =
      `CREATE TABLE IF NOT EXISTS Usuarios(
        id INT AUTO_INCREMENT NOT NULL,
        urlFotoPerfil text,
        UNIQUE (nomeCompleto), PRIMARY KEY(id),

        nomeCompleto varchar(200) NOT NULL,
        dataNascimento date NOT NULL,
        rg varchar(20) NOT NULL,
        cpf varchar(20) NOT NULL,
        
        telefone varchar(20) NOT NULL,
        celular varchar(20) NOT NULL,
        email varchar(50) NOT NULL,

        senha varchar(50) NOT NULL,

        cep varchar(10) NOT NULL,
        endereco varchar(70) NOT NULL,
        numero int NOT NULL,
        bairro varchar(30) NOT NULL,
        complemento varchar(30)
      )`;

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
      `CREATE TABLE IF NOT EXISTS Eventos(
        id INT AUTO_INCREMENT NOT NULL,
        nome varchar(100) NOT NULL,
        descricao text NOT NULL,
        urlFoto text NOT NULL,
        dataInicio date NOT NULL,
        dataFim date NOT NULL,
        status varchar(20),
        PRIMARY KEY(id))`;

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
     `CREATE TABLE IF NOT EXISTS tipoVendas(
        id INT NOT NULL,
        descricao text NOT NULL)`;
        
    this.pool.query(sql, (erro) => {
      if (erro) console.log(erro);
      else console.log("Tabela tipoVendas criada com sucesso");
    });
  }

  criarUFs() {
    const sql =
     `CREATE TABLE IF NOT EXISTS UFs(
        id INT NOT NULL PRIMARY KEY,
        sigla varchar(3) NOT NULL)`;
        
    this.pool.query(sql, (erro) => {
      if (erro) console.log(erro);
      else console.log("Tabela UFs criada com sucesso");
    });
  }
}

module.exports = new Tabelas();
