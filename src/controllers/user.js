const User = require("../models/user");

module.exports = app => {
  app.get("/user", (_, res) => {
    User.list(res);
  });

  app.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);

    User. searchById(id, res);
  });

  app.post("/user", (req, res) =>{
    const User = req.body;
    User.add(res);
  });

  app.patch("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    User.alter(id, valores, res);
  });

  app.delete("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    User.delete(id, res);
  });
};