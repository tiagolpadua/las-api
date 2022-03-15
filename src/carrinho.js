const { CarrinhoDeCompras, formatarValor } = require("./objetos");
const { formataValoresDeProdutos } = require("./cli.js");
const { listarProdutos } = require("./api-service");
const { askQuestion } = require("./ask-question");

const meuCarrinho = new CarrinhoDeCompras;



function imprimirOpcoes() {
  console.log("Escolha uma opção:");
  console.log("1 - Listar produtos");
  console.log("2 - Incluir um produto no carrinho");
  console.log("3 - Visualizar carrinho");
  console.log("4 - Finalizar compra");
  console.log("x - Sair");

}


async function processarOpcao(opcao) {
  let listaDeProdutos,
    listaComPrecosFormatados,
    numeroDoProduto,
    produto,
    qtd,
    produtoParaSerIncluido,
    carrinhoFormatado
    ;

  switch (opcao) {
    case "1":

      listaDeProdutos = await listarProdutos();
      listaComPrecosFormatados = formataValoresDeProdutos(listaDeProdutos);

      console.log("lista de produtos");
      console.table(listaComPrecosFormatados);
      break;

    case "2":
      listaDeProdutos = await listarProdutos();

      numeroDoProduto = parseInt(await askQuestion("Qual o codigo do produto a ser incluido? "));
      produto = { ...listaDeProdutos[numeroDoProduto] };


      if (Object.keys(produto).length == 0) {
        console.error(`Produto não localizado: ${numeroDoProduto}`);
        return;
      }

      qtd = parseInt(await askQuestion("Quantos produtos deseja incluir ? "));

      if (!qtd) {
        console.error(`Quantidade inválida: ${qtd}`);
        return;
      }

      produtoParaSerIncluido = { ...produto, qtd, valor: produto.preco * qtd };
      meuCarrinho.incluirProduto(produtoParaSerIncluido);


      console.log(`${produto.nome} foi adicionado ao carrinho`);
      break;

    case "3":
      carrinhoFormatado = meuCarrinho.listarProdutos()
        .map(p => ({ ...p, preco: formatarValor(p.preco), valor: formatarValor(p.valor) }));

      console.table(carrinhoFormatado);
      break;
    case "4":

      break;
    default:
      break;
  }

}

async function run() {

  imprimirOpcoes();
  let opcao;
  do {
    opcao = await askQuestion("Digite o número da opção desejada ou x para sair: ");
    await processarOpcao(opcao);
  } while (opcao.toUpperCase() !== "X");

}


if (require.main === module) {
  run();
}
console.log(askQuestion);
