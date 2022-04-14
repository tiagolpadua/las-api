module.exports = app => {
    app.get("/usuarios/:id", (req, res) => res.send({
        id: req.params.id
    }));

       

};
