const conexao = require("../infraestrutura/conexao");


class Usuario {
    buscaPorId(id, res) {
        const sql = `SELECT * FROM usuarios WHERE ID=${id}`;
        conexao.query(sql, (erro, result) => {
            const atendimento = result[0];
            if(erro) res.status(400).json(erro);
            else res.status(200).json(atendimento);
        });
    }
}


module.exports = new Usuario;