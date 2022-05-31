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
        bairro varchar(100),

        -- restricoes
        UNIQUE (nome), 
        PRIMARY KEY(id))`;

    this.pool.query(sql, (erro) => {
      console.log(erro ? erro : "Tabela Usuarios criada com sucesso");
    });
  }

  criarEventos() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Eventos(id INT AUTO_INCREMENT NOT NULL, nome VARCHAR(100) NOT NULL, descricao text, urlFoto text, dataInicio DATE, dataFim DATE, status VARCHAR(20) NOT NULL, PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      console.log(erro ? erro : "Tabela Eventos criada com sucesso");
    });
  }

  criarTiposVendas() {
    const sql =
      "CREATE TABLE IF NOT EXISTS  TipoVendas(id INT NOT NULL, descricao text)";

    this.pool.query(sql, (erro) => {
      console.log(erro ? erro : "Tabela TipoVendas criada com sucesso");
    });
  }

  criarUFs() {
    const sql =
      "CREATE TABLE IF NOT EXISTS  UFs(id INT NOT NULL, sigla VARCHAR(2))";

    this.pool.query(sql, (erro) => {
      console.log(erro ? erro : "Tabela UFs criada com sucesso");
    });
  }

  criarMunicipios() {
    const sql =
      "CREATE TABLE IF NOT EXISTS  Municipios(id INT NOT NULL, siglaEstado VARCHAR(2), nome VARCHAR(50))";

    this.pool.query(sql, (erro) => {
      console.log(erro ? erro : "Tabela Municipios criada com sucesso");
    });
  }
}

module.exports = new Tabelas();
