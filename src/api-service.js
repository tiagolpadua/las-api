const fetch = require("node-fetch");



const listProducts = async () => {
  const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/produtos.json");
  if(response.status !== 200) {
    throw new Error(`${response.statusText}: ${response.status}`);
  }
  const data = await response.json();

  return data;
  
};

const listCategories = async () => {
  const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/categorias.json");
  if(response.status !== 200) {
    throw new Error(`${response.statusText}: ${response.status}`);
  }
  const data = await response.json();

  return data;
  
};

const listCupons = async () => {
  const response = await fetch("https://stupefied-keller-a2c79e.netlify.app/cupons.json");
  if(response.status !== 200) {
    throw new Error(`${response.statusText}: ${response.status}`);
  }
  const data = await response.json();

  return data;

};



module.exports = { listProducts, listCategories, listCupons };