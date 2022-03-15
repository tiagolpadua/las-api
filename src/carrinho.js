const { listaProdutos } = require("./api-service");
const { askQuestion } = require("./ask-question");
const { formatarValor } = require("./objetos");

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

let carrinho = [];

async function processarOpcao(opcao) {
  let codProduto, produto, produtos, qtd, cupom;
  let totalCompra = 0;
  
  switch (opcao) {
    case "1":
      console.log("Lista Produtos");
      console.table(await listaProdutos());
      break;
    case "2":
      codProduto = await askQuestion(
        "Qual código de produto deseja incluir no carrinho?"
      );
      codProduto = parseInt(codProduto);
      produtos = await listaProdutos();
      produto = produtos[codProduto];

      if (!produto) {
        console.error(`Produto não localizado: ${codProduto}`);
        return;
      }
      
      qtd = await askQuestion(
        "Quantas unidades deseja adicionar ao carrinho?"
      );
      qtd = parseInt(qtd);

      if (!qtd) {
        console.error(`Quantidade Inválida: ${qtd}`);
        return;
      }

      carrinho.push({ ...produto, qtd, valor: qtd * produto.preco });

      console.table(carrinho);
      break;
    case "3":
      console.table(carrinho.listaProdutos());
      break;
    case "4":
      totalCompra = await carrinho.subtotal();
      cupom = await askQuestion("Digite um cupom válido:");
      if(cupom.length === 0){
        console.log("Total da compra: " + formatarValor(totalCompra));
        break;
      }

      carrinho.definirCupom(cupom.toUpperCase());
      totalCompra = await carrinho.total();
      console.log("Total da compra: " + formatarValor(totalCompra));
      break;
    case "X":
      console.log("Encerrando! Até a próxima...");
      break;
    default:
      console.log("Opção Inválida! Tente novamente...");
      break;            
  }
}

function imprimirOpcoes() {
  console.log("Escolha uma opção:");
  console.log("1 - Listar produtos");
  console.log("2 - Incluir produto no carrinho");
  console.log("3 - Visualizar carrinho");
  console.log("4 - Finalizar compra");
  console.log("x - Sair");
}

module.exports = {
  imprimirOpcoes,
  processarOpcao
};