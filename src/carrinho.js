const readline = require("readline");
const {
  listarProdutosAPI,
  listarCategoriasAPI,
  listarCuponsAPI,
} = require("./api-service");
const { formatarPrecoProdutos } = require("./cli");

const carrinhoDeCompras = [];

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function run() {
  do {
    console.log("Escolha uma opção: ");
    console.log("1 - Listar Produtos");
    console.log("2 - Incluir Produto no Carinho");
    console.log("3 - Visualizar Carrinho");
    console.log("4 - Finalizar Compra");
    console.log("x - Sair");
    var opcao = await askQuestion("Opção: ");

    await tratarOpcao(opcao);
  } while (opcao != "x");
}

async function tratarOpcao(opcao) {
  const produtos = await listarProdutosAPI();
  const cupons = await listarCuponsAPI();

  switch (opcao) {
    case "1":
      console.table(formatarPrecoProdutos(produtos));
      return formatarPrecoProdutos(produtos);
    case "2":
      var codigoProduto = await askQuestion(
        "Qual código do produto deseja incluir no carinho? "
      );
      var qntdProduto = await askQuestion(
        "Quantas unidades deseja adicionar ao carrinho? "
      );

      addProdutoCarrinho(produtos, codigoProduto, qntdProduto);
      break;
    case "3":
      console.clear();
      console.table(carrinhoDeCompras);
      return carrinhoDeCompras;
    case "4":
      var subtotal = 0;
      var total = 0;
      var nomeCupom = await askQuestion("Qual o nome do cupom? ");
      var descontoCupom = cupons.includes(nomeCupom) ? 10 : 0;

      for (const item of carrinhoDeCompras) {
        subtotal +=
          item.preco * item.quantidade - item.preco * (item.desconto / 100);
      }
      total = subtotal - subtotal * (descontoCupom / 100);
      console.log(`Subtotal: R$ ${subtotal}`);
      console.log(`Desconto do cupom é: ${descontoCupom}%`);
      console.log(`Total: ${total}`);
      console.log("Compra finalizada com sucesso");
      return;
    default:
      return "Informe uma opção válida!";
  }
}

async function addProdutoCarrinho(listaProdutos, codigoProduto, qntdProduto) {
  var categorias = await listarCategoriasAPI();
  var produtoSelecionado = selecionaProduto(listaProdutos, codigoProduto);

  adicionarDescontoProduto(produtoSelecionado, categorias);

  produtoSelecionado = {
    id: parseInt(codigoProduto),
    ...produtoSelecionado,
  };

  produtoSelecionado["quantidade"] = parseInt(qntdProduto);
  produtoSelecionado["valor"] =
    produtoSelecionado.preco * produtoSelecionado.quantidade;

  carrinhoDeCompras.push(produtoSelecionado);
  return produtoSelecionado;
}

async function adicionarDescontoProduto(produto, categorias) {
  const indexCategoria = await categorias.findIndex(
    (categoria) => categoria.nome === produto.categoria
  );

  produto["desconto"] =
    indexCategoria !== -1 ? categorias[indexCategoria].desconto : 0;
}

function selecionaProduto(listaProdutos, indiceProduto) {
  const indice = parseInt(indiceProduto);
  return listaProdutos[indice];
}

if (require.main === module) {
  run();
}

module.exports = { tratarOpcao, addProdutoCarrinho };
