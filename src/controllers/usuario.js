const Usuarios = require("../models/usuarios");

/*



  -----------------------------------------------------------

  app.get("/usuarios", (req, res, next) => {
    Usuarios.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id, res, next);
  });

  app.post("/usuarios", (req, res, next) => {
    const usuarios = req.body;
    Usuarios.adicionar(usuarios, res, next);
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores, res, next);
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id, res, next);
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome, res, next);
  });

*/

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuarios.listarUsuarios()
      .then((data) => res.status(200).json(data))
      .catch((erro) => res.status(400).json(erro));
  });

  app.post("/usuarios", (req, res) => {
    const retornoForm = req.body;

    Usuarios.incluirUsuarios(retornoForm)
      .then((resultados) => {
        console.log(resultados.status);
        res
          .status(201)
          .json({ ...resultados, descrição: "Usuário incluído com sucesso" });
      })
      .catch((error) =>
        res.status(400).json({ erro: error, descrição: "Entrada inválida" })
      );
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Usuarios.buscaUsuarioId(id)
      .then((results) => {
        if (!results.length) {
          res.status(404).json("Usuário não encontrado");
        } else {
          res.status(200).json({
            ...results[0],
            descrição: "Operação bem sucedida",
          });
        }
      })
      .catch((erro) => {
        res.status(400).json("Id inválido fornecido");
        return erro;
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
            descrição: "Operação bem sucedida",
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
      .then((resultado) => {
        res.status(201).json({
          id: id,
          ...retornoForm,
          status: "Usuário incluído com sucesso",
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
