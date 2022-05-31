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
    const sql =
      `CREATE TABLE IF NOT EXISTS Usuarios(
        id INT AUTO_INCREMENT NOT NULL,
        nome VARCHAR(100) NOT NULL, 
        urlFotoPerfil text, 
      
        -- Dados Pessoais
        nomeCompleto VARCHAR(100),
        dataNascimento VARCHAR(15),
        rg VARCHAR(14),
        cpf VARCHAR(13),
      
        -- Contatos
        telefone VARCHAR(14),
        celular VARCHAR(15),
        email VARCHAR(50),
      
        -- Senha
        senha VARCHAR(20),
      
        -- Endereço
        cep VARCHAR(10),
        endereco VARCHAR(50),
        numero INT,
        complemento VARCHAR(20),
        bairro VARCHAR(20),
      
        UNIQUE (nome), 
        PRIMARY KEY(id)
      )`;

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Usuarios criada com sucesso");
      }
    });
  }

  criarEventos(){
    const sql = "CREATE TABLE IF NOT EXISTS Eventos(id INT AUTO_INCREMENT NOT NULL, nome varchar(50) NOT NULL, descricao varchar(100) NOT NULL, urlFoto text NOT NULL, dataInicio date NOT NULL, dataFim date NOT NULL, status enum('agendado', 'em-andamento', 'finalizado'), PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if(erro){
        console.log(erro);
      }else{
        console.log("Tabela Eventos criada com sucesso");
      }
    });
  }

  criarTiposVendas(){
    const sql = "CREATE TABLE IF NOT EXISTS TiposVendas(id INT NOT NULL, descricao varchar(100) NOT NULL, PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if(erro){
        console.log(erro);
      }else{
        console.log("Tabela Tipos de Vendas criada com sucesso");
      }
    });
  }

  criarUFs(){
    const sql = "CREATE TABLE IF NOT EXISTS UFs(id INT NOT NULL, sigla varchar(2) NOT NULL, PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if(erro){
        console.log(erro);
      }else{
        console.log("Tabela UFs criada com sucesso");
      }
    });
  }

  criarMunicipios(){
    const sql = "CREATE TABLE IF NOT EXISTS Municipios(id INT NOT NULL, siglaEstado varchar(2) NOT NULL, nome varchar(100) NOT NULL, PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if(erro){
        console.log(erro);
      }else{
        console.log("Tabela Municipios criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
