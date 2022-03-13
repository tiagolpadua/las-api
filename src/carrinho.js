const { askQuestion } = require("./ask-question");
const { listarProdutos, listarCupons, listarCategorias } = require("./api-service");


async function run() {
  do {
    mostrarOpcoes();
    var opcao = await askQuestion("Opção: ");
    await processarOpcao(opcao);
  } while (opcao != "x");
}

function mostrarOpcoes() {
  console.log(`
    Escolha uma opção:
    1 - Listar Produtos
    2 - Incluir Produto no Carinho
    3 - Visualizar Carrinho
    4 - Finalizar Compra
    x - Sair
  `);
}

let carrinho = [];

async function processarOpcao(opcao) {
  let codProduto, qntdProduto, nomeCupom, descontoCupom, comprovanteCompraFinalizada;
  const produtos = await listarProdutos();
  const cupons = await listarCupons();

  let retorno;

  switch (opcao) {
    case "1":
      retorno = console.table(produtos);
      break;
    case "2":
      codProduto = await askQuestion(
        "Qual código do produto deseja incluir no carinho? "
      );
      qntdProduto = await askQuestion(
        "Quantas unidades deseja adicionar ao carrinho? "
      );

      retorno = addProdutoCarrinho(produtos, codProduto, qntdProduto);
      break;
    case "3":
      console.clear();
      console.table(carrinho);
      retorno = carrinho;
      break;
    case "4":
      nomeCupom = await askQuestion("Qual o nome do cupom? ");
      descontoCupom = cupons.includes(nomeCupom) ? 10 : 0;

      comprovanteCompraFinalizada = finalizarCompra(
        carrinho,
        descontoCupom
      );
      retorno = console.log(comprovanteCompraFinalizada);
      break;
    default:
      retorno = "Informe uma opção válida!";
      break;
  }

  return retorno;
}

async function addProdutoCarrinho(listaProdutos, codProduto, qntdProduto) {
  if (codProduto < 0 || codProduto > listaProdutos.length - 1) {
    return undefined;
  }

  if (qntdProduto < 0 || isNaN(qntdProduto)) {
    return undefined;
  }

  let categorias = await listarCategorias();
  let produtoSelecionado = selecionaProduto(listaProdutos, codProduto);

  const categoriaProduto = await categorias.find(
    (categoria) => categoria.nome === produtoSelecionado.categoria
  );

  produtoSelecionado["desconto"] =
    categoriaProduto !== undefined ? categoriaProduto.desconto : 0;

  produtoSelecionado = {
    id: parseInt(codProduto),
    ...produtoSelecionado,
  };

  produtoSelecionado["quantidade"] = parseInt(qntdProduto);
  produtoSelecionado["valor"] =
    produtoSelecionado.preco * produtoSelecionado.quantidade;

  carrinho.push(produtoSelecionado);
  return produtoSelecionado;
}

function finalizarCompra(carrinhoDeCompras, descontoCupom) {
  let subtotal = 0;
  let total = 0;
  let comprovanteCompra = "";

  for (const item of carrinhoDeCompras) {
    subtotal +=
      item.preco * item.quantidade - item.preco * (item.desconto / 100);
  }
  total = subtotal - subtotal * (descontoCupom / 100);
  comprovanteCompra += `Subtotal: R$ ${subtotal}\n`;
  comprovanteCompra += `Desconto do cupom é: ${descontoCupom}\n`;
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
  processarOpcao,
  addProdutoCarrinho,
  finalizarCompra,
  mostrarOpcoes
};