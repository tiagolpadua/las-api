const customExpress = require("../config/customExpress");
const conexao = require("./infraestrutura/conexao");
const Tabela = require("./infraestrutura/tabelas");

conexao.connect((erro) => {
    if(erro) console.log(erro);
    else {
        console.log("Servidor conectado.");
        Tabela.init(conexao);
        const app = customExpress();
        app.listen(3000, () => console.log("Servidor rodando na 3000"));
    }
});