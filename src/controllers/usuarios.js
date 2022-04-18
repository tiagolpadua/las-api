/* eslint-disable no-unused-vars */
const Usuario =require("../models/usuarios");

module.exports = app =>{
    app.get("/usuarios/:id",(req, res) => {
        const id =parseInt(req.params.id);

        Usuario.buscaPorId(id,res);
    });

    app.get("/usuarios/nome/:nome",(req, res) => {
        const nome =req.params.nome;

        Usuario.buscaPorNome(nome,res);
    });

    app.post("/usuarios", (req, res) =>{
        const usuario=req.body;

        Usuario.adiciona(usuario,res);
        res.send("Post Executado");
    });

    app.put("/usuarios/:id",(req,res) =>{
        const id = parseInt(req.params.id);
        const valores = req.body;

        Usuario.alterar(id,valores,res);
    });

    app.get("/usuarios",(req, res) => {
        Usuario.obter(res);
    });

    app.delete("/usuarios/:id",(req,res) =>{
        const id =parseInt(req.params.id);

        Usuario.delete(id,res);
    });
};
