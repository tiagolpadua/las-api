const fetch = require("node-fetch");

function validaStatus(response) {
    if (response.status !== 200) {
        throw new Error(`${response.statusText}: ${response.status}`);
    }
}

async function listaProdutos(){
    const response = await fetch ("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    validaStatus(response);
    const data = await response.json();
    return data;
}

async function listaCategorias(){
    const response = await fetch ("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    validaStatus(response);
    const data = await response.json();
    return data;
}

async function listaCuponsValidos(){
    const response = await fetch ("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    validaStatus(response);
    const data = await response.json();
    return data;
}

module.exports ={
    listaProdutos, listaCategorias, listaCuponsValidos, 
};
