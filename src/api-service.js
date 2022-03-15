const fetch = require("node-fetch");
const CATEGORIAS = [
    { nome: "Alimentação", desconto: 15 },
    { nome: "Infantil", desconto: 30 },
  ];

async function listarProdutos(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
    verificarErros(response);
    const data = await response.json();
    return data;   
}

function verificarErros(response) {
    if (response.status !== 200) {
        throw new Error(`${response.statusText}: ${response.status}`);
    }
}

async function listarCategorias(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
    verificarErros(response);
    const data = await response.json();
    return data;      
}

async function listarCupons(){
    const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
    verificarErros(response);    
    const data = await response.json();
    return data;         
}

async function listarProdutosFormatados(){
    let resultado = await listarProdutos();        
    resultado.map(obj => {obj.preco = obj.preco.toFixed(2);
    });
    return resultado;
}

function obterDescontoCategoria(nomeCategoria) {
    if (nomeCategoria === CATEGORIAS[0].nome) {
      return 30;
    } else if (nomeCategoria === CATEGORIAS[1].nome) {
      return 15;
    } else {
      return 0;
    }
  }

  async function produtoComDesconto(){
    let produto = await listarProdutos();
    let resultado = [];
    produto.forEach(objeto => {
       resultado.push({...objeto, desconto: obterDescontoCategoria(objeto.categoria)}) ;        
    });
    return resultado;
    
}

module.exports = {
    listarProdutos, listarCategorias, listarCupons, listarProdutosFormatados, produtoComDesconto
};
    


