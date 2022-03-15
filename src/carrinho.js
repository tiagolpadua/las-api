const { listarProdutos } = require("./api-service");
const { askQuestion } = require("./ask-Question");

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
  let codProduto, produtos, produto, qtd;

  switch (opcao) {
    case "1":
      console.log("Lista de Produtos");
      console.table(await listarProdutos());
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
        return;
      }

      qtd = await askQuestion(
        "Quantas unidades deseja adicionar ao carrinho?"
      );
      qtd = parseInt(qtd);

      if (!qtd) {
        console.error(`Quantidade inválida: ${qtd}`);
        return;
      }
      
      carrinho.push({ ...produto, qtd, valor: produto.preco * qtd });

      console.table(carrinho);
      break;
    default:
      break;
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