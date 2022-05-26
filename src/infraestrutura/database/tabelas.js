class Tabelas {
  init(pool) {
    this.pool = pool;

    this.criarUsuarios();
    this.criarEventos();
    this.criarTiposVendas();
    this.criarUFS();
    this.criarMunicipios();
  }

  criarUsuarios() {
    const sql =
      `CREATE TABLE IF NOT EXISTS Usuarios(
        id INT AUTO_INCREMENT NOT NULL,
        nome varchar(100) NOT NULL,
        urlFotoPerfil text,

        -- dados pessoais
        nomeCompleto varchar(100),
        dataNascimento date,
        rg varchar(20),
        cpf varchar(11),

        -- contatos
        telefone varchar(11),
        celular varchar(11),
        email varchar(50),

        -- senha
        senha varchar(10),

        -- endereco
        cep varchar(8),
        endereco varchar(100),
        numero int,
        complemento varchar(100),
        bairro varchar (100),

        UNIQUE (nome),
        PRIMARY KEY(id))`;

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
      "CREATE TABLE IF NOT EXISTS Eventos(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, descricao text NOT NULL, urlFoto text NOT NULL, dataInicio DATE NOT NULL, dataFim DATE NOT NULL, status enum('agendado', 'em-andamento', 'finalizado'), PRIMARY KEY(id))";

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
      "CREATE TABLE IF NOT EXISTS TiposVendas(id INT NOT NULL, descricao varchar(30) NOT NULL, primary key(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela TiposVendas criada com sucesso");
      }
    });
  }

  criarUFS() {
    const sql = "CREATE TABLE IF NOT EXISTS UFs(id INT NOT NULL, sigla varchar(2), primary key(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela UFs criada com sucesso");
      }
    });
  }

  criarMunicipios() {
    const sql = "CREATE TABLE IF NOT EXISTS Municipios(id INT NOT NULL, siglaEstado varchar(2), nome varchar(100), primary key(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Municipios criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
