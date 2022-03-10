const fetch = require("node-fetch");

function verificarErros(response) {
    if (response.status !== 200) {
        throw new Error(`${response.statusText}: ${response.status}`);
    }
}

async function listarProdutos() {
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    verificarErros(response);
    const data = await response.json();
    return data;
}


async function listarCategorias() {
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    verificarErros(response);
    const data = await response.json();
    return data;
}

async function listarCupons() {
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    verificarErros(response);
    const data = await response.json();
    return data;
}

module.exports = {
    listarProdutos, listarCategorias, listarCupons
};
