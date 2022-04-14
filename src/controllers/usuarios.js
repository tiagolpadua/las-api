module.exports = app => {
    app.get("/usuarios/:id", (req, res) => res.send({
        id: req.params.id
    }));

    app.post("/usuarios/:id", (req, res) => res.send({
        id: req.params.id
    }));

       

};
