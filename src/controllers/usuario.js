const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (_req, res) => {
    Usuarios.listarUsuarios()
      .then((data) => res.status(200).json(data))
      .catch((erro) => res.status(400).json(erro));
  });

  app.post("/usuarios", (req, res) => {
    const retornoForm = req.body;

    Usuarios.incluirUsuarios(retornoForm)
      .then((resultados) => {
        res.status(201).json({
          id: resultados.insertId,
          nome: retornoForm.nome,
          url: retornoForm.urlFotoPerfil,
        });
      })
      .catch((erro) => {
        res.status(400).json({ erro, descrição: "Entrada inválida" });
      });
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuarios.buscaUsuarioId(id)
      .then((results) =>
        !results.length
          ? res.status(404).json("Usuário não encontrado")
          : res.status(200).json({ ...results[0] })
      )
      .catch(() => {
        res.status(400).json("Id inválido fornecido");
      });
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    const nome = req.params.nome;

    Usuarios.buscaUsuarioPeloNome(nome)
      .then((results) => {
        if (!results.length) {
          res.status(400).json({ descrição: "Usuário não encontrado" });
        } else {
          res.status(200).json({
            ...results[0],
          });
        }
      })
      .catch((erro) =>
        res
          .status(400)
          .json({ erro: erro.code, descrição: "Usuário não encontrado" })
      );
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const retornoForm = req.body;

    Usuarios.alterarUsuario(id, retornoForm)
      // eslint-disable-next-line no-unused-vars
      .then(() => {
        res.status(200).json({
          status: "Usuário atualizado com sucesso",
        });
      })
      .catch((erro) => {
        res.status(405).json({ erro: erro, status: "Entrada inválida" });
      });
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuarios.excluirUsuario(id)
      .then((resultado) => {
        if (!resultado?.affectedRows)
          res.status(404).json("Usuário não encontrado");
        else res.status(204).json("Usuário excluído com sucesso");
      })
      .catch((erro) => {
        if (erro) res.status(400).json("Id inválido fornecido");
      });
  });
};
