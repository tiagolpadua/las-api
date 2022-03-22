const fetch = require("node-fetch");

async function listarProdutosAPI() {
  const response = await fetch(
    "https://stupefied-keller-a2c79e.netlify.app/produtos.json"
  );

  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error(`${response.statusText}: ${response.status}`);
  }
}

async function listarCategoriasAPI() {
  const response = await fetch(
    "https://stupefied-keller-a2c79e.netlify.app/categorias.json"
  );

  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error(`${response.statusText}: ${response.status}`);
  }
}

async function listarCuponsAPI() {
  const response = await fetch(
    "https://stupefied-keller-a2c79e.netlify.app/cupons.json"
  );

  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error(`${response.statusText}: ${response.status}`);
  }
}

module.exports = { listarProdutosAPI, listarCategoriasAPI, listarCuponsAPI };
