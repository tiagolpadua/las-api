module.exports = (app) => {
  app.get("/usuarios", (req, res) =>
    res.send("Você está em usuarios vamos juntos")
  );
};
