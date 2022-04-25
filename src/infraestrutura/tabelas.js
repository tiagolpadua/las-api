class Tabelas {
    init(conexao){
        this.conexao = conexao;

        this.criarUsuarios();
    }

    criarUsuarios(){
        const sql = "CREATE TABLE IF NOT EXISTS Usuarios(id INTEGER NOT NULL AUTO_INCREMENT, nome VARCHAR(50), urlFotoPerfil TEXT, PRIMARY KEY(id))";

        this.conexao.query(sql, erro => console.log(erro ? erro : "Tabela Usuarios criada com sucesso."));
    }
}

module.exports = new Tabelas;