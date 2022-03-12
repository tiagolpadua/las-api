const { listarProdutos } = require("./api-service");
const { askQuestion } = require("./ask-question");
const { formatarPreco } = require("./cli");

let carrinho = [];

function mostraOpcoes(){
  console.log("Escolha uma opção:");
  console.log("1 - Listar produtos");
  console.log("2 - Incluir produto no carrinho");
  console.log("3 - Visualizar carrinho");
  console.log("4 - Finalizar compra");
  console.log("x - Sair");
}

function formatarPrecoProdutos(carrinho) {
  carrinho.forEach((elemento) => {
    elemento.descontoDe = formatarPreco(elemento.descontoDe);
    elemento.valor = formatarPreco(elemento.valor);
    elemento.total = formatarPreco(elemento.total);
  });
  return carrinho;
}

async function processarOpcao(opcao) {
  let codigoProduto, produtos, produto, quantidade, descontoDe, total;
  switch(opcao){
    case "1":
      console.log("Lista de Produtos");
      console.table(await listarProdutos());
      break;
    case "2":
      codigoProduto = await askQuestion("Qual produto deseja incluir? Por favor digitar o codigo. ");
      codigoProduto = parseInt(codigoProduto);
      produtos = await listarProdutos();
      produto = produtos[codigoProduto];
      if(!produto){
        console.error(`Produto não localizado: ${codigoProduto}`);
      }
      quantidade = await askQuestion("Quantos produtos deseja incluir? ");
      quantidade = parseInt(quantidade);
      if(quantidade < 0){
        console.error(`Quantidade invalida ${quantidade}`);
      }
      carrinho.push({...produto, quantidade, valor: parseFloat(produto.preco*quantidade).toFixed(2).replace(".", ","), descontoDe,  total});
      if(quantidade && codigoProduto){
        console.log("Produto adicionado ao carrinho");
      }
      break;
    case "3":
      console.log("Carrinho");
      console.table(carrinho);
      break;
      
    case "4":
      console.log("Total da compra");  
      carrinho.forEach((elemento) => {
        if(elemento.categoria === "Infantil"){
          elemento.valor = parseFloat(elemento.valor);
          elemento.total = (elemento.valor-((elemento.valor*30)/100)); 
          elemento.descontoDe = (elemento.valor-elemento.total);
          console.log(elemento.total);
          // carrinho = formatarPrecoProdutos(carrinho);
        }else if(elemento.categoria === "AlimentaÃ§Ã£o"){
          elemento.valor = parseFloat(elemento.valor);
          elemento.total = (elemento.valor-((elemento.valor*15)/100)); 
          elemento.descontoDe = (elemento.valor-elemento.total);
          // carrinho = formatarPrecoProdutos(carrinho);
        }else{
          elemento.total = elemento.valor;
          elemento.descontoDe = 0;  
        }      
      });
     console.table(carrinho);
     
  }
}


async function run() {
  mostraOpcoes();
  let opcao;
  do{
    opcao = await askQuestion("Escolha uma opção:");
    await processarOpcao(opcao);
  }while(opcao.toLowerCase().trim() !== "x");
}

if (require.main === module) {
  run();
}

module.exports = {
  mostraOpcoes,
  run,
  processarOpcao,
  formatarPrecoProdutos
};