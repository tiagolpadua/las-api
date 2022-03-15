const {
  listarProdutosAPI,
  listarCategoriasAPI,
  listarCuponsAPI,
} = require("./api-service");
const askQuestion = require("./ask-question");
const { formatarPrecoProdutos } = require("./cli");

const carrinhoDeCompras = [];

async function run() {
  do {
    mostrarMenu();
    var opcao = await askQuestion("Opção: ");
    await tratarOpcao(opcao);
  } while (opcao != "x");
}

function mostrarMenu() {
  console.log("Escolha uma opção:");
  console.log("1 - Listar Produtos");
  console.log("2 - Incluir Produto no Carinho");
  console.log("3 - Visualizar Carrinho");
  console.log("4 - Finalizar Compra");
  console.log("x - Sair");
}

async function tratarOpcao(opcao) {
  const produtos = await listarProdutosAPI();
  const cupons = await listarCuponsAPI();

  switch (opcao) {
    case "1":
      console.table(formatarPrecoProdutos(produtos));
      break;

    case "2":
      var codigoProduto = await askQuestion(
        "Qual código do produto deseja incluir no carinho? "
      );
      var qntdProduto = await askQuestion(
        "Quantas unidades deseja adicionar ao carrinho? "
      );
      if (codigoProduto < 0 || codigoProduto > produtos.length - 1) {
        return undefined;
      }
      if (qntdProduto < 0 || isNaN(qntdProduto)) {
        return undefined;
      }
      var categorias = await listarCategoriasAPI();
      var produtoSelecionado = selecionaProduto(produtos, codigoProduto);

      var categoriaProduto = await categorias.find(
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
      console.table(produtoSelecionado);
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

module.exports = {
  tratarOpcao,
  finalizarCompra,
  mostrarMenu,
};
