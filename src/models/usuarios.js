const conexao = require("../infraestrutura/conexao");


class Usuario {
    buscaPorId(id, res) {
        const sql = `SELECT * FROM usuarios WHERE ID=${id}`;
        conexao.query(sql, (erro, result) => {
            const usuario = result[0];
            if (erro) res.status(400).json(erro);
            else res.status(200).json(usuario);
        });
    }
    add(usuario, res) {
        const usuarioEhValido = usuario.nome.length >= 5;

        if (usuarioEhValido) {
            const sql = "INSERT INTO usuarios SET ?";
            conexao.query(sql, usuario, (erro) => {
                if(erro) res.status(400).json(erro);
                else res.status(201).json(usuario);
            });
        } else res.status(400).json("Usuario inválido.");
    }
    buscaPorNome(nome, res) {
        const sql = `SELECT * FROM usuarios WHERE NOME LIKE "${nome}%"`;
        conexao.query(sql, (erro, result) => {
            if (erro) res.status(400).json(erro);
            else res.status(200).json(result);
        });
    }
}

module.exports = new Usuario;