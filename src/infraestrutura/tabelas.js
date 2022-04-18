class Tabelas{
    init(conexao){
        this.conexao=conexao;
        this.criarUsuarios();
    }

    criarUsuarios(){
        const sql="CREATE TABLE IF NOT EXISTS Usuario (id int NOT NULL auto_increment, nome varchar(100) NOT NULL, urlFotoPerfil varchar(200), primary key (id))";

        this.conexao.query(sql, (error) =>{
            if(error) {
                console.log(error);
            }else{
                console.log("Tabela Usuario criada com sucesso");
            }
        });
    }
}

module.exports= new Tabelas;