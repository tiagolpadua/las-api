const res = require("express/lib/response");
const conexao = require("../infraestrutura/conexao");
const fetch = require("node-fetch");

class Usuario {
    listar (res) {
        const query = "SELECT * FROM usuarios";
        conexao.query(query, (err, resultados) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(resultados);
            }
        });
    }
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
        const sql = `SELECT * FROM usuarios WHERE nome LIKE "${nome}%"`;
        conexao.query(sql, (erro, result) => {
            if (erro) res.status(400).json(erro);
            else res.status(200).json(result);
        });
    }
    alterarUsuario(id, valores, res) {
        const sql = "UPDATE usuarios SET ? WHERE id = ?";
        conexao.query(sql, valores, id, (err, result) => {
            if (err) res.status(400).json(err);
            else res.status(200).json(result);
        });
    }
    excluirUsuario(id) {
        const sql = "DELETE FROM usuarios WHERE id = ?";
        conexao.query(sql, id, (err, result) => {
            if (err) res.status(400).json(err);
            else res.status(200).json(result);
        });
    }
    async validarURLFotoPerfil(url) {
        const regex = /https?:\/\/[^$#¢\s]*.([j][p][g])/g;
        const urlValido = regex.test(url);
        let response;
        if (urlValido) {
            try {
                response = await fetch(url);
                if (response.status === 200) {
                    return true;
                }
            } catch (err) {
                return false;
            }
        } 
        else return false;
    }
    validarNomeUsuarioNaoUtilizado (nome) {
        return new Promise((res, rej) => {
            const sql = "SELECT * FROM usuarios WHERE nome = ?";
            conexao.query(sql, nome, (err, result) => {
                if (err) return rej(err);
                else {
                    if (result.length === 0) return res(true);    // o nome pode ser utilizado num novo usuário
                }
                return rej(false);      // o nome já pertence a um usuário
            });
        });
    }
}

module.exports = new Usuario;