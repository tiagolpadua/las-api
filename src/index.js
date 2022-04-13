const rotasUsuarios = require("./controllers/usuarios");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
rotasUsuarios(app);

app.listen(port, () => {
  console.log(`LAS-API ouvindo na porta: ${port}`);
});
