class Tabelas {
  init(pool) {
    this.pool = pool;

    this.criarUsuarios();
    this.criarEventos();
    this.criarTiposVendas();
  }

  criarUsuarios() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Usuarios(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, urlFotoPerfil text, UNIQUE (nome), PRIMARY KEY(id))";

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
      "CREATE TABLE IF NOT EXISTS las.evento(id INT AUTO_INCREMENT NOT NULL,nome VARCHAR(50) NOT NULL,descricao TEXT,urlFoto TEXT NOT NULL,dataInicio DATE NOT NULL,dataFim DATE NOT NULL,PRIMARY KEY(id));";

    this.pool.query(sql, (erro) => {
      if (erro) console.log(erro);
      else console.log("Tabela Evento criada com sucesso!");
    });
  }

  criarTiposVendas() {
    const sql =
      "CREATE TABLE IF NOT EXISTS las.tiposVendas (id INT NOT NULL, descricao VARCHAR(150) NOT NULL, PRIMARY KEY(id) )";

    this.pool.query(sql, (erro) => {
      if (erro) console.log(erro);
      else console.log("Tabela tiposVendas criada com sucesso!");
    });
  }
}

module.exports = new Tabelas();
