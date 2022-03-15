
const { askQuestion } = require("./ask");
const { precoProdutoFormatado } = require("./cli");
const { listarProdutos } = require("./api-service");

function exibeMenu() {
  console.log("*************************************************************");
  console.log("      Menu de Opções");
  console.log("  1 - Liste os produtos.");
  console.log("  2 - Inclua um produto no carrinho.");
  console.log("  3 - Visualize o carrinho.");
  console.log("  4 - Insira cupom e finaliza compra.");
  console.log("  x - para sair.");
  console.log("*************************************************************");
}
let CARRINHO = [];

function calculaFinalCompra(carrinho, valor) {
  let parcial = 0, total = 0;
  parcial = carrinho.reduce((subtotal, atual) => {
    return subtotal + atual.valor;
  }, 0);
  valor = valor / 100;
  total = parcial - (parcial * valor);

  console.log(`Valor Total R$${total}`);

}

function aplicaDescontoCategoria(carrinho, cupom) {
  let item, retorno = 0;
  if (cupom === "NULABSSA" || cupom === "ALURANU") {
    for (item of carrinho) {
      if (item.categoria === "Infantil") {
        item.valor -= item.valor / 100 * 30;
      }
      if (item.categoria === "Alimentação") {
        item.valor -= item.valor / 100 * 15;
      }
      retorno += item.valor;
    }
  }
  console.log(`Valor com desconto da categoria: R$${retorno}`);
}


async function processaEscolha(opcao) {
  let qtd, item, codigoProduto, produtos, nomeCupom, valorDesconto;

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
      console.table(precoProdutoFormatado(CARRINHO));
      break;

    case "3":
      CARRINHO.length <= 0 ? console.error("Ainda não há itens no carrinho.") : console.table(precoProdutoFormatado(CARRINHO));
      break;

    case "4":
      if (CARRINHO.length > 0) {
        nomeCupom = await askQuestion("Digite o nome do seu cupom: ");
        // nomeCupom = nomeCupom.toUpperCase();
        valorDesconto = await askQuestion("Digite o valor de desconto do cupom: ");
        valorDesconto = parseInt(valorDesconto);
        aplicaDescontoCategoria(CARRINHO, nomeCupom);
        console.log("Concluir compra:");
        console.table(precoProdutoFormatado(CARRINHO));
        calculaFinalCompra(CARRINHO, valorDesconto);
        console.log("Compra finalizada com sucesso!");
      }
      else {
        console.error("Ainda não há itens no carrinho.");
      }
      break;

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
