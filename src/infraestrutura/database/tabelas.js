class Tabelas {
  init(pool) {
    this.pool = pool;

    this.criarUsuarios();
    this.criarEventos();
    this.criarTipoVendas();
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
      "CREATE TABLE IF NOT EXISTS Eventos(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, descricao text NOT NULL, urlFoto text NOT NULL, dataInicio date NOT NULL, dataFim date NULL, status varchar(20), PRIMARY KEY(id))";
    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Eventos criada com sucesso");
      }
    });
  }


  criarTipoVendas() {
    const sql = "CREATE TABLE IF NOT EXISTS tipoVendas (id INT NOT NULL, descricao text NOT NULL)";
    this.pool.query(sql, (erro) => {
      if (erro) console.log(erro);
      else console.log("Tabela tipoVendas criada com sucesso");
    });
  }
}

module.exports = new Tabelas();
