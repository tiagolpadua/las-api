const fetch = require("node-fetch");

function handleErrors (response) {
  response.status !== 200
    ? (function () {throw new Error(`${response.statusText}: ${response.status}`); })()
    : (function () { return ;})();
}

async function listaProdutos () {
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    handleErrors(response);
    return await response.json();
}

async function listaCategorias () {
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    handleErrors(response);
    return await response.json();
}

async function listaCuponsValidos () {
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    handleErrors(response);
    return await response.json();
}

module.exports = { listaProdutos ,listaCategorias, listaCuponsValidos };