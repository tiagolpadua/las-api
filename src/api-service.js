const fetch = require("node-fetch");


async function listarProdutos() {
    const res = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    checkStatusCode(res);
    const data = await res.json();
    return data;
}


async function listarCategorias() {
    const res = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    checkStatusCode(res);
    const data = await res.json();
    return data;
}

async function listarCupons() {
    const res = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    checkStatusCode(res);
    const data = await res.json();
    return data;
}


function checkStatusCode(response) {
    if (response.status !== 200)
        throw new Error(`${response.statusText}: ${response.status}`);
}

module.exports = {
    listarProdutos,
    listarCategorias,
    listarCupons

};