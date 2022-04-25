const conexao = require("../infraestrutura/conexao");

class Usuario {
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

    async adiciona(usuario, res) {
    
      const validaNome = await this.validarNomeUsuarioNaoUtilizado(usuario.nome);
      const sql = "INSERT INTO usuarios SET ?";

      if(!validaNome){
        res.status(400).json("Nome já cadastrado");
      } else {
        conexao.query(sql, usuario,(erro,resultados) => {
          if(erro){
            res.status(400).json(erro);
          }else{
            res.status(201).json(resultados);
          }
        });
      } 
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

  validarNomeUsuarioNaoUtilizado(nome){
    return new Promise((res,err) => {
      const sql = "SELECT * FROM Usuarios WHERE nome = ?";
      conexao.query(sql, nome, (erro, resultado) => {
        if(erro){
          err(erro);
        }else{
          if(resultado.length > 0){
            resultado(false);
          }else{
            resultado(true);
          }
        }
      });
    });
  }

  validarURLFotoPerfil(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) !=null;
  }

}

module.exports = new Usuario;