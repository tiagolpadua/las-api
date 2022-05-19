const Usuarios = require("../models/usuarios");

module.exports = (app) => {
    //ok
    app.get("/usuarios", (req, res, next) => {
      Usuarios.listar(res)
      .then(resultados => res.json(resultados))
      .catch((erros) => next(erros));
    });

    //ok
    app.get("/usuarios/:id", (req, res) => {
      const id = parseInt(req.params.id);

      Usuarios.buscarPorId(id, res)
      .then(resultados => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.post("/usuarios", (req, res) => {
      const usuarios = req.body;
      console.log(req.body);
      Usuarios.adicionar(usuarios)
      .then(resultados => res.json({id: resultados.insertId, ...usuarios}))
      .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.put("/usuarios/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const valores = req.body;
      Usuarios.alterar(id, valores)
      .then(() => res.json({id, ...valores}))
      .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.delete("/usuarios/:id", (req, res) => {
      const id = parseInt(req.params.id);
      Usuarios.excluir(id)
      .then(() => res.json({id}))
      .catch((erros) => res.status(400).json(erros));
    });
    
    //ok
    app.get("/usuarios/nome/:nome", (req, res) => {
      const nome = req.params.nome;
      Usuarios.buscarPorNome(nome)
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.get("/usuarios/:id/dados-pessoais", (req, res) => {
      const id = parseInt(req.params.id);

      Usuarios.listarDadosPessoais(id, res)
      .then(resultados => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.put("/usuarios/:id/dados-pessoais", (req, res) => {
      const id = parseInt(req.params.id);
      const valores = req.body;
      Usuarios.alterarDadosPessoais(id, valores)
      .then(() => res.json({id, ...valores}))
      .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.get("/usuarios/:id/contatos", (req, res) => {
      const id = parseInt(req.params.id);

      Usuarios.listarContatos(id, res)
      .then(resultados => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.put("/usuarios/:id/contatos", (req, res) => {
      const id = parseInt(req.params.id);
      const valores = req.body;
      Usuarios.alterarContatos(id, valores)
      .then(() => res.json({id, ...valores}))
      .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.put("/usuarios/:id/senha", (req, res) => {
      const id = parseInt(req.params.id);
      const valores = req.body;
      Usuarios.alterarSenha(id, valores)
      .then(() => res.json({id, ...valores}))
      .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.get("/usuarios/:id/endereco", (req, res) => {
      const id = parseInt(req.params.id);

      Usuarios.listarEndereco(id, res)
      .then(resultados => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
    });

    //ok
    app.put("/usuarios/:id/endereco", (req, res) => {
      const id = parseInt(req.params.id);
      const valores = req.body;
      Usuarios.alterarEndereco(id, valores)
      .then(() => res.json({id, ...valores}))
      .catch((erros) => res.status(400).json(erros));
    });
};
