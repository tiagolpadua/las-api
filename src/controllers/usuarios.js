const Usuario = require("../models/usuarios");

module.exports = app => {
    //Rota de busca de um usuário pelo ID
    app.get("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);

        Usuario.buscaUsuarioPorId(id, res);
    });

    //Rota para buscar o usuário por parte do nome
    app.get("/usuarios/nome/:nome", (req, res) => {
        const nome = req.params.nome;

        Usuario.buscaUsuarioPorNome(nome, res);
    });

    //Rota para a lista de usuarios
    app.get("/usuarios", (req, res) => {
        Usuario.listarUsuarios(res);
    });
    
    //Rota para inserir um novo usuario
    app.post("/usuarios", (req, res) => {
        const usuario = req.body();

        Usuario.incluirUsuario(usuario, res);
    });

    //Rota para Atualizar um usuário no LAS-API com os dados do formulário
    app.put("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body();

        Usuario.atualizarUsuario(id, valores, res);
    });

    //Rota para Excluir um usuário
    app.delete("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);

        Usuario.excluirUsuario(id, res);
    });
};