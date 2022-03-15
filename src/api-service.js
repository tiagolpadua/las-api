const fetch = require ("node-fetch");

function verificaErro(response) {
    if (response.status !== 200) {
        throw new Error(`${response.statusText}: ${response.status}`);
    }
}


async function listarProdutos() {
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    verificaErro(response);
    const data = await response.json();
    return data;
}


async function listarCategorias() {
    const response = await fetch ("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    verificaErro(response);
    const data = await response.json();
    return data;
}


async function cupomValido() {
    const response = await fetch ("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    verificaErro(response);
    const data = await response.json();
    return data;
}

module.exports = {
    listarProdutos,
    listarCategorias,
    cupomValido,
};