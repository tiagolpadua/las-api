class Tabelas {
    init(pool) {
      this.pool = pool;
  
      this.criarUsuarios();
      this.criarEventos();
  
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
        "CREATE TABLE IF NOT EXISTS Evento(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, descricao text, urlFoto text, dataInicio date, dataFim date,status varchar(50), PRIMARY KEY(id))";
  
      this.pool.query(sql, (erro) => {
        if (erro) {
          console.log(erro);
        } else {
          console.log("Tabela Evento criada com sucesso");
        }
      });
    }
}
  
  module.exports = new Tabelas();