class Tabelas {
  init(pool) {
    this.pool = pool;

    this.criarUsuarios();
    this.criarEventos();
    this.criarTiposVendas();
  }

  criarUsuarios() {
    const sql = `CREATE TABLE IF NOT EXISTS Usuarios(
        id INT AUTO_INCREMENT NOT NULL,
        urlFotoPerfil text,
        nome varchar(50) NOT NULL,
        UNIQUE (nome), PRIMARY KEY(id),

        nomeCompleto varchar(200) NOT NULL,
        dataNascimento date,
        rg varchar(20),
        cpf varchar(20),
        
        telefone varchar(20),
        celular varchar(20),
        email varchar(50),

        senha varchar(50),

        cep varchar(10),
        endereco varchar(70),
        numero int ,
        bairro varchar(30),
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
    const sql = `CREATE TABLE IF NOT EXISTS Eventos(
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
    const sql = `CREATE TABLE IF NOT EXISTS tipoVendas(
        id INT NOT NULL,
        descricao text NOT NULL)`;

    this.pool.query(sql, (erro) => {
      if (erro) console.log(erro);
      else console.log("Tabela tipoVendas criada com sucesso");
    });
  }
}

module.exports = new Tabelas();
