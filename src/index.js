const express = require("express");
const conn = require("./services/conexao");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Olá Mundo!");
});



app.listen(port, () => {
  console.log(`LAS-API ouvindo na porta: ${port}`);
});
