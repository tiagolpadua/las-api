//const res = require("express/lib/response");
const conexao = require("../infraestrutura/conexao");

class Usuario {
    // adiciona(usuario) {
    //     const sql = "INSERT INTO usuarios SET ?";

    //     conexao.query(sql, usuario, (erro, resultados) => {
    //         if (erro) {
    //             res.status(400).send("erro");
    //         } else {
    //             res.status(200).json(resultados);
    //         }
    //     });
    // }

    buscaPorId(id, res) {
    const sql = `SELECT * FROM Usuarios WHERE id=${id}`;
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

    adiciona(usuario, res) {
    const sql = "INSERT INTO usuarios SET ?";
    conexao.query(sql, usuario, (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuario);
      }
    });
  }

  atualiza(id, usuarioAlterado, res) {
    const sql = "UPDATE usuarios SET ? WHERE id = ?";

    conexao.query(sql, [usuarioAlterado, id], (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...usuarioAlterado, id });
      }
    });
  }
  listar(res){
    const sql = "SELECT * FROM usuarios";
    conexao.query(sql, (erro, resultado) => {
        if(erro){
            res.status(400).json(erro);
        } else {
            res.status(200).json(resultado);
        }
    });
}
  deleta(id, res) {
    const sql = "DELETE FROM usuarios WHERE id = ?";

    conexao.query(sql, id, (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }

  buscaPorNome(nome,res){
    const sql = `SELECT * FROM Usuarios WHERE nome like '%${nome}%' `;

    conexao.query(sql, (erro, resultados) => {
        if(erro){
            res.status(400).json(erro);
        }else{
            res.status(200).json(resultados);
        }
    });
}

}

module.exports = new Usuario;