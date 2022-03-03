const fetch = require("node-fetch");

async function listaProdutos() {
  let resposta = await fetch(
    "https://stupefied-keller-a2c79e.netlify.app/produtos.json"
  );
  if (resposta.status !== 200) {
    throw new Error(`${resposta.statusText}: ${resposta.status}`);
  }
  let dadosProdutos = await resposta.json();
  return dadosProdutos;
}

async function listaCategorias() {
  let resposta = await fetch(
    "https://stupefied-keller-a2c79e.netlify.app/categorias.json"
  );
  if (resposta.status !== 200) {
    throw new Error(`${resposta.statusText}: ${resposta.status}`);
  }
  let dadosCategorias = await resposta.json();
  return dadosCategorias;
}

async function listaCupons() {
  let resposta = await fetch(
    "https://stupefied-keller-a2c79e.netlify.app/cupons.json"
  );
  if (resposta.status !== 200) {
    throw new Error(`${resposta.statusText}: ${resposta.status}`);
  }
  let dadosCupons = await resposta.json();
  return dadosCupons;
}

module.exports = {
  listaProdutos,
  listaCategorias,
  listaCupons,
};
