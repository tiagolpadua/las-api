class Tabelas {
  init(pool) {
    this.pool = pool;

    this.criarUsuarios();
    this.criarEventos();
    this.criarTiposVendas();
    this.criarUFs();
    this.criarMunicipios();
  }

  criarUsuarios() {
    const sql = `CREATE TABLE IF NOT EXISTS Usuarios(
        id INT AUTO_INCREMENT NOT NULL, 
        nome varchar(100) NOT NULL, 
        urlFotoPerfil text, 
        
        -- Dados Pessoais

        nomeCompleto varchar(100),
        dataNascimento varchar(10),
        rg varchar(30),
        cpf varchar(11),

        -- Contatos

        telefone varchar(15),
        celular varchar(15),
        email varchar(50),

        -- Senha

        senha varchar(100),

        -- Endereco

        cep varchar(15),
        endereco varchar(200),
        numero INT,
        complemento varchar(50),
        bairro varchar(100),
        
        UNIQUE (nome), PRIMARY KEY(id))`;

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
      "CREATE TABLE IF NOT EXISTS Eventos(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, descricao varchar(300) NOT NULL, urlFoto text NOT NULL, dataInicio datetime NOT NULL, dataFim datetime NOT NULL, PRIMARY KEY(id))";

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
      "CREATE TABLE IF NOT EXISTS TiposVendas(id INT NOT NULL, descricao varchar(100) NOT NULL, PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela TiposVendas criada com sucesso");
      }
    });
  }

  criarUFs() {
    const sql =
      "CREATE TABLE IF NOT EXISTS UFs(id INT NOT NULL, sigla varchar(2) NOT NULL, nome varchar(30), PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela UFs criada com sucesso");
      }
    });
  }

  criarMunicipios() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Municipios(id INT NOT NULL, nome varchar(30) NOT NULL, UF varchar(2), PRIMARY KEY(id))";

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
