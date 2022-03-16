const {listarProdutos} = require("./api-service");
const { askQuestion } = require("./ask-question");



function mostraOpcoes(){
  console.log("Escolha uma opção:");
  console.log("1 - Listar Produtos");
  console.log("2 - Incluir Produto no Carrinho");
  console.log("3 - Visualizar Carrinho");
  console.log("4 - Finalizar Compra");
  console.log("X - Sair");
}


let carrinho = [];

async function processarOpcao(opcao){
  let codigo, produto,quantidade;

  let produtos = await listarProdutos();

  switch(opcao){
    case "1":
      console.log("\n Lista de Produtos");
      console.table(await listarProdutos());
      break;
    case "2":
      codigo = await askQuestion("Digite o código do produto que deseja incluir no carrinho: ");
      codigo = parseInt(codigo);
      produto = produtos[codigo];

      if(!produto){
        console.error(`Produto não localizado: ${codigo}`);
        return;
      }

      quantidade = await askQuestion("Digite a quantidade de produtos que deseja incluir no carrinho: ");
      quantidade = parseInt(quantidade);

      if(!quantidade){
        console.error(`Quantidade inválida: ${quantidade}`);
        return;
      }

      carrinho.push( {...produto, quantidade, valor: quantidade * produto.preco});
      console.table(carrinho);
      break;
    case "3":
      if(carrinho.length === 0){
        console.error(`O carrinho está vazio: ${carrinho.length}`);
        return;
      }
      console.table(carrinho);
      break;
    default:
      break;
  }
}



async function run() {
  // TODO
  mostraOpcoes();
  let opcao;
  do{
    opcao = await askQuestion("Escolha uma opção: ");
    await processarOpcao(opcao);
    
  }while(opcao.toUpperCase() !== "X");
}

if (require.main === module) {
  run();
}


module.exports = {
  mostraOpcoes,
  processarOpcao
};