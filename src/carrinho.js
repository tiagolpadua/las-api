const { processarOpcao, inserirDescontos } = require("./cli.js");
const { formatarValor } = require("./objetos");
const { askQuestion } = require("./ask-question");

async function incluirProduto(produtos, carrinho) {
  let index = await askQuestion("Qual código do produto que deseja incluir no carrinho? ");
  let qtd = await askQuestion("Quantas unidades deseja adicionar no carrinho? ");
  
  let item = {
    id: Number(index),
    ...produtos[index],
    qtd: Number(qtd), 
    valor: produtos[index].preco * qtd
  };

  carrinho.push(item);
  console.log("Produto incluído com sucesso no carrinho.");
  return carrinho;
}


async function concluirCompra(carrinho) {

  console.log("Concluir compra: ");
      
  const descontoCategoria = carrinho.map(item => 
    item.desconto ? item.valor - (item.valor * item.desconto/100) : item.valor);
    
  const subtotal = descontoCategoria.reduce((soma, el) => soma + el, 0);
  console.log(`Subtotal: ${formatarValor(subtotal)}`);
    
  let cupom = await askQuestion("Qual o nome do cupom? ");
  cupom = cupom.toUpperCase();

  const total = cupom === "ALURANU" || cupom === "NULABSSA" ? 
  subtotal - (subtotal * 0.1) 
  : subtotal;

  console.log(`Total: ${formatarValor(total)}`);
  console.log("Compra finalizada com sucesso!");
}



function mostrarMenu() {
  console.log("Escolha uma opção:");
  console.log("1 - Listar produtos");
  console.log("2 - Incluir produto no carrinho");
  console.log("3 - Visualizar carrinho");
  console.log("4 - Finalizar compra");
  console.log("x - Sair");
}

async function tratarOpcao(opcao, carrinho) {

  const produtos = await processarOpcao("produtos");
  inserirDescontos(produtos);

  switch (opcao) {

    case "1":
      console.log("Lista de Produtos: ");
      console.table(produtos);
      break;

    case "2":
      await incluirProduto(carrinho, produtos);
      break;
  

    case "3": console.table(carrinho); break;

    case "4":
      await concluirCompra(carrinho);
      break;
  }
}

async function run() {
  // TODO
  let opcao;
  const carrinho = [];

  do { 
    mostrarMenu();
    opcao = await askQuestion("Opção: ");
    await tratarOpcao(opcao, carrinho);

  } while (opcao !== "x");
}

if (require.main === module) {
  run();
}



module.exports = {
  mostrarMenu,
  tratarOpcao
};