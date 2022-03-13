
const {listarProdutos} = require("./api-service");
//const {listarCupons} = require("./api-service");
const { askQuestion } = require("./ask-question");
const { formatarPrecosProdutos } = require("./cli");


 
function imprimirOpcoes() {
  console.log("Escolha uma opção:");
  console.log("1 - Listar produtos");
  console.log("2 - Incluir produto no carrinho");
  console.log("3 - Visualizar carrinho");
  console.log("4 - Finalizar compra");
  console.log("x - Sair");
}

let carrinho = [];

async function processarOpcao(opcao) {
  let codProduto, produtos,  produto, qtd, precosformatados;
 


  switch (opcao) {
    case "1":
      console.log("Lista de Produtos");
      precosformatados = await listarProdutos(); 
      console.table (formatarPrecosProdutos(precosformatados));
      break;
    case "2":
      codProduto = await askQuestion(
        "Qual código de produto deseja incluir no carrinho?"
      );
      codProduto = parseInt(codProduto);
      produtos = await listarProdutos();
      produto = produtos[codProduto];

      if (!produto) {
        console.error(`Produto não localizado: ${codProduto}`);
        
      }

      qtd = await askQuestion(
        "Quantas unidades deseja adicionar ao carrinho?"
      );
      qtd = parseInt(qtd);

      if (!qtd) {
        console.error(`Quantidade inválida: ${qtd}`);
        
      }

      carrinho.push({ ...produto, qtd, valor: produto.preco * qtd });

      console.table(carrinho);
      break;
    case "3":

      console.clear();
      console.table(carrinho);
      return carrinho;

    default: 
    return "Informe uma opção válida!";
      
  }
}


async function run() {
  
  imprimirOpcoes();
  let opcao;
  do {
    opcao = await askQuestion("Escolha uma opção:");
    await processarOpcao(opcao);
  } while (opcao.toUpperCase() !== "X");
}



if (require.main === module) {
  run();
}

module.exports = {
  imprimirOpcoes,
  processarOpcao
};