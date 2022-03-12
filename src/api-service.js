const fetch = require("node-fetch");

const listarProdutos = async () => {
        const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
        verificarResposta(response);
        const data = await response.json();
        return data;
};

const listarCategorias = async () => {
        const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
        verificarResposta(response);
        const data = await response.json();
        return data;
};

const listarCupons = async () => {
        const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
        verificarResposta(response);
        const data = await response.json();
        return data;
};

const verificarResposta = (response) => {
    if(response.status !== 200){
        throw new Error(`${response.statusText}: ${response.status}`);
    }
};

module.exports = {
    listarProdutos,
    listarCategorias,
    listarCupons,
};