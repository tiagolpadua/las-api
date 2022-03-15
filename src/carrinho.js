const { listarProdutos } = require("./api-service");
const { formatarValor } = require("./objetos");
const { askQuestion } = require("./ask-question");
const { obterDescontoCategoria } = require("./objetos");

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
  let codProduto, produtos, produto, qtd, indice, fim, opcaob, opcaoa;

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

      qtd = await askQuestion("Quantas unidades deseja adicionar ao carrinho?");
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
    case "3":
      console.table(carrinho);
      break;
    case "4":
      indice = await askQuestion(
        "Compra finalizada, deseja aplicar um cupom de desconto?"
      );
      // valor do cupom = NULABSSA,ALURANU
      opcaoa = "NULABSSA";
      opcaob = "ALURANU";
      for (let i = 0; i <= 10; i++) {
        if (indice === opcaoa || opcaob) {
          carrinho.forEach(
            (item) => (item.desconto = obterDescontoCategoria(item.categoria))
          );
          carrinho.forEach(
            (item) => (item.preco = item.preco - 0.1 * item.preco)
          );
          carrinho.forEach(
            (item) => (item.preco = item.preco = formatarValor(item.preco))
          );
          console.table(carrinho);
          return;
        } else {
          console.error(`Cupom não localizado: ${indice}`);
          return;
        }
      }
      break;
    case "x":
      fim = await askQuestion("Digite X novamente para sair do sistema");
      return fim;
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
  processarOpcao,
};
