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
      var produtosFormatados = formatarPrecoProdutos(await listarProdutosAPI());
      var categorias = await listarCategoriasAPI();
      var produtosComDesconto = adicionaDescontoCategoria(
        produtosFormatados,
        categorias
      );

      return produtosComDesconto;
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
  let listaProdutosFormatados = JSON.parse(JSON.stringify(listaProdutos));
  listaProdutosFormatados.forEach((produto) => {
    produto.preco = formataPreco(produto.preco);
  });

  return listaProdutosFormatados;
}

function formataPreco(preco) {
  return `R$ ${parseFloat(preco).toFixed(2).toString().replace(".", ",")}`;
}

function adicionaDescontoCategoria(listaProdutos, categorias) {
  let listaProdutosComDesconto = JSON.parse(JSON.stringify(listaProdutos));

  listaProdutosComDesconto.forEach((produto) => {
    const indexCategoria = categorias.findIndex(
      (categoria) => categoria.nome === produto.categoria
    );

    produto.desconto =
      indexCategoria !== -1 ? categorias[indexCategoria].desconto : 0;
  });
  return listaProdutosComDesconto;
}

module.exports = {
  processarOpcao,
  formatarPrecoProdutos,
};
