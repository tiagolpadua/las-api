const conexao = require("../infraestrutura/conexao");

class Usuario{
    buscaUsuarioPorId(id, res){
        const sql = "SELECT * FROM usuarios WHERE id = ?";

        conexao.query(sql, id, (erro, resultado) => {
            const usuario = resultado[0];

            if(!erro && !usuario){
                res.status(404).json("Usuário não encontrado");
            } else if(erro) {
                res.status(400).json("Id inválido fornecido");
            } else {
                res.status(200).json(usuario);
            }
        });
    }

    listarUsuarios(res){
        const sql = "SELECT * FROM Usuarios";

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    incluirUsuario(usuario, res){

        const expressao = "/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi";
        const regex = new RegExp(expressao);

        const nomeEhValido = usuario.nome.length >= 5;
        const urlEhValida = usuario.urlFotoPerfil.match(regex);

        const validacoes = [
            {
                nome: "nome",
                valido: nomeEhValido,
                mensagem: "Nome do usuário deve ter pelo menos 5 caracteres."
            },
            {
                nome: "url",
                valido: urlEhValida,
                mensagem: "URL precisa ser um endereço válido."
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros);
        } else {
            const sql = "INSERT INTO Usuarios SET ?";

            conexao.query(sql, usuario, (erro) => {
                if(erro){
                    res.status(400).json("Entrada inválida");
                } else {
                    res.status(201).json("Usuário incluído com sucesso");
                }
            });
        }
    }

    atualizarUsuario(id, valores, res){
        const idEhValido = !isNaN(id);

        const sql = "UPDATE Usuarios SET ? WHERE id = ?";

        if(!idEhValido){
            res.status(405).json("Entrada Inválida");
        } else {
            conexao.query(sql, [valores, id], (erro) => {
                if(erro){
                    res.status(405).json("Entrada inválida");
                } else {
                    res.status(204).json("Usuário atualizado com sucesso");
                }
            });
        }
    }

    excluirUsuario(id, res){
        const idEhValido = !isNaN(id);

        const sql = "DELETE FROM Usuarios WHERE id = ?";

        if(!idEhValido){
            res.status(400).json("Id inválido fornecido");
        } else {
            conexao.query(sql, id, (erro) => {
                if(erro){
                    res.status(405).json("Usuário não encontrado");
                } else {
                    res.status(204).json("Usuário excluído com sucesso");
                }
            });
        }
    }
}

module.exports = new Usuario;