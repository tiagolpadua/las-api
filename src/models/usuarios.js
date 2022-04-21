const conexao = require("../infraestrutura/conexao");

class Usuario {
    buscaPorUsuario(nome, res) {
        const sql = `SELECT * FROM Usuarios WHERE nome=${nome}`;

        conexao.query(sql, (erro, resultados) => {
            const usuario = resultados[0];
            if (!erro && !usuario) {
                res.status(404).end();
            } else if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(usuario);
            }
        });
    }
}

module.exports = new Usuario();