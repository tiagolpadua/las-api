const { listarProdutos, listarCategorias } = require("./api-service");
const { formatarValor } = require("./objetos");

function precoProdutoFormatado(listaProdutos) {
  let produtosFormatados = JSON.parse(JSON.stringify(listaProdutos));
  produtosFormatados.forEach((produto) => produto.preco = formatarValor(produto.preco));
  return produtosFormatados;
}

function insereDesconto(categorias, produtos) {
  let resultado = produtos.map(item => {
    const categoriaAtual = categorias.find(cat => cat.nome === item.categoria);
    return { ...item, desconto: categoriaAtual ? categoriaAtual.desconto : 0 };
  });
  return resultado;
}

async function processarOpcao(opcao) {

  let saida, produtosFormatados, categoria;

  switch (opcao) {
    case "produtos":
      saida = await listarProdutos();
      break;

    case "preco-formatado":
      saida = precoProdutoFormatado(await listarProdutos());
      break;

    case "categorias":
      saida = await listarCategorias();
      break;

    case "descontos":
      categoria = await listarCategorias();
      produtosFormatados = precoProdutoFormatado(await listarProdutos());
      saida = insereDesconto(categoria, produtosFormatados);
      break;

    case undefined:
      throw new Error("Informe uma opção.");

    default:
      throw new Error(`Opção ${opcao} inválida.`);
  }
  return saida;
}

async function run() {
  const opcao = process.argv[2];
  const saida = await processarOpcao(opcao);
  console.table(saida);
}

if (require.main === module) {
  run();
}

module.exports = { processarOpcao, precoProdutoFormatado, insereDesconto };
