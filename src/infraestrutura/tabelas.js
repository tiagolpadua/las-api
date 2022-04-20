class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarAtendimentos();
    //console.log("tabelas foram chamadas mas nao criadas");
  }

  criarUsuarios() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Usuario (id int(32) NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, urlFotoPerfil TEXT, PRIMARY KEY(id))";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Usuario criada com sucesso");
      }
    });
  }

  // criarAtendimentos() {
  //   const sql =
  //     "CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id)  )";

  //   this.conexao.query(sql, (erro) => {
  //     if (erro) {
  //       console.log(erro);
  //     } else {
  //       console.log("Tabela atendimentos criada com sucesso");
  //     }
  //   });
  // }
}

module.exports = new Tabelas();
