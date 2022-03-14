
const { askQuestion } = require("./ask");
const { listarProdutos } = require("./api-service");

function exibeMenu() {
  console.log("*************************************************************");
  console.log(" Menu de Opções");
  console.log("  1 - Liste os produtos");
  console.log("  2 - Inclua um produto no carrinho");
  console.log("  3 - Visualize o carrinho");
  console.log("  4 - Finalize a compra e pergunte pelo cupom de desconto");
  console.log("  x - para sair");
  console.log("*************************************************************");
}
let CARRINHO = [];

// function encerraCompra(carrinho,cupom, valor) {
//   let parcial, total;
//   parcial = carrinho.reduce((subtotal, atual) => {
//     return subtotal + atual.valor;
//   }, 0);
//   parcial = parseInt(parcial);
//   parcial = parcial - (parcial * (valor / 100));
//   total = parcial;
//   console.log(`Total R$ ${total}`);
//   console.log("Compra finalizada com sucesso!");
// }


async function processaEscolha(opcao) {
  let qtd, item, codigoProduto, produtos;

  switch (opcao) {
    case "1":
      console.clear();
      console.log("Lista de Produtos: ");
      console.table(await listarProdutos());
      break;

    case "2":
      codigoProduto = await askQuestion("Digite o index do produto que deseja incluir: ");
      produtos = await listarProdutos();
      codigoProduto = parseInt(codigoProduto);
      item = produtos[codigoProduto];
      if (!item) {
        console.error(`Produto ${codigoProduto} não localizado.`);
        return;
      }
      qtd = await askQuestion(
        "Quantas unidades deseja adicionar ao carrinho? ");
      qtd = parseInt(qtd);
      if (!qtd) {
        console.error(`Quantidade inválida: ${qtd}`);
        return;
      }
      CARRINHO.push({ ...item, qtd, valor: item.preco * qtd });
      console.table(CARRINHO);
      break;

    case "3":
      CARRINHO.length <= 0 ? console.error("Ainda não há itens no carrinho.") : console.table(CARRINHO);
      break;

    // case "4":
    //   console.log("Concluir compra");
    //   console.table(CARRINHO);
    //   console.log(`Subtotal ${CARRINHO.valor}`);
    //   nomeCupom = await askQuestion("Digite o nome do seu cupom: ");
    //   nomeCupom = nomeCupom.toUpperCase();
    //   valorDesconto = await askQuestion("Digite o valor de desconto do cupom: ");
    //   valorDesconto = parseInt(valorDesconto);
    //   encerraCompra(CARRINHO, valorDesconto);
    //   break;

    case "x":
      console.clear();
      console.log("Sistema de compras NuLab/LAS finalizado!");
      break;

    default:
      throw new Error("Opção inválida.");
  }
}
async function run() {
  exibeMenu();
  let escolha;
  while (escolha !== "x") {
    escolha = await askQuestion("Digite sua opção: ");
    await processaEscolha(escolha);
  }
}
if (require.main === module) {
  run();
}

module.exports = { exibeMenu, processaEscolha };
