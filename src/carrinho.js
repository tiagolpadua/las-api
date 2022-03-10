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
    console.log(
      "Escolha uma opção: \n" +
        "1 - Listar Produtos\n" +
        "2 - Incluir Produto no Carinho\n" +
        "3 - Visualizar Carrinho\n" +
        "4 - Finalizar Compra\n" +
        "x - Sair"
    );
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
      var nomeCupom = await askQuestion("Qual o nome do cupom? ");
      var descontoCupom = cupons.includes(nomeCupom) ? 10 : 0;

      var comprovanteCompraFinalizada = finalizarCompra(
        carrinhoDeCompras,
        descontoCupom
      );
      console.log(comprovanteCompraFinalizada);
      break;
    default:
      return "Informe uma opção válida!";
  }
}

async function addProdutoCarrinho(listaProdutos, codigoProduto, qntdProduto) {
  if (codigoProduto < 0 || codigoProduto > listaProdutos.length - 1) {
    return undefined;
  }
  if (qntdProduto < 0 || isNaN(qntdProduto)) {
    return undefined;
  }
  var categorias = await listarCategoriasAPI();
  var produtoSelecionado = selecionaProduto(listaProdutos, codigoProduto);

  const categoriaProduto = await categorias.find(
    (categoria) => categoria.nome === produtoSelecionado.categoria
  );

  produtoSelecionado["desconto"] =
    categoriaProduto !== undefined ? categoriaProduto.desconto : 0;

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

function finalizarCompra(carrinhoDeCompras, descontoCupom) {
  var subtotal = 0;
  var total = 0;
  var comprovanteCompra = "";

  for (const item of carrinhoDeCompras) {
    subtotal +=
      item.preco * item.quantidade - item.preco * (item.desconto / 100);
  }
  total = subtotal - subtotal * (descontoCupom / 100);
  comprovanteCompra += `Subtotal: R$ ${subtotal}\n`;
  comprovanteCompra += `Desconto do cupom é: ${descontoCupom}%\n`;
  comprovanteCompra += `Total: ${total}\n`;
  comprovanteCompra += "Compra finalizada com sucesso\n";
  return comprovanteCompra;
}

function selecionaProduto(listaProdutos, indiceProduto) {
  const indice = parseInt(indiceProduto);
  return listaProdutos[indice];
}

if (require.main === module) {
  run();
}

module.exports = { tratarOpcao, addProdutoCarrinho, finalizarCompra };
