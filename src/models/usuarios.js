const conexao = require("../infraestrutura/conexao");

class Usuario {
    buscarUsuario(id, res) {
        const sql = `SELECT * FROM las.usuario WHERE id=?`;

        conexao.query(sql, id, (erro, resultados) => {
            const retornoUsuario = resultados[0];
            if (!erro && !retornoUsuario) {
                res.status(404).end();
            } else if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(retornoUsuario);
            }
        });
    }
}

module.exports = new Usuario();