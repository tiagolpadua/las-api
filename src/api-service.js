const fetch = require("node-fetch");

const { incluirPrecoFormatado, obterDescontoCategoria } = require("./objetos");



const listarProdutos = async () => {
  const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
  if(response.status !== 200) {
    throw new Error(`${response.statusText}: ${response.status}`);
  }
  const data = await response.json();

  return data; 
};

const listarCategorias = async () => {
  const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
  if(response.status !== 200) {
    throw new Error(`${response.statusText}: ${response.status}`);
  }
  const data = await response.json();

  return data;
  
};

const listarCupons = async () => {
  const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
  if(response.status !== 200) {
    throw new Error(`${response.statusText}: ${response.status}`);
  }
  const data = await response.json();

  return data;

};

const listarPrecosFormatados = async () => {
  const data = await listarProdutos ();

  const formatedPrice = data.map(formated => {
    let formatedProduct = incluirPrecoFormatado(formated);

    formatedProduct["preco"] = formatedProduct["precoFormatado"];
    delete formatedProduct.precoFormatado;

    return formatedProduct;
  });

  return formatedPrice;
};

const listarDescontoCategories = async () => {
  const data = await listarProdutos ();

  const formatedPrice = data.map(formated => {
    let formatedProduct = incluirPrecoFormatado(formated);

    formatedProduct["preco"] = formatedProduct["precoFormatado"];
    formatedProduct["desconto"] = obterDescontoCategoria(formatedProduct["categoria"]);
    delete formatedProduct.precoFormatado;

    return formatedProduct;
  });

  return formatedPrice;
};




module.exports = { listarProdutos, listarCategorias, listarCupons, listarPrecosFormatados, listarDescontoCategories };