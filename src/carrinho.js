const { GET } = require("./api-service");
const { askQuestion } = require("./ask-question");

function imprimirOpcoes() {
  console.log("Escolha uma opção:");
  console.log("1 - Listar produtos");
  console.log("2 - Incluir produto no carrinho");
  console.log("3 - Visualizar carrinho");
  console.log("4 - Finalizar compra");
  console.log("x - Sair");
}

const escolherProduto = async function () {
  const codProduto = await askQuestion(
    "Qual código de produto deseja incluir no carrinho?"
  );
  const produtos = await GET("produtos");
  const produto = produtos[+codProduto];
  if (!produto) {
    console.error(`Produto não localizado: ${codProduto}`);
    return escolherProduto();
  }
  return produto;
};

const quantidadeProduto = async function () {
  const qtd = await askQuestion("Digite a quantidade a ser adicionada: ");
  if (!qtd) {
    console.error(`Quantidade inválida: ${qtd}`);
    return quantidadeProduto();
  }
  return qtd;
};

const incluirProduto = function (produto, qtd) {
  carrinho.push({ ...produto, qtd, valor: produto.preco * qtd });
  return carrinho;
};

const criarPromo = async function () {
  const cupons = await GET("cupons");
  const randPos = Math.round(Math.random() * (1 - 0) + 0);
  const desconto = Math.round(Math.random() * (25 - 10) + 10);
  return { nome: cupons[randPos], desconto: desconto };
};

const calculaTotal = function (precoParcial, cupom) {
  return Math.round(precoParcial - (precoParcial * cupom.desconto) / 100);
};

const finalizar = async function (carrinho) {
  if (carrinho.length === 0) {
    console.error("O carrinho está vazio, você deve adicionar ao menos um item.");
    return imprimirOpcoes();
  } else {
    const precoParcial = carrinho.reduce((a, b) => a + b.valor, 0);
    console.log(`Subtotal: R$${precoParcial},00`); 
    const cupom = await criarPromo();
    console.log(`CUPOM: ${cupom.nome} : DESCONTO: ${cupom.desconto}`);
    const total = calculaTotal(precoParcial, cupom);
    console.log(`Total: R$${total},00`);
  }
  return processarOpcao("x");
};

let carrinho = [];

async function processarOpcao(opcao) {
  switch (opcao) {
    case "1":
      console.log("Lista de Produtos");
      console.table(await GET("produtos"));
      break;
    case "2": {
      const produto = await escolherProduto();
      let qtd = await quantidadeProduto();
      const test = incluirProduto(produto, +qtd);
      console.table(test);
      break;
    }
    case "3":
      console.table(carrinho);
      break;
    case "4":
      finalizar(carrinho);
      break;
    case "x":
      return process.exit();
    default:
      return console.log("Favor selecionar uma opção válida.");
  }
}

async function run() {
  imprimirOpcoes();
  let opcao;
  do {
    opcao = await askQuestion("Escolha uma opção: ");
    await processarOpcao(opcao);
  } while (opcao.toUpperCase() !== "X");
}

if (require.main === module) {
  run();
}

module.exports = {
  imprimirOpcoes,
  processarOpcao,
  escolherProduto,
};
