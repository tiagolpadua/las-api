const { listarProdutosAPI, listarCategoriasAPI } = require("./api-service");

async function processarOpcao(opcao) {
  switch (opcao) {
    case "produtos":
      return await listarProdutosAPI();
    case "categorias":
      return await listarCategoriasAPI();
    case "produtos-formatados":
      return formatarPrecoProdutos(await listarProdutosAPI());
    case "descontos":
      break;
    case undefined:
      throw new Error("Informe uma opção.");
    default:
      throw new Error(`Opção inválida: ${opcao}`);
  }
}

async function run() {
  const opcao = process.argv[2];
  const saida = await processarOpcao(opcao);
  console.table(saida);
}

if (require.main === module) {
  run();
}

function formatarPrecoProdutos(listaProdutos) {
  let listaProdutosFormatados = listaProdutos.slice();
  console.log(listaProdutos);
  console.log(listaProdutosFormatados);
  listaProdutosFormatados.forEach((produto) => {
    produto.preco = formataPreco(produto.preco);
  });

  return listaProdutosFormatados;
}

function formataPreco(preco) {
  return `R$ ${parseFloat(preco).toFixed(2).toString().replace(".", ",")}`;
}

module.exports = {
  processarOpcao,
};
