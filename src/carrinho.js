

const { listarProdutos } = require("./api-service");
const { askQuestion } = require("./ask-question");


function imprimirOpcoes(){
  console.log("1 - Listar Produtos");
  console.log("2 - Inclua um produto no carrinho");
  console.log("3 - Visualize o carrinho");
  console.log("4 - Finalize a compra e pergunte pelo cupom de desconto");
  console.log("x - Saia do sistema");
}

let carrinho= [];

async function processarOpcao(opcao){
  let codProduto, produto, produtos, qtd;
  switch(opcao){
    case "1":
      console.log("Lista de Produtos");
      console.table(await listarProdutos());
      break;
    case "2":
      codProduto = await askQuestion("Qual código de produto deseja incluir no carrinho?");
      codProduto = parseInt(codProduto);
      produtos = await listarProdutos();
      produto = produtos[codProduto];

      if (!produto){
        console.error(`Produto não localizado: ${codProduto}`);
        return;
      }

      qtd = await askQuestion("Quantas unidades deseja adicionar ao carrinho?");
      qtd = parseInt(qtd);

      if(!qtd){
        console.error(`Quantidade invalida: ${qtd}`);
        return;
      }

      carrinho.push({...produto, qtd, valor: produto.preco * qtd});

      console.table(carrinho);


      break;
    default:
      break;
  }
}

async function run() {
  imprimirOpcoes();
  let opcao;
  do{
    opcao = await askQuestion("Escolha uma opção:");
    await processarOpcao(opcao);
  }while(opcao.toUpperCase() !== "X");
   
}

if (require.main === module) {
  run();
}

module.exports = {
imprimirOpcoes,
processarOpcao
};