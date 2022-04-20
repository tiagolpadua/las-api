const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Olá Mundo! kkk");
});

app.listen(port, () => {
  console.log(`LAS-API ouvindo na porta: ${port}`);
});
