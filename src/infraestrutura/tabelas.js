class Tabela {
    init(conexao) {
        this.conexao = conexao;

        this.criarUsuarios();
    }

    criarUsuarios() {
        const sql = `CREATE TABLE IF NOT EXISTS usuarios(
            id int AUTO_INCREMENT PRIMARY KEY,
            nome varchar(100) NOT NULL, 
            urlFotoPerfil varchar(200))`;

        this.conexao.query(sql, (erro) => {
            if(erro) console.log(erro);
            else console.log("Tabela usuarios criada com sucesso.");
        });
    }
}


module.exports = new Tabela;