const { listarProdutos } = require("./api-service");
const { CarrinhoDeCompras } = require("./objetos.js");
const { askQuestion } = require("./ask-question.js");

function exibirOpcoes() {
  console.log("1 - Liste os produtos");
  console.log("2 - Inclua um produto no carrinho");
  console.log("3 - Visualize o carrinho");
  console.log("4 - Finalizar a compra");
  console.log("x - Saia do sistema");
}

const carrinho = new CarrinhoDeCompras();

async function processarOpcao(opcao) {
  let codProduto, produtos, produto, qtde, cupom;
  switch (opcao) {
    case "1":
      console.log("Lista de produtos:");
      console.table(await listarProdutos());
      break;
    case "2":
      codProduto = await askQuestion("Qual código de produto deseja incluir no carrinho?");
      codProduto = parseInt(codProduto);
      produtos = await listarProdutos();
      produto = produtos[codProduto];
      if (!produto) {
        console.error(`Produto não encontrado: ${codProduto}`);
        return;
      }
      qtde = await askQuestion("Quantidade que deseja incluir no carrinho?");
      qtde = parseInt(qtde);
      if (!qtde) {
        console.error(`Quantidade inválida: ${qtde}`);
        return;
      }
      carrinho.incluirProduto({ ...produto, quantidade: qtde, valor: produto.preco * qtde });
      break;
    case "3":
      if (!carrinho.produtos) console.error("Ainda não há itens no carrinho.");
      else console.table(carrinho.produtos);
      break;
    case "4":
      console.log(`Subtotal: ${carrinho.subtotal()}`);
      cupom = await askQuestion("Digite o cupom: ");
      carrinho.definirCupom(cupom.toUpperCase());
      console.log(`Total da compra com descontos: ${carrinho.total()}`);
      break;
    default:
      break;
  }
}

async function run() {
  exibirOpcoes();
  let opcao;
  do {
    opcao = await askQuestion("Escolha uma opção:\n");
    await processarOpcao(opcao);
  } while (opcao.toUpperCase() !== "X");
}

if (require.main === module) {
  run();
}

module.exports = {
  exibirOpcoes,
  processarOpcao
};

